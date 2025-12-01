"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { useLanguageStore } from "@/stores/useLanguage.store";

export default function TituloMiCuenta() {
  const { language } = useLanguageStore();

  // 🌍 Traducciones dinámicas
  const t = {
    es: {
      home: "Inicio",
      myAccount: "Mi cuenta",
    },
    en: {
      home: "Home",
      myAccount: "My account",
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
        <BreadcrumbItem>{t.myAccount}</BreadcrumbItem>
      </Breadcrumbs>

      <h1
        className="relative m-auto w-fit text-6xl font-black text-[#96EAEA] flex items-center justify-center uppercase
        max-sm:text-4xl"
      >
        {t.myAccount}
      </h1>
    </section>
  );
}
