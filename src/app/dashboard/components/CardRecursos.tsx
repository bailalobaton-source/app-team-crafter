"use client";

import { Recurso } from "@/interfaces/recurso.interface";
import Image from "next/image";
import Countdown, { useCountdown } from "@/hooks/Countdown";
import { formatDate } from "@/utils/formatDate";
import { useDisclosure } from "@heroui/react";
import ModalRecursoCaducado from "./ModalRecursoCaducado";
import { useLanguageStore } from "@/stores/useLanguage.store";
import { useCallback } from "react";
import { postDescarga } from "@/services/decargas.service";
import { handleAxiosError } from "@/utils/errorHandler";

interface Props {
  recurso: Recurso;
  width?: string;
}

export default function CardRecursos({ recurso, width }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isExpired } = useCountdown(recurso.fecha_caducidad);
  const { language } = useLanguageStore();

  const t = {
    es: {
      download: "Descargar",
      expired: "Caducado",
    },
    en: {
      download: "Download",
      expired: "Expired",
    },
  }[language];

  const getfindDescargas = useCallback(async () => {
    try {
      await postDescarga(recurso.id);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);
  return (
    <article
      key={recurso.id}
      className={`${
        width ? width : "w-[calc(33%_-_20px)]"
      } flex flex-col gap-3 max-md:w-full`}
    >
      <div className="group w-full relative rounded-2xl overflow-hidden">
        {recurso.tipo_recurso === "Exclusivos" && (
          <Image
            className="absolute top-4 left-4 w-10 z-30"
            src={"/icons/corona.svg"}
            alt={`${recurso.nombre_recurso}`}
            width={100}
            height={100}
          />
        )}

        <div className="w-full aspect-[1/1] object-cover">
          <Image
            className="h-full w-full object-cover group-hover:scale-105 duration-300"
            src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${recurso.img_recurso}`}
            alt={`${recurso.nombre_recurso}`}
            width={500}
            height={500}
          />
        </div>

        {/* 🔽 Botón de descarga o candado según estado */}
        {!isExpired && (
          <a
            className="group absolute cursor-pointer right-4 bottom-4 bg-white text-[#FC68B9] font-semibold flex items-center gap-3 p-1.5 px-4 rounded-full group-hover:bg-[#FC68B9] group-hover:text-white duration-300"
            href={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${recurso?.link_recurso}`}
            download
            onClick={getfindDescargas}
          >
            <div className="w-5 h-5 bg-[url(/icons/documento-pink.svg)] bg-no-repeat bg-center group-hover:bg-[url(/icons/documento.svg)]" />
            <p>{t.download}</p>
          </a>
        )}

        {isExpired && (
          <div
            className="absolute w-full h-full top-0 left-0 bg-[#FC68B980] flex items-center justify-center cursor-pointer z-20"
            onClick={onOpen}
          >
            <Image
              src={"/icons/candado.svg"}
              alt={`caducado ${recurso.nombre_recurso}`}
              width={45}
              height={45}
            />
          </div>
        )}
      </div>

      {/* 🔽 Estado: caducado o activo */}
      {isExpired ? (
        <div className="w-full flex justify-between items-center">
          <p className="w-fit bg-[#FC68B9] px-3 py-1 flex items-center gap-2 rounded-full text-medium text-white font-semibold">
            {t.expired}
          </p>
          <article className="w-fit flex items-center gap-2">
            <Image
              className="w-5"
              src={"/icons/calendario.svg"}
              alt={`${recurso.nombre_recurso}`}
              width={100}
              height={100}
            />
            <p className="text-base text-[#FFB4DF] font-medium">
              {formatDate(recurso.fecha_caducidad)}
            </p>
          </article>
        </div>
      ) : (
        <div className="w-fit bg-[#FFEE97] text-[#FC68B9] px-4 py-0 flex items-center gap-2 rounded-full">
          <Image
            className="w-4"
            src={"/icons/relojArena.svg"}
            alt={`${recurso.nombre_recurso}`}
            width={100}
            height={100}
          />
          <Countdown fechaCaducidad={recurso?.fecha_caducidad} />
        </div>
      )}

      {/* 🔽 Nombre del recurso */}
      <h3 className="text-medium font-semibold text-[#8A8A8A] uppercase">
        {recurso.nombre_recurso}
      </h3>

      {/* 🔽 Modal cuando está caducado */}
      <ModalRecursoCaducado
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        recurso={recurso}
      />
    </article>
  );
}
