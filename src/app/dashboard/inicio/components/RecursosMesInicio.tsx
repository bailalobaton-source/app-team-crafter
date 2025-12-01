"use client";

import Link from "next/link";
import CardRecursos from "../../components/CardRecursos";
import { useCallback, useEffect, useState } from "react";
import { Recurso } from "@/interfaces/recurso.interface";
import { getRecursos } from "@/services/recursos.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { useLanguageStore } from "@/stores/useLanguage.store";

export default function RecursosMesInicio() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const { language } = useLanguageStore();

  const gfindRecursos = useCallback(async () => {
    try {
      const res = await getRecursos({ cuatro_ultimos: "true" });
      setRecursos(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    gfindRecursos();
  }, [gfindRecursos]);

  // 🌐 Traducciones al estilo que usas en el proyecto
  const t = {
    es: {
      title: "Recursos del mes",
      viewAll: "Ver todo",
    },
    en: {
      title: "Resources of the month",
      viewAll: "View all",
    },
  }[language];

  return (
    <section className="w-full flex flex-col gap-8 pt-16">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl font-extrabold uppercase text-[#96EAEA] max-md:text-xl">
          {t.title}
        </h2>
        <Link
          href={"/"}
          className="text-lg font-semibold text-[#FC68B9] uppercase max-md:text-sm"
        >
          {t.viewAll}
        </Link>
      </div>

      <div className="flex flex-wrap justify-between gap-[30px] ">
        {recursos.map((recurso) => (
          <CardRecursos key={recurso.id} recurso={recurso} />
        ))}
      </div>
    </section>
  );
}
