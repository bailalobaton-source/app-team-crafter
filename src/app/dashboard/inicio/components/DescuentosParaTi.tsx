"use client";

import Link from "next/link";
import CardDescuento from "../../components/CardDescuento";
import { useLanguageStore } from "@/stores/useLanguage.store";
import { useCallback, useEffect, useState } from "react";
import { Descuento } from "@/interfaces/descuentos.interface";
import { getDescuentos } from "@/services/descuentos.service";
import { handleAxiosError } from "@/utils/errorHandler";

export default function DescuentoParati() {
  const { language } = useLanguageStore();
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);

  const gfindClases = useCallback(async () => {
    try {
      const res = await getDescuentos();
      setDescuentos(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []); // 👈 dependencias

  useEffect(() => {
    gfindClases();
  }, []);
  // 🌐 Traducciones
  const t = {
    es: {
      title: "Descuentos para ti",
      viewAll: "Ver todo",
    },
    en: {
      title: "Discounts for you",
      viewAll: "View all",
    },
  }[language];

  return (
    <section className="w-full flex flex-col gap-8 mt-14 mb-14">
      <div className="w-full flex justify-between">
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
      <CardDescuento descuento={descuentos[0]} />
    </section>
  );
}
