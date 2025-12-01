"use client";

import Image from "next/image";
import { useLanguageStore } from "@/stores/useLanguage.store";

export default function ReglasForo() {
  const { language } = useLanguageStore(); // 🌐 idioma global

  const t = {
    es: {
      forumRules: "Reglas del foro",
      rule1:
        "Todas las publicaciones deben estar relacionadas a los temas tratados dentro de esta Suscripción Web.",
      rule2:
        "No está permitido el spam, autopromoción de marcas, páginas o links externos SIN AUTORIZACIÓN PREVIA.",
      rule3:
        "Antes de abrir un tema, revisa si ya existe una publicación similar.",
      rule4:
        "No compartas datos personales sensibles como direcciones, teléfonos, etc.",
      note: "Este foro está diseñado para ser un espacio seguro y creativo para inspirarnos, apoyarnos y aprender juntos. ¡Disfruta del Team Crafter!",
      featuredPosts: "Publicaciones destacadas",
      examplePost: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    },
    en: {
      forumRules: "Forum Rules",
      rule1:
        "All posts must be related to the topics covered within this Web Subscription.",
      rule2:
        "Spam, brand self-promotion, or external links WITHOUT PRIOR AUTHORIZATION are not allowed.",
      rule3: "Before creating a topic, check if a similar post already exists.",
      rule4:
        "Do not share sensitive personal data such as addresses or phone numbers.",
      note: "This forum is designed to be a safe and creative space to inspire, support, and learn together. Enjoy the Team Crafter!",
      featuredPosts: "Featured Posts",
      examplePost: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    },
  }[language];

  return (
    <section className="w-full flex flex-col gap-4 bg-white p-4 rounded-2xl border-1 border-[#FFB4DF] mt-14">
      {/* 📘 Reglas del foro */}
      <article className="flex flex-col gap-2">
        <h3 className="text-lg text-[#68E1E0] font-semibold flex items-center gap-2">
          <Image
            className="text-xs"
            src={"/icons/reglas_foro.svg"}
            alt={t.forumRules}
            width={20}
            height={20}
          />
          {t.forumRules}
        </h3>

        <ul className="list-disc pl-4 text-sm text-[#FC68B9] font-semibold flex flex-col gap-2">
          <li>{t.rule1}</li>
          <li>{t.rule2}</li>
          <li>{t.rule3}</li>
          <li>{t.rule4}</li>
        </ul>
      </article>

      {/* 💬 Nota inferior */}
      <p className="text-sm text-[#68E1E0] font-semibold flex items-center gap-2">
        {t.note}
      </p>

      {/* 🌟 Publicaciones destacadas */}
      {/* <article className="flex flex-col gap-2">
        <h3 className="text-lg text-[#68E1E0] font-semibold flex items-center gap-2">
          <Image
            className="text-xs"
            src={"/icons/publicacionesDestacadas.svg"}
            alt={t.featuredPosts}
            width={20}
            height={20}
          />
          {t.featuredPosts}
        </h3>

        <ul className="list-disc pl-4 text-sm text-[#FC68B9] font-semibold flex flex-col gap-2">
          <li>{t.examplePost}</li>
        </ul>
      </article> */}
    </section>
  );
}
