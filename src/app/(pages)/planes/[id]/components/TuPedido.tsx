import CorreoNoVerificado from "@/app/components/CorreoNoVerificado";
import { getPerfil } from "@/services/auth/auth.service";
import {
  postSuscripcion,
  postSuscripcionPaypal,
  getSuscripcion, // 🟢 NUEVO: Deberás crear este servicio para consultar el estado
} from "@/services/auth/suscripcion.service";
import { User } from "@/interfaces/user.type";
import { planes } from "@/utils/planes";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPay from "@/app/components/LoadingPay";
import Loading from "@/app/components/Loading";

// Importaciones de Mercado Pago (Quitamos StatusScreen porque es para pagos únicos)
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { handleAxiosError } from "@/utils/errorHandler";

// Usa variables de entorno públicas en Next.js
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || "TU_PUBLIC_KEY", {
  locale: "es-PE",
});

export default function TuPedido() {
  const params = useParams();
  const id = params?.id as string;
  const [perfil, setPerfil] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPay, setLoadingPay] = useState(false);

  // 🟢 NUEVOS ESTADOS PARA EL POLLING (Validación con backend)
  const [esperandoCobro, setEsperandoCobro] = useState(false);
  const [miSuscripcionId, setMiSuscripcionId] = useState<number | null>(null);
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

  // 🟢 LÓGICA DE VALIDACIÓN CONSTANTE (POLLING)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (esperandoCobro && miSuscripcionId) {
      // Preguntamos al backend cada 3 segundos
      interval = setInterval(async () => {
        try {
          // Llama a tu endpoint (ejemplo: GET /suscripcion/estado/:id)
          const res = await getSuscripcion();
          const estado = res.estado; // 'pendiente', 'activa', 'cancelada'

          if (estado === "activa") {
            clearInterval(interval);
            setEsperandoCobro(false);
            setPagoExitoso(true); // ¡Se cobró! Mostramos la pantalla de éxito
          } else if (estado === "cancelada" || estado === "rechazada") {
            clearInterval(interval);
            setEsperandoCobro(false);
            alert(
              "El pago fue rechazado por el banco. Intenta con otra tarjeta.",
            );
            // Aquí el usuario se queda en el formulario para reintentar
          }
          // Si sigue 'pendiente', no hacemos nada, el intervalo volverá a preguntar en 3s
        } catch (error) {
          console.error("Error consultando estado de suscripción", error);
        }
      }, 3000);
    }

    return () => clearInterval(interval); // Limpiamos el intervalo si el componente se desmonta
  }, [esperandoCobro, miSuscripcionId]);

  const onSubmitMp = async (formData: any) => {
    if (productoFind) {
      setLoadingPay(true);
      try {
        const card_token_id = formData.token;
        const payer_email = formData.payer.email || perfil?.correo;

        // 1. Enviamos la tarjeta al backend
        const res = await postSuscripcion(productoFind.id, {
          reason: productoFind.nombre_plan,
          payer_email: payer_email,
          card_token_id: card_token_id,
        });

        // 2. Extraemos el ID de TU base de datos (No el de Mercado Pago)
        // OJO: Asegúrate de que tu backend devuelve la suscripción creada. Ej: res.suscripcion.id
        const idLocal = res?.suscripcion?.id || res?.data?.suscripcion?.id;

        if (idLocal) {
          setMiSuscripcionId(idLocal);
          setEsperandoCobro(true); // 3. Activamos el Polling
        } else {
          // Fallback por si el backend no devuelve el ID local
          window.location.href = "/compra-completada";
        }
      } catch (error) {
        console.error("Error procesando pago con tarjeta:", error);
      } finally {
        setLoadingPay(false);
      }
    }
  };

  const fetchPaymentPaypal = async () => {
    if (productoFind) {
      setLoadingPay(true);
      try {
        const res = await postSuscripcionPaypal(productoFind.id);
        window.location.href = res.link_pago;
      } catch (error) {
        console.error("Error cargando PayPal:", error);
      } finally {
        setLoadingPay(false);
      }
    }
  };

  const customizationMP = {
    visual: {
      style: {
        theme: "default" as "default",
        customVariables: {
          formBackgroundColor: "transparent",
          baseColor: "#fc68b9",
          baseColorFirstVariant: "#fa89c7",
          baseColorSecondVariant: "#e052a0",
          textPrimaryColor: "#222D65",
          textSecondaryColor: "#bbbbbb",
          buttonTextColor: "#ffffff",
          errorColor: "#ef4444",
          successColor: "#10b981",
          inputBackgroundColor: "#ffffff",
          outlineSecondaryColor: "#e2e8f0",
          outlinePrimaryColor: "#fc68b9",
          inputBorderWidth: "1px",
          inputFocusedBorderWidth: "1px",
          inputFocusedBoxShadow: "0 0 0 3px rgba(252, 104, 185, 0.2)",
          inputErrorFocusedBoxShadow: "0 0 0 3px rgba(239, 68, 68, 0.2)",
          inputVerticalPadding: "12px",
          inputHorizontalPadding: "12px",
          formInputsTextTransform: "none",
          fontSizeExtraSmall: "13px",
          fontSizeSmall: "13px",
          fontSizeMedium: "13px",
          fontSizeLarge: "13px",
          fontSizeExtraLarge: "13px",
          fontWeightNormal: "500",
          fontWeightSemiBold: "500",
          borderRadiusSmall: "8px",
          borderRadiusMedium: "8px",
          borderRadiusLarge: "8px",
          borderRadiusFull: "8px",
          formPadding: "10px",
        },
      },
      texts: {
        formTitle: "Detalles de tu tarjeta",
        emailSectionTitle: "Datos de contacto",
        installmentsSectionTitle: "Opciones de pago",
        cardholderName: {
          label: "Nombre titular de la tarjeta",
          placeholder: "Ej. Ana María Pérez",
        },
        email: {
          label: "Correo electrónico",
          placeholder: "tu@correo.com",
        },
        cardholderIdentification: {
          label: "Documento de Identidad (DNI/CE)",
        },
        cardNumber: { label: "Número de la tarjeta" },
        expirationDate: { label: "Vencimiento (MM/AA)" },
        securityCode: { label: "Código CVV" },
        selectInstallments: "Elige en cuántas cuotas pagar",
        selectIssuerBank: "Selecciona tu banco emisor",
        formSubmit: `Suscribirme por $${productoFind?.precio_plan.toFixed(2) || "0.00"}`,
      },
    },
  };

  if (loading) return <Loading />;
  if (perfil && perfil.emailVerified === false)
    return <CorreoNoVerificado perfil={perfil} />;

  // 🟢 PANTALLA 1: ESTAMOS VALIDANDO EL PAGO (Polling activo)
  if (esperandoCobro) {
    return (
      <section className="w-1/2 min-w-[300px] h-full bg-white p-14 rounded-2xl flex flex-col items-center justify-center gap-6 max-sm:p-10 max-sm:w-full animate-fade-in text-center">
        <div className="w-16 h-16 border-4 border-[#fc68b9] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-bold text-[#222D65]">
          Validando tu pago...
        </h2>
        <p className="text-[#8A8A8A]">
          Estamos confirmando la transacción con tu banco. Por favor, no cierres
          esta ventana.
        </p>
      </section>
    );
  }

  // 🟢 PANTALLA 2: EL WEBHOOK CONFIRMÓ EL COBRO (Éxito)
  if (pagoExitoso) {
    return (
      <section className="w-1/2 min-w-[300px] h-full bg-white p-14 rounded-2xl flex flex-col items-center justify-center gap-6 max-sm:p-10 max-sm:w-full animate-fade-in text-center">
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
          Tu pago ha sido procesado correctamente y tu suscripción está activa.
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

  // --- PANTALLA 3: RENDERIZADO NORMAL (FORMULARIO CHECKOUT) ---
  return (
    <section className="w-1/2 min-w-[300px] h-full bg-white p-14 rounded-2xl flex flex-col items-start gap-6 max-sm:p-10 max-sm:w-full overflow-y-auto">
      {loadingPay && <LoadingPay />}
      <h1 className="text-2xl font-bold text-[#68E1E0]">Tu pedido</h1>

      <ul className="w-full space-y-2">
        <li className="text-[#8A8A8A] text-base font-semibold grid grid-cols-2 gap-10">
          <p>Producto</p>
          <p>{productoFind?.nombre_plan}</p>
        </li>
        <li className="text-[#8A8A8A] text-base font-semibold grid grid-cols-2 gap-10">
          <p>Subtotal</p>
          <p>${productoFind?.precio_plan.toFixed(2)}</p>
        </li>
        <li className="text-[#8A8A8A] text-base font-semibold grid grid-cols-2 gap-10">
          <p>Total</p>
          <p>${productoFind?.precio_plan.toFixed(2)}</p>
        </li>
      </ul>

      <p className="text-sm text-gray-600">
        Tus datos personales se utilizarán para procesar tu pedido, mejorar tu
        experiencia en esta web y otros propósito descritos en nuestra{" "}
        <span className="text-[#fc68b9] hover:underline cursor-pointer">
          política de privacidad
        </span>
      </p>

      {/* LOGICA DE METODOS DE PAGO */}
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <CardPayment
          initialization={{
            amount: productoFind?.precio_plan || 0,
            payer: {
              email: perfil?.correo || "",
            },
          }}
          customization={customizationMP}
          onSubmit={onSubmitMp}
          onReady={() => console.log("Formulario de tarjeta listo")}
          onError={(error) => console?.error("Error en MP:", error)}
        />

        <div className="flex items-center w-full gap-4">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-sm text-gray-400 font-medium">O usa</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <Button
          className="w-full max-w-[320px] bg-white text-[#222D65] text-md font-bold px-10 py-5 border-3 border-[#fa89c7] hover:bg-[#fc68b9] hover:border-[#fc68b9] hover:text-white shadow-rigth-yellow duration-500 flex items-center justify-center gap-3"
          radius="full"
          onPress={fetchPaymentPaypal}
        >
          <span>Suscríbete con</span>
          <Image
            src="/icons/paypal.svg"
            alt="PayPal Logo"
            width={80}
            height={24}
            className="object-contain"
          />
        </Button>
      </div>
    </section>
  );
}
