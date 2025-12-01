"use client";

import { TbArrowsUpDown } from "react-icons/tb";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  totalComentarios: number;
}

export default function FiltrarComentarios({ totalComentarios }: Props) {
  const { language } = useLanguageStore();

  // 🌐 Traducciones
  const t = {
    es: {
      comments: "Comentarios",
      mostRecent: "Más reciente",
    },
    en: {
      comments: "Comments",
      mostRecent: "Most recent",
    },
  }[language];

  return (
    <section className="relative w-full h-9 flex justify-between items-center mt-6">
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8A8A8A]" />

      <article className="relative h-full flex items-center gap-2 text-lg z-10">
        <span className="text-[#FC68B9] font-bold">{totalComentarios}</span>
        <p className="text-[#68E1E0] font-semibold text-nowrap">{t.comments}</p>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FC68B9]" />
      </article>

      <div className="h-full flex items-center z-10">
        <button className="flex items-center gap-2">
          <TbArrowsUpDown className="text-xl text-[#FC68B9]" />
          <p className="text-medium text-[#FC68B9] font-bold">{t.mostRecent}</p>
        </button>
      </div>
    </section>
  );
}
