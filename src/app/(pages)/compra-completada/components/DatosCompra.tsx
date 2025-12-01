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
  const { language } = useLanguageStore(); // 🌐 idioma global
  const forceRefetch = useSuscripcionStore((state) => state.forceRefetch);
  const [datosCliente, setDatosCliente] = useState<User>();
  const [suscripcion, setSuscripcion] = useState<Suscripcion>();

  // 🔁 Obtener datos de suscripción
  const gfindsuscripciones = useCallback(async () => {
    const resData = await getSuscripcion();
    setDatosCliente(resData.sessionUser);
    setSuscripcion(resData.suscripcionActiva);
  }, []);

  useEffect(() => {
    gfindsuscripciones();
  }, []);

  useEffect(() => {
    forceRefetch();
  }, [forceRefetch]);

  const planSuscripcion = (planExternalId: number) => {
    const planActivo = planes.find((p) => p.id === planExternalId);
    return planActivo;
  };

  // 🌍 Traducciones
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
    },
  }[language];

  return (
    <>
      {suscripcion && (
        <section className="w-1/2 min-w-[300px] h-auto bg-white p-6 rounded-2xl flex flex-col justify-start items-center gap-10 max-md:w-full pb-10">
          <Image
            className="w-[150px]"
            src="/verificacion.gif"
            alt="Verificación"
            width={800}
            height={800}
            priority
          />

          {/* 🧾 Títulos */}
          <article className="text-center w-8/10">
            <h1 className="text-5xl text-[#68E1E0] font-black uppercase">
              {t.purchase}
            </h1>
            <h2 className="-mt-7 text-6xl text-[#FC68B9] font-[LearningCurve]">
              {t.completed}
            </h2>

            <p className="text-lg font-medium text-[#8A8A8A] mt-6">
              {t.thanks}{" "}
              <strong>
                <br />
                {t.receipt}
              </strong>
            </p>
          </article>

          {/* 💳 Datos de compra */}
          <div className="w-8/10 bg-[#F1F6FB] rounded-2xl p-6">
            <ul className="w-full space-y-4">
              <li className="text-[#8A8A8A] text-base font-medium flex justify-between">
                <p>{t.planSelected}</p>
                <p className="text-[#a9a9a9]">
                  {planSuscripcion(suscripcion?.plan_id)?.nombre_plan}
                </p>
              </li>

              <li className="text-[#8A8A8A] text-base font-medium flex justify-between">
                <p>{t.total}</p>
                <p className="text-[#a9a9a9]">
                  ${" "}
                  {planSuscripcion(suscripcion?.plan_id)?.precio_plan?.toFixed(
                    2
                  )}
                </p>
              </li>

              <li className="text-[#8A8A8A] text-base font-medium flex justify-between gap-10">
                <p>{t.email}</p>
                <p className="text-[#a9a9a9]">{datosCliente?.correo}</p>
              </li>
            </ul>
          </div>

          {/* 🚀 Botón final */}
          <Link
            href={"/"}
            className="w-fit bg-[#fc68b9] text-[#ffee97] text-xl font-semibold px-10 py-3 border-5 border-[#ffee97] rounded-full hover:bg-[#fc68b9] hover:text-[#ffee97] shadow-rigth-yellow duration-500"
          >
            {t.explore}
          </Link>
        </section>
      )}
    </>
  );
}
