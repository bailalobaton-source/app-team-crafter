"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { getBanner } from "@/services/notificacion.service";
import { useEffect, useState } from "react";
import { Banner } from "@/interfaces/banner.interface";
import { useLanguageStore } from "@/stores/useLanguage.store";

// 🗣️ Traducciones con estructura y <strong> mantenidos
const TRANSLATIONS = {
  es: (
    <>
      <strong>¡Bienvenido!</strong> Desde el momento en que te suscribes,
      disfrutas de acceso{" "}
      <strong>a contenido exclusivo, clases y recursos diseñados</strong> para
      tus proyectos de Papelería Creativa y Personalizados. Recuerda que cada
      recurso estará disponible por{" "}
      <strong>
        30 días desde su publicación. Una vez caducado, no habrá opción a
        reclamos,
      </strong>{" "}
      así que no olvides{" "}
      <strong>descargarlo a tiempo y aprovecharlo al máximo.</strong>
    </>
  ),
  en: (
    <>
      <strong>Welcome!</strong> From the moment you subscribe, you get access to{" "}
      <strong>exclusive content, classes, and resources</strong> designed for
      your Creative and Personalized Stationery projects. Remember that each
      resource will be available for{" "}
      <strong>
        30 days after its publication. Once expired, there will be no option for
        claims,
      </strong>{" "}
      so don’t forget to{" "}
      <strong>download it in time and make the most of it.</strong>
    </>
  ),
};

export default function BannerInicio() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const { language } = useLanguageStore();

  const cargarBanners = async () => {
    try {
      const data = await getBanner();
      setBanners(data);
    } catch (error) {
      console.error("Error al cargar banners:", error);
    }
  };

  useEffect(() => {
    cargarBanners();
  }, []);

  return (
    <section className="relative w-full flex flex-col overflow-hidden">
      {/* 🖼️ Carrusel de banners */}
      <div className="w-full h-[450px] max-md:h-[300px]">
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
          {banners?.map((banner) => (
            <SwiperSlide key={banner.id} className="!w-full !h-full pb-10">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${banner.url_banner}`}
                alt="Banner"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 💬 Texto informativo traducido */}
      <article className="w-full bg-[#FFEE97] p-4 mt-4 border-4 border-[#FFE251] flex items-center gap-4 rounded-xl max-md:flex-col">
        <Image
          className="w-[55px] h-[55px] object-cover max-md:w-[40px] max-md:h-[40px]"
          src="/icons/sAdmiracion.svg"
          alt="Icono de información"
          width={100}
          height={100}
        />
        <p className="text-[#FC68B9] text-lg max-md:text-base max-md:text-center">
          {TRANSLATIONS[language]}
        </p>
      </article>
    </section>
  );
}
