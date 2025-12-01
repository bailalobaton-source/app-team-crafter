"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { ImClock } from "react-icons/im";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  order: string;
  setOrder: (i: "asc" | "desc") => void;
}

export default function FiltrarForo({ order, setOrder }: Props) {
  const { language } = useLanguageStore();

  const toggleOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  // 🌐 Traducciones
  const t = {
    es: {
      new: "Nuevos",
      popular: "Populares",
      mostRecent: "Más reciente",
      oldest: "Más antiguo",
    },
    en: {
      new: "Newest",
      popular: "Popular",
      mostRecent: "Most recent",
      oldest: "Oldest",
    },
  }[language];

  return (
    <section className="w-full flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-2">
      {/* Botones de filtro */}
      <div className="flex items-center gap-2 max-sm:w-full">
        <Button
          className="max-sm:w-full bg-[#FC68B9] border-1 border-[#FC68B9] text-white font-bold px-3"
          radius="full"
          startContent={<ImClock className="text-lg" />}
        >
          {t.new}
        </Button>
        <Button
          className="max-sm:w-full bg-[#FFE1F2] border-1 border-[#FFE1F2] text-[#FC68B9] font-bold px-3"
          radius="full"
          startContent={
            <Image
              src={"/icons/arrowOut.svg"}
              alt={t.popular}
              width={14}
              height={14}
            />
          }
        >
          {t.popular}
        </Button>
      </div>

      {/* Botón de orden */}
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
    </section>
  );
}
