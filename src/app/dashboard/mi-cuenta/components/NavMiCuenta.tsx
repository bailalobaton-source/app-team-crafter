"use client";

import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/stores/useLanguage.store";
import { removeToken } from "@/utils/authUtils";

interface Props {
  navSelect: number;
  setNavSelect: (open: number) => void;
}

export default function NavMiCuenta({ navSelect, setNavSelect }: Props) {
  const router = useRouter();
  const { language } = useLanguageStore();

  const t = {
    es: {
      detalles: "Detalles",
      descargas: "Descargas",
      membresia: "Membresía",
      cerrarSesion: "Cerrar sesión",
    },
    en: {
      detalles: "Details",
      descargas: "Downloads",
      membresia: "Membership",
      cerrarSesion: "Sign out",
    },
  }[language];

  const navs = [
    {
      id: 1,
      title: t.detalles,
    },
    {
      id: 2,
      title: t.descargas,
    },
    {
      id: 4,
      title: t.membresia,
    },
  ];

  const handleLogout = () => {
    removeToken();
    router.push("/iniciar-sesion");
    window.location.reload();
  };

  return (
    <section className="m-auto flex gap-1 max-sm:w-full max-sm:m-0 max-sm:overflow-x-scroll">
      {navs.map((nav) => (
        <button
          key={nav.id}
          className={`${
            navSelect === nav.id
              ? "bg-[#FC68B9] text-[#FFFFFF]"
              : "bg-[#FFE1F2] text-[#FC68B9]"
          } px-6 py-2 rounded-full text-lg font-bold cursor-pointer max-sm:py-2 max-sm:text-md`}
          onClick={() => {
            setNavSelect(nav.id);
            router.push(`/dashboard/mi-cuenta?nav=${nav.id}`);
          }}
        >
          {nav.title}
        </button>
      ))}

      <button
        className="bg-white text-[#FC68B9] border-1 border-[#FC68B9] px-6 py-2 rounded-full text-lg font-bold cursor-pointer max-sm:py-2 max-sm:text-md whitespace-nowrap"
        onClick={handleLogout}
      >
        {t.cerrarSesion}
      </button>
    </section>
  );
}
