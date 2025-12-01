"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";
import { useMenuUIStore } from "@/stores/menu.store";
import { useLanguageStore } from "@/stores/useLanguage.store";

// 📘 Configuración base del menú
const MENU_CONFIG = {
  items: [
    { href: "/dashboard/inicio", key: "home", icon: "home" },
    { href: "/dashboard/clases", key: "classes", icon: "clases" },
    { href: "/dashboard/recursos", key: "resources", icon: "recursos" },
    { href: "/dashboard/descuentos", key: "discounts", icon: "descuento" },
    { href: "/dashboard/foro", key: "forum", icon: "foro" },
  ],
  colors: {
    bg: "#C3F3F3",
    primary: "#68E1E0",
    accent: "#FC68B9",
    text: "white",
  },
} as const;

// 🌐 Traducciones centralizadas
const TRANSLATIONS = {
  es: {
    menuTitle: "MENÚ",
    items: {
      home: "Inicio",
      classes: "Clases",
      resources: "Recursos",
      discounts: "Descuentos",
      forum: "Foro",
    },
    helpTitle: "¿Tienes dudas?",
    helpText:
      "Consulta las Preguntas Frecuentes y resuelve tus dudas al instante.",
    faqButton: "Ver FAQ",
  },
  en: {
    menuTitle: "MENU",
    items: {
      home: "Home",
      classes: "Classes",
      resources: "Resources",
      discounts: "Discounts",
      forum: "Forum",
    },
    helpTitle: "Have questions?",
    helpText:
      "Check the Frequently Asked Questions and clear your doubts instantly.",
    faqButton: "View FAQ",
  },
} as const;

// 🧩 Item del menú individual
const MenuItem = memo(
  ({
    href,
    label,
    icon,
    isActive,
    closeMenu,
  }: {
    href: string;
    label: string;
    icon: string;
    isActive: boolean;
    closeMenu: () => void;
  }) => (
    <Link
      href={href}
      className="flex items-center gap-4 pl-9 group hover:pl-10 transition-all duration-200"
      prefetch={true}
      onClick={closeMenu}
    >
      {/* Icono con hover */}
      <div className="h-10 w-10 relative transition-all duration-200">
        <Image
          src={`/home/${icon}-${isActive ? "yes" : "no"}.svg`}
          alt={`Icono ${label}`}
          width={40}
          height={40}
          className={`transition-opacity duration-200 ${
            isActive ? "opacity-100" : "opacity-100 group-hover:opacity-0"
          }`}
        />
        {!isActive && (
          <Image
            src={`/home/${icon}-yes.svg`}
            alt={`Icono ${label} activo`}
            width={40}
            height={40}
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
        )}
      </div>

      <p
        className={`text-lg font-bold m-0 transition-colors duration-200 ${
          isActive ? "text-[#FC68B9]" : "text-white group-hover:text-[#FC68B9]"
        }`}
      >
        {label}
      </p>
    </Link>
  )
);

MenuItem.displayName = "MenuItem";

// 💬 Sección de ayuda con traducción
const HelpSection = memo(
  ({ t }: { t: (key: keyof (typeof TRANSLATIONS)["es"]) => string }) => (
    <div className="px-8">
      <section className="w-full bg-[#68E1E0] rounded-2xl p-4 py-5 flex flex-col items-start gap-3 shadow-sm">
        <Image
          className="h-[54px] w-[54px]"
          src="/home/interogation.svg"
          alt={t("helpTitle")}
          width={54}
          height={54}
          loading="lazy"
        />
        <h3 className="text-lg font-bold text-white mt-2">{t("helpTitle")}</h3>
        <p className="text-lg text-white leading-relaxed">{t("helpText")}</p>
        <Link
          className="w-full bg-transparent text-center border border-[#FC68B9] text-[#FC68B9] font-semibold text-lg p-3 mt-2 hover:bg-[#FC68B9] hover:text-white transition-colors rounded-full duration-300"
          href="/preguntas-frecuentes"
        >
          {t("faqButton")}
        </Link>
      </section>
    </div>
  )
);

HelpSection.displayName = "HelpSection";

// 🧭 Componente principal del menú
export default function Menu() {
  const pathname = usePathname();
  const { isOpen, closeMenu } = useMenuUIStore();
  const { language } = useLanguageStore();

  // Traducciones actuales
  const tr = TRANSLATIONS[language];
  const translate = (key: keyof (typeof TRANSLATIONS)["es"]) =>
    tr[key] as string;

  // Ítems del menú traducidos dinámicamente
  const menuItems = useMemo(
    () =>
      MENU_CONFIG.items.map((item) => (
        <MenuItem
          key={item.href}
          href={item.href}
          label={tr.items[item.key]}
          icon={item.icon}
          isActive={pathname === item.href}
          closeMenu={closeMenu}
        />
      )),
    [pathname, closeMenu, tr]
  );

  return (
    <>
      {/* Fondo oscuro (overlay) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={closeMenu} />
      )}

      {/* Contenedor del menú */}
      <div
        className={`min-w-[280px] w-min h-full overflow-auto bg-[#C3F3F3] py-6 flex flex-col gap-4 z-40 
          max-md:fixed max-md:top-[65px] max-md:h-[calc(100vh-65px)]
          transition-opacity duration-300 ease-in-out
          ${
            isOpen
              ? "opacity-100"
              : "max-md:opacity-0 max-md:pointer-events-none"
          }
        `}
      >
        <h2 className="ml-9 text-lg font-bold text-[#68E1E0]">
          {translate("menuTitle")}
        </h2>

        <nav className="flex flex-col gap-6">{menuItems}</nav>

        <div className="flex-1 max-md:flex-none pt-4" />

        <HelpSection t={translate} />
      </div>
    </>
  );
}
