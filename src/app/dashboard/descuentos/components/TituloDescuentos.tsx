"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { useLanguageStore } from "@/stores/useLanguage.store";

export default function TituloDescuentos() {
  const { language } = useLanguageStore();

  // 🌐 Traducciones
  const t = {
    es: {
      home: "Inicio",
      discounts: "Descuentos",
      subscribers: "suscriptores",
    },
    en: {
      home: "Home",
      discounts: "Discounts",
      subscribers: "subscribers",
    },
  }[language];

  return (
    <section className="w-full flex flex-col gap-6">
      <Breadcrumbs
        itemClasses={{
          item: ["data-[current=true]:text-[#FC68B9] transition-colors"],
        }}
        size="lg"
      >
        <BreadcrumbItem key="inicio">{t.home}</BreadcrumbItem>
        <BreadcrumbItem>{t.discounts}</BreadcrumbItem>
      </Breadcrumbs>

      <h1
        className="relative m-auto w-fit text-6xl font-black text-[#96EAEA] flex items-center justify-center uppercase
        max-sm:text-4xl"
      >
        {t.discounts} <br />
        <strong
          className="absolute -bottom-13 text-[86px] text-[#FC68B9] font-[LearningCurve] normal-case
          max-sm:text-[60px] max-sm:-bottom-8"
        >
          {t.subscribers}
        </strong>
      </h1>
    </section>
  );
}
