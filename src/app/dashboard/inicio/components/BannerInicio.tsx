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
      <strong>
        Bienvenido a Team Crafter Web. Te recomendamos leer la sección de
        Preguntas Frecuentes, donde encontrarás información importante sobre el
        funcionamiento de la plataforma, descargas y suscripciones. Recuerda que
        no habrá opción a reclamo por pérdida de archivos descargados o pérdida
        de acceso por cancelación de suscripción.
      </strong>
    </>
  ),
  en: (
    <>
      <strong>
        Welcome to Team Crafter Web. We recommend reading the Frequently Asked
        Questions section, where you will find important information about how
        the platform, downloads, and subscriptions work. Please note that no
        claims can be made for lost downloaded files or loss of access due to
        subscription cancellation.
      </strong>
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
                src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${banner.url_banner}`}
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
