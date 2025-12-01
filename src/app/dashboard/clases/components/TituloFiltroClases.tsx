"use client";

import { BreadcrumbItem, Breadcrumbs, Button } from "@heroui/react";
import Image from "next/image";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  setOpenFilter: (open: boolean) => void;
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
}

export default function TituloFiltroClases({
  setOpenFilter,
  order,
  setOrder,
}: Props) {
  const { language } = useLanguageStore();

  // 🌍 Traducciones
  const t = {
    es: {
      home: "Inicio",
      classes: "Clases",
      ourClasses: "Nuestras clases",
      description:
        "Revisa todas las clases grabadas, tanto recientes como anteriores.",
      mostRecent: "Más reciente",
      oldest: "Más antiguo",
      filters: "Filtros",
    },
    en: {
      home: "Home",
      classes: "Classes",
      ourClasses: "Our Classes",
      description: "Check out all recorded classes, both recent and past.",
      mostRecent: "Most recent",
      oldest: "Oldest",
      filters: "Filters",
    },
  }[language];

  const toggleOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  return (
    <section className="w-full flex flex-col gap-6">
      {/* 🧭 Migas de pan */}
      <Breadcrumbs
        itemClasses={{
          item: ["data-[current=true]:text-[#FC68B9] transition-colors"],
        }}
        size="lg"
      >
        <BreadcrumbItem key="inicio">{t.home}</BreadcrumbItem>
        <BreadcrumbItem>{t.classes}</BreadcrumbItem>
      </Breadcrumbs>

      {/* 🏷️ Título */}
      <h1 className="text-4xl font-black text-[#96EAEA] max-sm:text-2xl">
        {t.ourClasses}
      </h1>

      {/* 📋 Descripción + Botones */}
      <article className="w-full flex justify-between items-end gap-2 max-md:flex-col">
        <p className="text-[#8A8A8A] max-md:text-sm">{t.description}</p>

        <div className="flex gap-2 max-md:mt-4">
          {/* Botón de orden */}
          <Button
            className="bg-white border border-[#FC68B9] text-[#FC68B9] font-semibold hover:bg-[#fc68b939]"
            radius="full"
            onPress={toggleOrder}
            startContent={
              <Image
                src="/icons/arrows.svg"
                alt="Ordenar"
                width={20}
                height={20}
              />
            }
          >
            {order === "desc" ? t.mostRecent : t.oldest}
          </Button>

          {/* Botón de filtros */}
          <Button
            className="bg-white border border-[#FC68B9] text-[#FC68B9] font-semibold hover:bg-[#fc68b939]"
            radius="full"
            startContent={
              <Image
                src="/icons/grid.svg"
                alt={t.filters}
                width={22}
                height={22}
              />
            }
            onPress={() => setOpenFilter(true)}
          >
            {t.filters}
          </Button>
        </div>
      </article>
    </section>
  );
}
