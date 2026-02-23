import CorreoNoVerificado from "@/app/components/CorreoNoVerificado";
import { getPerfil } from "@/services/auth/auth.service";
import {
  postSuscripcionPaypal,
  getSuscripcionID,
} from "@/services/auth/suscripcion.service";
import { User } from "@/interfaces/user.type";
import { planes } from "@/utils/planes";
import { Button } from "@heroui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPay from "@/app/components/LoadingPay";
import Loading from "@/app/components/Loading";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { handleAxiosError } from "@/utils/errorHandler";

export default function TuPedido() {
  const params = useParams();
  const id = params?.id as string;
  const [perfil, setPerfil] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPay, setLoadingPay] = useState(false);

  // Estados para el Polling
  const [esperandoCobro, setEsperandoCobro] = useState(false);
  const [miSuscripcionId, setMiSuscripcionId] = useState<string | null>(null);
  const [pagoExitoso, setPagoExitoso] = useState(false);

  const productoFind = planes.find((p) => p.id === Number(id));

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

  useEffect(() => {
    fetchPerfil();
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (esperandoCobro && miSuscripcionId) {
      interval = setInterval(async () => {
        try {
          const res = await getSuscripcionID(miSuscripcionId);
          const estado = res.estado;

          if (estado === "activa") {
            clearInterval(interval);
            setEsperandoCobro(false);
            setPagoExitoso(true);
          } else if (estado === "cancelada" || estado === "rechazada") {
            clearInterval(interval);
            setEsperandoCobro(false);
            alert(
              "Hubo un problema con tu tarjeta. Por favor intenta de nuevo.",
            );
          }
        } catch (error) {
          console.error("Error consultando estado de suscripción", error);
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [esperandoCobro, miSuscripcionId]);

  if (loading) return <Loading />;
  if (perfil && perfil.emailVerified === false)
    return <CorreoNoVerificado perfil={perfil} />;

  // --- PANTALLAS DE ESTADO (Mantenemos tu diseño) ---
  if (esperandoCobro) {
    return (
      <section className="w-1/2 min-w-[300px] h-full bg-white p-14 rounded-2xl flex flex-col items-center justify-center gap-6 max-sm:p-10 max-sm:w-full animate-fade-in text-center shadow-lg">
        <div className="w-16 h-16 border-4 border-[#fc68b9] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-bold text-[#222D65]">
          Validando tu pago...
        </h2>
        <p className="text-[#8A8A8A]">
          Estamos confirmando la transacción de forma segura. Por favor, no
          cierres esta ventana.
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
        <p className="text-[#8A8A8A]">
          Tu pago ha sido procesado correctamente y tu plan ya está activo.
        </p>
        <Button
          className="mt-6 w-full max-w-[300px] bg-white text-[#222D65] font-bold px-10 py-5 border-3 border-[#fa89c7] hover:bg-[#fc68b9] hover:text-white duration-500"
          radius="full"
          onPress={() => (window.location.href = "/")}
        >
          Ir a mi Dashboard
        </Button>
      </section>
    );
  }

  // --- PANTALLA PRINCIPAL DE CHECKOUT ---
  return (
    <section className="w-1/2 min-w-[300px] h-full bg-white p-10 lg:p-14 rounded-3xl flex flex-col items-start gap-8 max-sm:w-full overflow-y-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {loadingPay && <LoadingPay />}

      {/* Cabecera y Resumen del Pedido */}
      <div className="w-full">
        <h1 className="text-3xl font-extrabold text-[#68E1E0] mb-6">
          Resumen de tu pedido
        </h1>

        <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-100 w-full space-y-4">
          <div className="flex justify-between items-center text-[#222D65] font-medium">
            <p className="text-[#8A8A8A]">Plan Seleccionado</p>
            <p className="font-bold">{productoFind?.nombre_plan}</p>
          </div>
          <div className="flex justify-between items-center text-[#222D65] font-medium">
            <p className="text-[#8A8A8A]">Subtotal</p>
            <p>${productoFind?.precio_plan.toFixed(2)}</p>
          </div>
          <div className="h-px w-full bg-gray-200 my-2"></div>
          <div className="flex justify-between items-center text-[#222D65] text-lg font-bold">
            <p>Total a pagar</p>
            <p className="text-[#fc68b9]">
              ${productoFind?.precio_plan.toFixed(2)} / mes
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center w-full">
        Tus datos se procesan de forma segura. Revisa nuestra{" "}
        <span className="text-[#fc68b9] hover:underline cursor-pointer font-medium">
          política de privacidad
        </span>
        .
      </p>

      {/* 🟢 ZONA DE PAGOS (Estilizada para tu marca) */}
      <div className="w-full">
        <h3 className="text-lg font-bold text-[#222D65] mb-4">
          Elige tu método de pago
        </h3>

        {productoFind && productoFind.precio_plan > 0 ? (
          <PayPalScriptProvider
            options={{
              clientId:
                process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "TU_CLIENT_ID",
              components: "buttons",
              intent: "subscription",
              vault: true,
              locale: "es_PE", // Aseguramos que esté en español
            }}
          >
            <div className="flex flex-col gap-6 w-full">
              {/* Contenedor de Tarjeta de Débito/Crédito */}
              <div className="relative border-2 border-[#fa89c7] bg-white rounded-2xl p-6 pb-0 shadow-[0_4px_14px_0_rgba(252,104,185,0.15)] transition-all hover:border-[#fc68b9]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#fc68b9] p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-[#222D65]">
                    Tarjeta de Crédito / Débito
                  </h4>
                </div>

                <div className="min-h-[100px]">
                  {" "}
                  {/* Altura mínima para evitar saltos al cargar */}
                  <PayPalButtons
                    fundingSource="card"
                    style={{
                      shape: "rect",
                      color: "black", // El botón principal se verá oscuro, contrastando bien
                      layout: "vertical",
                    }}
                    createSubscription={(data, actions) => {
                      return actions.subscription.create({
                        plan_id: "P-7NP429606R1731646NFZEWGY",
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
                        console.error("Error guardando suscripción:", error);
                      } finally {
                        setLoadingPay(false);
                      }
                    }}
                    onError={(err) => console.error("Error en PayPal:", err)}
                  />
                </div>
              </div>

              {/* Separador */}
              <div className="flex items-center w-full gap-4 px-2">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  O paga con
                </span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              {/* Contenedor de Cuenta PayPal */}
              <div className="border border-gray-200 bg-gray-50 rounded-2xl p-6 transition-all hover:border-gray-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#003087] p-2 rounded-lg">
                    {" "}
                    {/* Color corporativo de PayPal */}
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.982 5.05-4.348 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106h4.606a.641.641 0 0 0 .633-.74l.526-3.353c.082-.519.53-1.011 1.054-1.011h.976c4.298 0 7.664-1.748 8.646-6.797.124-.637.194-1.25.187-1.831-.035-.27-.123-.52-.273-.784z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-[#222D65]">Cuenta PayPal</h4>
                </div>

                <PayPalButtons
                  fundingSource="paypal"
                  style={{
                    shape: "rect",
                    color: "gold",
                    layout: "vertical",
                    height: 48, // Botón más alto para que luzca mejor
                  }}
                  createSubscription={(data, actions) => {
                    return actions.subscription.create({
                      plan_id: "P-7NP429606R1731646NFZEWGY",
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
              </div>
            </div>
          </PayPalScriptProvider>
        ) : (
          <div className="w-full text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
            Cargando entorno de pago seguro...
          </div>
        )}
      </div>
    </section>
  );
}
