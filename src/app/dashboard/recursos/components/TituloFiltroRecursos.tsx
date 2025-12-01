"use client";

import { BreadcrumbItem, Breadcrumbs, Button } from "@heroui/react";
import Image from "next/image";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  setOpenFilter: (open: boolean) => void;
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
}

export default function TituloFiltroRecursos({
  setOpenFilter,
  order,
  setOrder,
}: Props) {
  const { language } = useLanguageStore();

  const toggleOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  // 🌍 Traducciones
  const t = {
    es: {
      home: "Inicio",
      resources: "Recursos",
      description:
        "Encuentra todos los recursos disponibles y compra nuestras ediciones anteriores.",
      mostRecent: "Más reciente",
      oldest: "Más antiguo",
      filters: "Filtros",
    },
    en: {
      home: "Home",
      resources: "Resources",
      description:
        "Find all available resources and purchase our previous editions.",
      mostRecent: "Most recent",
      oldest: "Oldest",
      filters: "Filters",
    },
  }[language];

  return (
    <section>
      {/* Migas de pan */}
      <Breadcrumbs
        itemClasses={{
          item: ["data-[current=true]:text-[#FC68B9] transition-colors"],
        }}
        size="lg"
      >
        <BreadcrumbItem key="inicio">{t.home}</BreadcrumbItem>
        <BreadcrumbItem>{t.resources}</BreadcrumbItem>
      </Breadcrumbs>

      {/* Título */}
      <h1 className="mt-6 text-4xl font-black text-[#96EAEA] max-md:text-2xl">
        {t.resources}
      </h1>

      {/* Descripción + botones */}
      <article className="w-full flex justify-between items-end gap-2 max-md:flex-col">
        <p className="text-[#8A8A8A]">{t.description}</p>
        <div className="flex gap-2 max-md:mt-4">
          <Button
            className="bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold mt-4 hover:bg-[#fc68b939] m-0"
            radius="full"
            onPress={toggleOrder}
            startContent={
              <Image
                className="text-xs"
                src={"/icons/arrows.svg"}
                alt="Ordenar"
                width={20}
                height={20}
              />
            }
          >
            {order === "desc" ? t.mostRecent : t.oldest}
          </Button>

          <Button
            className="bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold mt-4 hover:bg-[#fc68b939] m-0"
            radius="full"
            startContent={
              <Image
                className="text-xs"
                src={"/icons/grid.svg"}
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
