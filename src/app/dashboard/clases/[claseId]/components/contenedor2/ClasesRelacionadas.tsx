"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";
import { useCallback, useEffect, useState } from "react";
import { Clase } from "@/interfaces/clase.interface";
import { getClases } from "@/services/clases.service";
import CardClases from "@/app/dashboard/components/CardClases";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  clase: Clase;
}

export default function ClasesRelacionadas({ clase }: Props) {
  const [clases, setClases] = useState<Clase[]>([]);
  const { language } = useLanguageStore();

  // 🌐 Traducciones
  const t = {
    es: {
      relatedClasses: "Clases relacionadas",
    },
    en: {
      relatedClasses: "Related classes",
    },
  }[language];

  const gfindClases = useCallback(async () => {
    const res = await getClases({ categoria_clase: [clase.categoria_clase] });
    setClases(res);
  }, [clase.categoria_clase]);

  useEffect(() => {
    gfindClases();
  }, [gfindClases]);

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-lg text-[#68E1E0] font-semibold">
        {t.relatedClasses}
      </h2>

      <Swiper
        className="h-full w-full pb-4"
        modules={[Navigation, A11y, Autoplay, Pagination]}
        spaceBetween={1}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={true}
      >
        {clases
          .filter((c) => c.id !== clase.id)
          .map((clase) => (
            <SwiperSlide key={clase.id} className="!w-full !h-full pb-10">
              <CardClases
                key={clase.id}
                clase={clase}
                width="w-full"
                hegiht_portada="h-[150px]"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
