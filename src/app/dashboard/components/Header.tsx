"use client";

import { Clase } from "@/interfaces/clase.interface";
import { getBuscar } from "@/services/clases.service";
import { useMenuUIStore } from "@/stores/menu.store";
import { usePerfilStore } from "@/stores/perfil.store";
import { useLanguageStore } from "@/stores/useLanguage.store";
import { removeToken } from "@/utils/authUtils";
import { handleAxiosError } from "@/utils/errorHandler";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

export default function Header() {
  const { toggleMenu, isOpen } = useMenuUIStore();
  const { language, toggleLanguage } = useLanguageStore();

  const perfil = usePerfilStore((state) => state.perfil);
  const router = useRouter();
  const [clases, setClases] = useState<Clase[]>([]);
  const [buscador, setBuscador] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = {
    es: {
      searchPlaceholder: "Buscar clases...",
      myAccount: "Mi cuenta",
      favorites: "Favoritos",
      logout: "Cerrar sesión",
      english: "Inglés",
      spanish: "Español",
      showingResults: "Mostrando",
      results: "resultados",
      notifications: "Notificaciones",
    },
    en: {
      searchPlaceholder: "Search classes...",
      myAccount: "My account",
      favorites: "Favorites",
      logout: "Log out",
      english: "English",
      spanish: "Spanish",
      showingResults: "Showing",
      results: "results",
      notifications: "Notifications",
    },
  }[language];

  const handleLogout = () => {
    removeToken();
    router.push("/iniciar-sesion");
    window.location.reload();
  };

  // Cerrar búsqueda al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Búsqueda con debounce
  useEffect(() => {
    const searchClasses = async () => {
      if (buscador.length <= 2) {
        setClases([]);
        setIsSearchOpen(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await getBuscar(buscador);
        setClases(res);
        setIsSearchOpen(res.length > 0);
      } catch (err) {
        handleAxiosError(err);
        setClases([]);
        setIsSearchOpen(false);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchClasses, 300);
    return () => clearTimeout(debounceTimer);
  }, [buscador]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBuscador(value);

    if (value.length > 2) {
      setIsLoading(true);
    }
  };

  const handleSearchFocus = () => {
    if (clases.length > 0 && buscador.length > 2) {
      setIsSearchOpen(true);
    }
  };

  const handleClassClick = () => {
    setIsSearchOpen(false);
    setBuscador("");
    setClases([]);
  };

  const clearSearch = () => {
    setBuscador("");
    setClases([]);
    setIsSearchOpen(false);
    inputRef.current?.focus();
  };

  return (
    <header className="w-full h-[80px] px-4 md:px-20 bg-[#fc68b9] flex items-center justify-between relative z-50">
      <Link href={"/dashboard/inicio"} className="max-md:hidden">
        <Image
          className="h-[54px] w-auto flex-shrink-0"
          src="/logo.png"
          alt="Logo PS y AI"
          width={200}
          height={54}
          priority
        />
      </Link>
      <button
        className="relative w-12 h-10  hidden flex-col items-center justify-center gap-1.5 rounded-3xl cursor-pointer  max-md:flex "
        onClick={toggleMenu}
      >
        <span
          className={`block w-7 h-[3px] rounded-lg bg-white ${
            isOpen ? "rotate-45 absolute" : ""
          } duration-250`}
        ></span>
        <span
          className={`block w-7 h-[3px] rounded-lg bg-white ${
            isOpen ? "-rotate-45 absolute" : ""
          } duration-250`}
        ></span>
        <span
          className={`block w-7 h-[3px] rounded-lg bg-white ${
            isOpen ? "rotate-45 absolute" : ""
          } duration-250`}
        ></span>
      </button>

      <section
        ref={searchContainerRef}
        className="relative w-full max-w-xl mx-4 md:mx-20"
      >
        <div className="relative bg-[#FFE1F2] flex items-center rounded-full transition-all duration-300 ease-in-out hover:shadow-lg focus-within:shadow-lg focus-within:ring-2 focus-within:ring-white/30">
          <input
            ref={inputRef}
            name="search"
            className="w-full py-2.5 px-5 bg-transparent placeholder:text-[#FFB4DF] text-lg font-bold text-[#fc68b9] focus:outline-none transition-all duration-200 max-md:text-sm"
            type="text"
            placeholder={t.searchPlaceholder}
            value={buscador}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            autoComplete="off"
          />

          {/* Botón para limpiar búsqueda */}
          {buscador && (
            <button
              onClick={clearSearch}
              className="absolute right-12 p-1 text-[#FFB4DF] hover:text-[#fc68b9] transition-colors duration-200"
              aria-label="Limpiar búsqueda"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          <button
            className="absolute right-0 h-full p-3 px-5 cursor-pointer transition-all duration-200 hover:scale-105"
            aria-label="Buscar"
          >
            {isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#fc68b9] border-t-transparent"></div>
            ) : (
              <Image
                className="h-full w-auto"
                src="/icons/search.svg"
                alt="Buscar"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>

        <div
          className={`absolute top-[110%] left-0 z-50 bg-[#FFE1F2] rounded-2xl w-full overflow-hidden shadow-xl border border-[#ffcce9] transition-all duration-300 ease-out transform ${
            isSearchOpen && clases.length > 0
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <div className="max-h-96 overflow-y-auto">
            {clases.map((clase, index) => (
              <Link
                key={clase.id}
                href={`/dashboard/clases/${clase.id}`}
                onClick={handleClassClick}
                className={`block p-4 border-b border-[#ffcce9] last:border-b-0 hover:bg-[#edd5e3] transition-all duration-200 transform hover:scale-[1.02] ${
                  index === 0 ? "rounded-t-2xl" : ""
                } ${
                  index === clases.length - 1 ? "rounded-b-2xl border-b-0" : ""
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isSearchOpen ? "slideInUp 0.3s ease-out" : "none",
                }}
              >
                <div className="space-y-1">
                  <h3 className="text-sm text-[#fc68b9] font-bold leading-tight line-clamp-1">
                    {clase.titulo_clase}
                  </h3>
                  <p className="text-xs text-[#8A8A8A] font-medium line-clamp-2 leading-relaxed">
                    {clase.descripcion_clase}
                  </p>
                  {clase.recurso?.nombre_recurso && (
                    <p className="text-xs text-[#fc68b9] font-bold bg-[#FFE1F2] inline-block px-2 py-1 rounded-full">
                      {clase.recurso.nombre_recurso}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Indicador de más resultados */}
          {clases.length >= 5 && (
            <div className="p-2 text-center bg-[#edd5e3]">
              <p className="text-xs text-[#8A8A8A] font-medium">
                {t.showingResults} {clases.length} {t.results}
              </p>
            </div>
          )}
        </div>

        {/* Overlay para cerrar en móvil */}
        {isSearchOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsSearchOpen(false)}
          />
        )}
      </section>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Link href="/dashboard/notificaciones" aria-label="Notificaciones">
          <Image
            className="h-[40px] w-auto hover:opacity-80 transition-all duration-200 hover:scale-105"
            src="/icons/notification.svg"
            alt="Notificaciones"
            width={40}
            height={40}
          />
        </Link>

        <Dropdown
          classNames={{
            base: "before:bg-[#FFE1F2]",
            content:
              "bg-[#FFE1F2] min-w-[200px] shadow-lg border border-[#ffcce9]",
          }}
        >
          <DropdownTrigger>
            <div className="flex items-center text-white gap-2 cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-105">
              <Image
                className="h-[40px] w-[40px] border-2 border-[#68E1E0] rounded-full object-cover transition-all duration-200"
                src={
                  perfil?.foto_perfil
                    ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${perfil.foto_perfil}`
                    : "/icons/user.svg"
                }
                alt="Avatar usuario"
                width={40}
                height={40}
              />
              <p className="text-base font-bold hidden sm:block">
                {perfil?.nombre}{" "}
              </p>
              <RiArrowDownSLine className="text-2xl transition-transform duration-200 group-hover:rotate-180 max-md:hidden" />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Menú de usuario"
            variant="flat"
            itemClasses={{
              base: ["rounded-t-xs"],
            }}
          >
            <DropdownItem
              key="mi-cuenta"
              className="group px-4 py-1 data-[hover=true]:bg-transparent rounded-lg mx-2 my-1 transition-all duration-200"
            >
              <Link
                href="/dashboard/mi-cuenta"
                className="text-[#FC68B9] text-base font-semibold  flex items-center gap-2 w-full "
              >
                <div className="w-8 h-8 rounded-lg bg-[#ffcce9] group-hover:bg-[#FC68B9] p-1.5 flex items-center justify-center">
                  <Image
                    className="h-[24px] w-[24px]"
                    src="/icons/miCuenta.svg"
                    alt="Mi cuenta"
                    width={24}
                    height={24}
                  />
                </div>
                {t.myAccount}
              </Link>
            </DropdownItem>

            <DropdownItem
              key="favoritos"
              className="px-4 py-1 data-[hover=true]:bg-transparent rounded-lg mx-2 my-1 transition-all duration-200"
            >
              <Link
                href="/dashboard/favoritos"
                className="text-[#FC68B9] text-base font-semibold  flex items-center gap-2 w-full "
              >
                <div className="w-8 h-8 rounded-lg bg-[#ffcce9] group-hover:bg-[#FC68B9] p-1.5 flex items-center justify-center">
                  <Image
                    className="h-[22px] w-[22px]"
                    src="/icons/favoritos-white.svg"
                    alt="Mi cuenta"
                    width={24}
                    height={24}
                  />
                </div>
                {t.favorites}
              </Link>
            </DropdownItem>

            <DropdownItem
              key="cerrar-sesion"
              onClick={handleLogout}
              className="px-4 py-1 data-[hover=true]:bg-transparent rounded-lg mx-2 my-1 transition-all duration-200"
            >
              <span className="text-[#FC68B9] text-base font-semibold  flex items-center gap-2 w-full ">
                <div className="w-8 h-8 rounded-lg bg-[#ffcce9] group-hover:bg-[#FC68B9] p-1.5 flex items-center justify-center">
                  <Image
                    src="/icons/cerrarSesion.svg"
                    alt="Cerrar sesión"
                    width={24}
                    height={24}
                    className="w-6 h-auto" // 👈 mantiene proporción automática
                  />
                </div>
                {t.logout}
              </span>
            </DropdownItem>
            <DropdownItem
              key="Idiomas"
              className="px-4 py-1 data-[hover=true]:bg-transparent rounded-lg mx-2 my-1 transition-all duration-200"
            >
              <Button
                className="w-full bg-[#FC68B9] text-white font-semibold gap-2"
                radius="full"
                onPress={toggleLanguage}
              >
                <Image
                  src={
                    language === "es"
                      ? "/icons/ingles.svg"
                      : "/icons/spanish.svg"
                  }
                  alt="Idioma"
                  width={30}
                  height={30}
                />
                <p>{language === "es" ? t.english : t.spanish}</p>
              </Button>
            </DropdownItem>
          </DropdownMenu>
             
        </Dropdown>
      </div>
    </header>
  );
}
