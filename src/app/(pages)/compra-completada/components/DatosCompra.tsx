"use client";

import { User } from "@/interfaces/user.type";
import { getSuscripcion } from "@/services/auth/suscripcion.service";
import useSuscripcionStore, { Suscripcion } from "@/stores/SuscripcionContext";
import { planes } from "@/utils/planes";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useLanguageStore } from "@/stores/useLanguage.store";

export default function DatosCompra() {
  const { language } = useLanguageStore();
  const forceRefetch = useSuscripcionStore((state) => state.forceRefetch);
  const [datosCliente, setDatosCliente] = useState<User>();
  const [suscripcion, setSuscripcion] = useState<Suscripcion>();
  const [loading, setLoading] = useState(true);
  console.log(language);

  const gfindsuscripciones = useCallback(async () => {
    try {
      const resData = await getSuscripcion();
      if (resData && resData.suscripcionActiva) {
        setDatosCliente(resData.sessionUser);
        setSuscripcion(resData.suscripcionActiva);
      }
    } catch (error) {
      console.error("Error al obtener la suscripción:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindsuscripciones();
  }, [gfindsuscripciones]);

  useEffect(() => {
    forceRefetch();
  }, [forceRefetch]);

  const planSuscripcion = (planExternalId: number) => {
    const planActivo = planes.find((p) => p.id === planExternalId);
    return planActivo;
  };

  const t = {
    es: {
      purchase: "Compra",
      completed: "completada",
      thanks: "Gracias por tu suscripción.",
      receipt: "La boleta ha sido enviada a tu correo.",
      planSelected: "Plan seleccionado",
      total: "Total a pagar",
      email: "Correo confirmación",
      explore: "Explorar mi cuenta",
      errorTitle: "Algo salió mal",
      errorSub: "No pudimos confirmar tu pago",
      errorDesc:
        "Tu suscripción no se procesó correctamente. Por favor, revisa tu estado de cuenta bancaria o de PayPal. Si notas que el cobro sí se realizó, ¡no te preocupes! Contáctanos y activaremos tu plan de inmediato.",
      contactSupport: "Contactar a soporte",
      returnHome: "Volver al inicio",
      tryAgain: "Intentar de nuevo",
    },
    en: {
      purchase: "Purchase",
      completed: "completed",
      thanks: "Thank you for your subscription.",
      receipt: "The receipt has been sent to your email.",
      planSelected: "Selected plan",
      total: "Total to pay",
      email: "Confirmation email",
      explore: "Explore my account",
      errorTitle: "Something went wrong",
      errorSub: "We couldn't confirm your payment",
      errorDesc:
        "Your subscription wasn't processed correctly. Please check your bank or PayPal statement. If you see that the charge went through, don't worry! Contact us and we'll activate your plan right away.",
      contactSupport: "Contact support",
      returnHome: "Return to home",
      tryAgain: "Try again",
    },
  }[language];

  // 1. PANTALLA DE CARGA
  if (loading) {
    return (
      <section className="w-full lg:w-1/2 min-w-[300px] min-h-[500px] bg-white p-14 rounded-3xl flex flex-col items-center justify-center gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-in fade-in duration-500">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#fc68b9] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-[#8A8A8A] font-medium tracking-wide animate-pulse">
          Cargando detalles...
        </p>
      </section>
    );
  }

  // 2. PANTALLA DE ERROR
  if (!suscripcion) {
    return (
      <section className="w-full lg:w-1/2 min-w-[300px] h-auto bg-white p-8 lg:p-14 rounded-3xl flex flex-col justify-center items-center gap-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-in fade-in duration-500">
        {/* Ícono de Alerta con gradiente */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 rounded-full shadow-inner"></div>
          <svg
            className="relative w-12 h-12 text-red-400 drop-shadow-sm"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>

        <article className="w-full space-y-3">
          <h1 className="text-3xl font-extrabold text-[#222D65]">
            {t.errorTitle}
          </h1>
          <h2 className="text-lg text-red-400 font-semibold tracking-wide uppercase">
            {t.errorSub}
          </h2>

          <div className="bg-[#fcfcfd] p-6 rounded-2xl border border-gray-100 mt-6 shadow-sm">
            <p className="text-[#64748b] text-base leading-relaxed">
              {t.errorDesc}
            </p>
          </div>
        </article>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
          <Link
            href="https://api.whatsapp.com/send/?phone=51994757941&text&type=phone_number&app_absent=0"
            className="w-full sm:w-auto bg-[#222D65] text-white text-base font-semibold px-8 py-4 rounded-xl hover:bg-[#1a224f] hover:shadow-lg transition-all duration-300"
          >
            {t.contactSupport}
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto bg-white text-[#222D65] border border-gray-200 text-base font-semibold px-8 py-4 rounded-xl hover:border-[#fc68b9] hover:text-[#fc68b9] transition-all duration-300"
          >
            {t.returnHome}
          </Link>
        </div>
      </section>
    );
  }

  // 3. PANTALLA DE ÉXITO
  return (
    <section className="w-full lg:w-1/2 min-w-[300px] h-auto bg-white p-8 lg:p-14 rounded-3xl flex flex-col justify-start items-center gap-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-in fade-in duration-500">
      {/* Animación de éxito */}
      <div className="relative mt-4">
        <div className="absolute inset-0 bg-[#68E1E0]/10 rounded-full blur-2xl"></div>
        <Image
          className="relative w-[140px] drop-shadow-md"
          src="/verificacion.gif"
          alt="Verificación"
          width={400}
          height={400}
          priority
        />
      </div>

      {/* 🧾 Títulos */}
      <article className="w-full space-y-2">
        <h1 className="text-4xl lg:text-5xl text-[#68E1E0] font-black uppercase tracking-wider">
          {t.purchase}
        </h1>
        <h2 className="text-5xl lg:text-6xl text-[#FC68B9] font-[LearningCurve] -mt-4 drop-shadow-sm">
          {t.completed}
        </h2>

        <p className="text-[#64748b] text-lg mt-6 leading-relaxed">
          {t.thanks}
          <br />
          <span className="font-semibold text-[#222D65]">{t.receipt}</span>
        </p>
      </article>

      {/* 💳 Recibo de compra */}
      <div className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl p-6 shadow-inner">
        <ul className="w-full space-y-5">
          <li className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <span className="text-[#8A8A8A] font-medium text-sm uppercase tracking-wider">
              {t.planSelected}
            </span>
            <span className="text-[#222D65] font-bold text-lg bg-white px-4 py-1 rounded-lg border border-gray-100 shadow-sm">
              {planSuscripcion(suscripcion?.plan_id)?.nombre_plan}
            </span>
          </li>

          <li className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <span className="text-[#8A8A8A] font-medium text-sm uppercase tracking-wider">
              {t.total}
            </span>
            <span className="text-[#FC68B9] font-black text-2xl">
              ${planSuscripcion(suscripcion?.plan_id)?.precio_plan?.toFixed(2)}
            </span>
          </li>

          <div className="h-px w-full bg-gray-200"></div>

          <li className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2">
            <div className="flex items-center gap-2 text-[#8A8A8A]">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <span className="font-medium text-sm uppercase tracking-wider">
                {t.email}
              </span>
            </div>
            <span className="text-[#222D65] font-semibold break-all">
              {datosCliente?.correo}
            </span>
          </li>
        </ul>
      </div>

      {/* 🚀 Botón final */}
      <Link
        href={"/"}
        className="w-full sm:w-auto bg-[#fc68b9] text-white text-lg font-bold px-12 py-4 rounded-xl hover:bg-[#e85ba6] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(252,104,185,0.3)] mt-2"
      >
        {t.explore}
      </Link>
    </section>
  );
}
