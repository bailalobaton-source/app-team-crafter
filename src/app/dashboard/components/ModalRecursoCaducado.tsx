"use client";

import { Recurso } from "@/interfaces/recurso.interface";
import { Modal, ModalContent } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import FormularioCaducado from "./FormularioCaducado";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  onOpenChange: (i: boolean) => void;
  isOpen: boolean;
  recurso: Recurso;
}

export default function ModalRecursoCaducado({
  onOpenChange,
  isOpen,
  recurso,
}: Props) {
  const [verFormulario, setVerFormulario] = useState(false);
  const { language } = useLanguageStore();

  // 🌐 Traducciones
  const t = {
    es: {
      expiredTitle: "¡RECURSO CADUCADO!",
      exclusiveMessage:
        "Lo sentimos, han caducado los 30 días para la descarga de este archivo, cuando llega a la fecha límite no hay opción a solicitarlo. Para más información darle clic a contactarse.",
      normalMessage:
        "Lo sentimos, han caducado los 30 días para la descarga de este archivo. Si deseas comprarlo por separado puedes adquirirlo en nuestra tienda web.",
      contact: "Contactarse",
      goToStore: "Ir a Tienda de archivos",
    },
    en: {
      expiredTitle: "RESOURCE EXPIRED!",
      exclusiveMessage:
        "Sorry, the 30-day download period for this file has expired. Once the deadline passes, it can no longer be requested. For more information, click Contact.",
      normalMessage:
        "Sorry, the 30-day download period for this file has expired. If you wish to purchase it separately, you can do so in our online store.",
      contact: "Contact",
      goToStore: "Go to File Store",
    },
  }[language];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="sm"
      placement="center"
    >
      <ModalContent
        className={`w-full p-6 ${
          recurso.tipo_recurso === "Exclusivos"
            ? "bg-[#FFE1F2]"
            : "bg-[#FFEE97]"
        }`}
      >
        {verFormulario ? (
          <FormularioCaducado recurso={recurso} onOpenChange={onOpenChange} />
        ) : (
          <div className="text-center text-[#FC68B9] font-bold flex flex-col items-center gap-3">
            <BsExclamationCircle className="text-2xl m-auto" />
            <h2 className="text-lg">{t.expiredTitle}</h2>
            <p>
              {recurso.tipo_recurso === "Exclusivos"
                ? t.exclusiveMessage
                : t.normalMessage}
            </p>

            {recurso.tipo_recurso === "Exclusivos" ? (
              <button
                className="w-full p-3 text-xl bg-[#FC68B9] rounded-full text-[#FFFFFF] mt-2 cursor-pointer max-md:p-2"
                onClick={() => setVerFormulario(true)}
              >
                {t.contact}
              </button>
            ) : (
              <Link
                href="https://glorialobatonarchivos.com/"
                target="_blank"
                className="w-full p-3 text-xl bg-[#FC68B9] rounded-full text-[#FFFFFF] cursor-pointer"
              >
                {t.goToStore}
              </Link>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
