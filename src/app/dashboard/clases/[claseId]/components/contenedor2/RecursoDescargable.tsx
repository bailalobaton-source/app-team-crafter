"use client";

import FormularioCaducado from "@/app/dashboard/components/FormularioCaducado";
import Countdown, { useCountdown } from "@/hooks/Countdown";
import { Clase } from "@/interfaces/clase.interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  clase: Clase;
}

export default function RecursoDescargable({ clase }: Props) {
  const { isExpired } = useCountdown(clase.recurso.fecha_caducidad);
  const [verFormulario, setVerFormulario] = useState(false);
  const { language } = useLanguageStore();

  const t = {
    es: {
      recursoDescargable: "Recurso descargable",
      recursoCaducado: "¡RECURSO CADUCADO!",
      exclusivoMensaje:
        "Lo sentimos, han caducado los 30 días para la descarga de este archivo, cuando llega a la fecha límite no hay opción a solicitarlo. Para más información darle clic a contactarse.",
      generalMensaje:
        "Lo sentimos, han caducado los 30 días para la descarga de este archivo. Si deseas comprarlo por separado puedes adquirirlo en nuestra tienda web.",
      contactarse: "Contactarse",
      irTienda: "Ir a Tienda de archivos",
      noOlvidesDescargar: "No te olvides descargar el recurso",
      caducaEn: "caduca en",
      descargar: "Descargar",
    },
    en: {
      recursoDescargable: "Downloadable Resource",
      recursoCaducado: "RESOURCE EXPIRED!",
      exclusivoMensaje:
        "Sorry, the 30-day period to download this file has expired. Once it reaches the deadline, it cannot be requested again. For more information, click on contact us.",
      generalMensaje:
        "Sorry, the 30-day period to download this file has expired. If you wish to purchase it separately, you can do so in our online store.",
      contactarse: "Contact us",
      irTienda: "Go to File Store",
      noOlvidesDescargar: "Don’t forget to download the resource",
      caducaEn: "expires in",
      descargar: "Download",
    },
  }[language];

  return (
    <>
      {isExpired ? (
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-lg text-[#68E1E0] font-semibold">
            {t.recursoDescargable}
          </h2>
          <section
            className={`w-full p-4 rounded-2xl ${
              clase.recurso.tipo_recurso === "Exclusivos"
                ? "bg-[#FFE1F2]"
                : "bg-[#FFEE97]"
            }`}
          >
            {verFormulario ? (
              <FormularioCaducado
                recurso={clase.recurso}
                onOpenChange={() => {}}
              />
            ) : (
              <div className="text-center text-[#FC68B9] font-bold flex flex-col items-center gap-2">
                <BsExclamationCircle className="text-2xl m-auto" />
                <h2 className="text-lg">{t.recursoCaducado}</h2>
                <p className="text-sm">
                  {clase.recurso.tipo_recurso === "Exclusivos"
                    ? t.exclusivoMensaje
                    : t.generalMensaje}
                </p>
                {clase.recurso.tipo_recurso === "Exclusivos" ? (
                  <button
                    className="w-full p-2 text-lg bg-[#FC68B9] rounded-full text-[#FFFFFF] cursor-pointer "
                    onClick={() => setVerFormulario(true)}
                  >
                    {t.contactarse}
                  </button>
                ) : (
                  <Link
                    href={"https://glorialobatonarchivos.com/"}
                    target="_blank"
                    className="w-full p-2 text-xl bg-[#FC68B9] rounded-full text-[#FFFFFF] cursor-pointer "
                  >
                    {t.irTienda}
                  </Link>
                )}
                <article className="flex gap-2 text-start mt-2">
                  <Image
                    className="aspect-[1/1] w-20 h-20 rounded-xl"
                    src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${clase.recurso.img_recurso}`}
                    alt={`caducado ${clase.recurso.nombre_recurso}`}
                    width={100}
                    height={100}
                  />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-[#8A8A8A] text-sm">
                      {clase.recurso.nombre_recurso}
                    </h3>
                    <div className="border-2 border-[#FC68B9] rounded-full">
                      {clase.recurso?.fecha_caducidad && (
                        <Countdown
                          fechaCaducidad={clase.recurso?.fecha_caducidad}
                        />
                      )}
                    </div>
                  </div>
                </article>
              </div>
            )}
          </section>
        </div>
      ) : (
        <section className="w-full flex flex-col gap-4">
          <h2 className="text-lg text-[#68E1E0] font-semibold">
            {t.recursoDescargable}
          </h2>
          <article className="flex flex-col gap-3 border-1 border-[#8A8A8A] rounded-2xl p-4 relative">
            <h3 className="text-medium text-[#8A8A8A] font-medium">
              {clase.recurso?.nombre_recurso}
            </h3>
            <button className="group w-min cursor-pointer bg-white text-[#FC68B9] font-semibold flex items-center gap-3 border-1 border-[#FC68B9] p-1.5 px-4 rounded-full hover:bg-[#FC68B9] hover:text-white duration-300">
              <div className="w-5 h-5 bg-[url(/icons/documento-pink.svg)] bg-no-repeat bg-center group-hover:bg-[url(/icons/documento.svg)] duration-300" />
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${clase.recurso?.link_recurso}`}
                download
              >
                {t.descargar}
              </a>
            </button>
          </article>

          <article className="text-[#FC68B9] flex flex-col items-center justify-center gap-3 bg-[#FFE1F2] rounded-2xl p-4 relative">
            <AiOutlineExclamationCircle className="text-3xl text-[#FC68B9]" />
            <h3 className="text-sm text-center font-semibold">
              {t.noOlvidesDescargar} <br /> {t.caducaEn}
            </h3>

            <span className="w-full bg-[#FFEE97] p-2 flex items-center justify-center text-lg font-bold rounded-full">
              {clase.recurso?.fecha_caducidad && (
                <Countdown fechaCaducidad={clase.recurso?.fecha_caducidad} />
              )}
            </span>
          </article>
        </section>
      )}
    </>
  );
}
