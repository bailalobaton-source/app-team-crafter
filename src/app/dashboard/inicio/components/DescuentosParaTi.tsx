"use client";

import Link from "next/link";
import CardDescuento from "../../components/CardDescuento";
import { useLanguageStore } from "@/stores/useLanguage.store";

export default function DescuentoParati() {
  const { language } = useLanguageStore();

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
      <CardDescuento
        descuento={{
          id: 1,
          monto: 20,
          tipo_descuento: "porcentaje",
          titulo:
            language === "es"
              ? "20% en Primer Taller"
              : "20% off your First Workshop",
          descripcion:
            language === "es"
              ? "Aprovecha un 20% de descuento en tu primer taller de scrapbooking. Ideal para quienes desean empezar a crear con nosotros."
              : "Get 20% off your first scrapbooking workshop. Perfect for those who want to start creating with us.",
          fecha_expiracion: "2024-11-15",
          codigo: "PRIMERO20",
        }}
      />
    </section>
  );
}
