"use client";

import Link from "next/link";
import CardClases from "../../components/CardClases";
import { Clase } from "@/interfaces/clase.interface";
import { useCallback, useEffect, useState } from "react";
import { getClases } from "@/services/clases.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { useLanguageStore } from "@/stores/useLanguage.store";

export default function ClasesRecientesInicio() {
  const [clases, setClases] = useState<Clase[]>([]);
  const { language } = useLanguageStore();

  const gfindClases = useCallback(async () => {
    try {
      const res = await getClases({ cuatro_ultimos: "true" });
      setClases(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    gfindClases();
  }, [gfindClases]);

  // 🌐 Traducciones (igual al formato que usas)
  const t = {
    es: {
      recentClasses: "clases recientes",
      viewAll: "Ver todo",
    },
    en: {
      recentClasses: "recent classes",
      viewAll: "View all",
    },
  }[language];

  return (
    <section className="w-full flex flex-col gap-8 pt-10">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl font-extrabold uppercase text-[#96EAEA] max-md:text-xl">
          {t.recentClasses}
        </h2>
        <Link
          href={"/dashboard/clases"}
          className="text-lg font-semibold text-[#FC68B9] uppercase max-md:text-sm"
        >
          {t.viewAll}
        </Link>
      </div>

      <div className="w-full flex flex-wrap gap-[30px]">
        {clases.map((clase) => (
          <CardClases key={clase.id} clase={clase} width="w-[calc(50%-15px)]" />
        ))}
      </div>
    </section>
  );
}
