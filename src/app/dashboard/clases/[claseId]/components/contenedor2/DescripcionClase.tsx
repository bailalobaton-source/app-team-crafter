"use client";
import { Clase } from "@/interfaces/clase.interface";
import { useState } from "react";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  clase: Clase;
}

export default function DescripcionClase({ clase }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { language } = useLanguageStore();

  // 🌐 Traducciones
  const t = {
    es: {
      description: "Descripción",
      readMore: "Leer más",
      readLess: "Leer menos",
    },
    en: {
      description: "Description",
      readMore: "Read more",
      readLess: "Read less",
    },
  }[language];

  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-lg text-[#68E1E0] font-semibold">{t.description}</h2>

      <p
        className={`font-light text- transition-all duration-300  whitespace-pre-line ${
          expanded ? "line-clamp-none" : "line-clamp-4"
        }`}
      >
        {language === "es"
          ? clase.descripcion_clase
          : clase.descripcion_clase_en}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-fit -mt-1 text-sm text-[#FC68B9] font-bold cursor-pointer uppercase"
      >
        {expanded ? t.readLess : t.readMore}
      </button>
    </section>
  );
}
