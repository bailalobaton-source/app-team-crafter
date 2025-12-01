"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { useLanguageStore } from "@/stores/useLanguage.store";

export default function TituloForo() {
  const { language } = useLanguageStore();

  // 🌐 Traducciones
  const t = {
    es: {
      home: "Inicio",
      forum: "Foro",
      community: "Comunidad de",
      teamCrafter: "team crafter",
    },
    en: {
      home: "Home",
      forum: "Forum",
      community: "Community of",
      teamCrafter: "team crafter",
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
        <BreadcrumbItem>{t.forum}</BreadcrumbItem>
      </Breadcrumbs>

      <h1
        className="relative m-auto w-fit text-6xl font-black text-[#96EAEA] flex items-center justify-center uppercase
        max-sm:text-3xl"
      >
        {t.community} <br />
        <strong
          className="absolute -bottom-13 text-[86px] text-[#FC68B9] font-[LearningCurve] normal-case
          max-sm:text-5xl max-sm:-bottom-8"
        >
          {t.teamCrafter}
        </strong>
      </h1>
    </section>
  );
}
