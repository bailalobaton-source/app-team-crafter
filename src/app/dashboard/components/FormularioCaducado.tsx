"use client";

import { Recurso } from "@/interfaces/recurso.interface";
import { postExpirado } from "@/services/recursos.service";
import { inputClassNames } from "@/utils/classNames";
import { Spinner, Textarea } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  recurso: Recurso;
  onOpenChange: (i: boolean) => void;
}

export default function FormularioCaducado({ recurso, onOpenChange }: Props) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ mensaje: string }>();
  const { language } = useLanguageStore();

  // 🌐 Traducciones
  const t = {
    es: {
      resource: "Recurso",
      subject: "Asunto",
      expiredSubject: "EXPIRADO TEAM CRAFTER",
      message: "Mensaje",
      placeholder:
        "¿Tienes algún detalle o pregunta adicional sobre este recurso?",
      requiredError: "El contenido es obligatorio",
      send: "Enviar",
      success:
        "La solicitud se envió correctamente, pronto nos pondremos en contacto con usted.",
    },
    en: {
      resource: "Resource",
      subject: "Subject",
      expiredSubject: "EXPIRED TEAM CRAFTER",
      message: "Message",
      placeholder:
        "Do you have any additional details or questions about this resource?",
      requiredError: "Message is required",
      send: "Send",
      success:
        "Your request has been sent successfully. We will contact you shortly.",
    },
  }[language];

  const onSubmit = async (data: { mensaje: string }) => {
    setLoading(true);
    try {
      await postExpirado(recurso.id, data.mensaje);
      toast.success(t.success);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-[#FC68B9]">{t.resource}</h2>

      <article className="flex gap-2">
        <Image
          className="aspect-[1/1] w-24 rounded-xl"
          src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${recurso.img_recurso}`}
          alt={`caducado ${recurso.nombre_recurso}`}
          width={100}
          height={100}
        />
        <h3 className="font-semibold text-[#8A8A8A]">
          {recurso.nombre_recurso}
        </h3>
      </article>

      <h2 className="text-lg font-semibold text-[#FC68B9]">{t.subject}</h2>
      <p className="text-xl font-semibold text-[#8A8A8A]">{t.expiredSubject}</p>

      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-lg font-semibold text-[#FC68B9]">{t.message}</p>
        <Textarea
          isRequired
          classNames={inputClassNames}
          {...register("mensaje")}
          placeholder={t.placeholder}
          labelPlacement="outside"
          errorMessage={t.requiredError}
          radius="full"
          minRows={4}
        />

        <button
          className="w-full p-3 text-xl bg-[#FC68B9] rounded-full text-[#FFFFFF] font-bold cursor-pointer"
          type="submit"
        >
          {loading ? <Spinner color="danger" /> : t.send}
        </button>
      </form>
    </div>
  );
}
