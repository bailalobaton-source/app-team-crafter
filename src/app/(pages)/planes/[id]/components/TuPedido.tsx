import CorreoNoVerificado from "@/app/components/CorreoNoVerificado";
import {
  getPerfil,
  getPerfilRegistrarTarjeta,
} from "@/services/auth/auth.service";
import {
  postSuscripcionPaypal,
  getSuscripcion,
} from "@/services/auth/suscripcion.service";
import { User } from "@/interfaces/user.type";
import { planes } from "@/utils/planes";
import { Button } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPay from "@/app/components/LoadingPay";
import Loading from "@/app/components/Loading";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { handleAxiosError } from "@/utils/errorHandler";
import { toast } from "sonner";

export default function TuPedido() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [perfil, setPerfil] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPay, setLoadingPay] = useState(false);

  const [esperandoCobro, setEsperandoCobro] = useState(false);
  const [miSuscripcionId, setMiSuscripcionId] = useState<string | null>(null);
  const [pagoExitoso, setPagoExitoso] = useState(false);

  const productoFind = planes.find((p) => p.id === Number(id));

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await getPerfil();
        setPerfil(res.perfil);
      } catch (error) {
        handleAxiosError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

  const handleSubmitTarjeta = async () => {
    try {
      setLoadingPay(true);
      const res = await getPerfilRegistrarTarjeta(productoFind?.id_flow || "");
      if (res && res.url) {
        window.location.replace(res.url);
      }
    } catch (error) {
      handleAxiosError(error);
      toast.error("Error al procesar la solicitud de tarjeta.");
    } finally {
      setLoadingPay(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let intentos = 0;
    const maxIntentos = 10;

    if (esperandoCobro && miSuscripcionId) {
      interval = setInterval(async () => {
        try {
          intentos++;
          const res = await getSuscripcion();
          const estado = res.suscripcionActiva?.status;

          if (estado === "activa") {
            clearInterval(interval);
            setEsperandoCobro(false);
            setPagoExitoso(true);
            router.push("/compra-completada");
          } else if (intentos >= maxIntentos) {
            clearInterval(interval);
            setEsperandoCobro(false);
            toast.error(
              "El pago está tardando en procesarse. Revisa tu correo o intenta de nuevo.",
            );
          }
        } catch (error) {
          console.error("Error consultando estado", error);
          clearInterval(interval);
          setEsperandoCobro(false);
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [esperandoCobro, miSuscripcionId, router]);

  if (loading) return <Loading />;
  if (perfil && perfil.emailVerified === false)
    return <CorreoNoVerificado perfil={perfil} />;

  // --- PANTALLAS DE CARGA Y ÉXITO ---
  if (esperandoCobro) {
    return (
      <section className="w-1/2 min-w-[300px] h-full bg-white p-14 rounded-2xl flex flex-col items-center justify-center gap-6 max-sm:p-10 max-sm:w-full animate-fade-in text-center shadow-lg">
        <div className="w-16 h-16 border-4 border-[#fc68b9] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-bold text-[#222D65]">
          Validando tu pago...
        </h2>
        <p className="text-[#8A8A8A]">
          Estamos confirmando la transacción. Por favor, no cierres esta
          ventana.
        </p>
      </section>
    );
  }

  if (pagoExitoso) {
    return (
      <section className="w-1/2 min-w-[300px] h-full bg-white p-14 rounded-2xl flex flex-col items-center justify-center gap-6 max-sm:p-10 max-sm:w-full animate-fade-in text-center shadow-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-[#10b981]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#222D65]">
          ¡Suscripción Exitosa!
        </h2>
        <p className="text-[#8A8A8A]">Tu plan ya está activo.</p>
        <Button
          className="mt-6 w-full max-w-[300px] bg-white text-[#222D65] font-bold px-10 py-5 border-3 border-[#fa89c7] hover:bg-[#fc68b9] hover:text-white duration-500"
          radius="full"
          onPress={() => router.push("/")}
        >
          Ir a mi Dashboard
        </Button>
      </section>
    );
  }

  // --- PANTALLA DE CHECKOUT PRINCIPAL ---
  return (
    <section className="relative w-full overflow-hidden lg:w-1/2 min-w-[300px] min-h-full h-auto bg-white p-6 lg:p-14 rounded-3xl flex flex-col items-start gap-8 max-sm:w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* 🟢 CAPA DE LOADING AISLADA Y SUPERPUESTA PANTALLA COMPLETA */}
      {loadingPay && (
        <div className="fixed inset-0 z-[9999] w-screen h-[100dvh] backdrop-blur-sm flex items-center justify-center">
          <LoadingPay />
        </div>
      )}

      {/* CABECERA */}
      <div className="w-full relative z-10">
        <h1 className="text-3xl font-extrabold text-[#68E1E0] mb-6">
          Resumen de tu pedido
        </h1>
        <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-100 w-full space-y-4">
          <div className="flex justify-between items-center text-[#222D65]">
            <p className="text-[#8A8A8A]">Plan Seleccionado</p>
            <p className="font-bold">{productoFind?.nombre_plan}</p>
          </div>
          <div className="flex justify-between items-center text-[#222D65]">
            <p className="text-[#8A8A8A]">Subtotal</p>
            <p>${productoFind?.precio_plan.toFixed(2)}</p>
          </div>
          <div className="h-px w-full bg-gray-200 my-2"></div>
          <div className="flex justify-between items-center text-[#222D65] text-lg font-bold">
            <p>Total a pagar</p>
            <p className="text-[#fc68b9]">
              ${productoFind?.precio_plan.toFixed(2)} /
              {productoFind?.duracion_plan}
            </p>
          </div>
        </div>
      </div>

      {/* 🟢 ZONA DE PAGOS */}
      <div
        className={`w-full relative transition-opacity duration-300 ${
          loadingPay ? "opacity-0 pointer-events-none z-0" : "opacity-100 z-10"
        }`}
      >
        <h3 className="text-xl font-bold text-[#222D65] mb-6">
          Método de pago
        </h3>

        {/* 1. Botón de Tarjeta Premium */}
        <button
          onClick={handleSubmitTarjeta}
          disabled={loadingPay}
          className="w-full cursor-pointer bg-[#fc68b9] border border-gray-200 hover:border-[#fc68b9] text-[#ffff] font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed group mb-5"
        >
          {loadingPay ? (
            <div className="w-5 h-5 border-2 border-[#fc68b9] border-t-transparent rounded-full animate-spin mr-3"></div>
          ) : (
            <svg
              className="w-6 h-6 mr-3 text-white group-hover:text-[#ffff] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              ></path>
            </svg>
          )}
          <span>Tarjeta de Crédito o Débito</span>
        </button>

        {/* Separador "O" */}
        <div className="flex items-center my-6">
          <div className="h-px bg-gray-100 flex-1"></div>
          <span className="px-4 text-xs text-gray-400 font-bold uppercase tracking-wider">
            O paga con
          </span>
          <div className="h-px bg-gray-100 flex-1"></div>
        </div>

        {/* 2. Contenedor de PayPal Estilizado */}
        {productoFind && productoFind.precio_plan > 0 ? (
          <div className="p-1 border border-gray-100 rounded-xl bg-[#fcfcfd]">
            <PayPalScriptProvider
              options={{
                clientId:
                  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "TU_CLIENT_ID",
                components: "buttons",
                intent: "subscription",
                vault: true,
                locale: "es_PE",
              }}
            >
              <PayPalButtons
                fundingSource="paypal"
                style={{
                  shape: "rect",
                  color: "gold",
                  layout: "vertical",
                  height: 50,
                  borderRadius: 10,
                  label: "subscribe",
                }}
                createSubscription={(data, actions) => {
                  return actions.subscription.create({
                    plan_id: productoFind.paypal_id,
                    custom_id: perfil?.id?.toString(),
                  });
                }}
                onApprove={async (data, actions) => {
                  setLoadingPay(true);
                  try {
                    await postSuscripcionPaypal({
                      id: productoFind.id,
                      paypalSubscriptionId: data.subscriptionID || "",
                    });
                    setMiSuscripcionId(data.subscriptionID || "");
                    setEsperandoCobro(true);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setLoadingPay(false);
                  }
                }}
              />
            </PayPalScriptProvider>
          </div>
        ) : (
          // 🟢 LOADER DE PAYPAL EN PANTALLA COMPLETA
          <div className="fixed inset-0 z-[9999] w-screen h-[100dvh] bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#fc68b9] border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-[#222D65] font-bold text-lg">
              Cargando entorno de pago seguro...
            </span>
          </div>
        )}

        {/* Footer de Seguridad */}
        <div className="flex items-center justify-center gap-2 mt-8 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
          <span className="text-xs font-medium">
            Pago seguro encriptado SSL
          </span>
        </div>
      </div>
    </section>
  );
}
