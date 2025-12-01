"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  setOpenFilter: (open: boolean) => void;
  openFilter?: boolean;
  setCategoria: (categoria: string) => void;
  setTutorial: (tutorial: string) => void;
  categoria: string;
  tutorial: string;
  gfindRecursos: () => void;
}

export default function FiltrarRecursos({
  setOpenFilter,
  openFilter,
  setCategoria,
  setTutorial,
  categoria,
  tutorial,
  gfindRecursos,
}: Props) {
  const [openCategorias, setOpenCategorias] = useState(true);
  const [openTutoriales, setOpenTutoriales] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // 🌐 Store de idioma
  const { language } = useLanguageStore();

  // 🌍 Traducciones
  const t = {
    es: {
      filters: "Filtros",
      tutorials: "Tutoriales y Tips",
      categories: "Categorías",
      apply: "Aplicar",
      all: "Todos",
      exclusive: "Exclusivos",
      additional: "Adicionales",
      cake: "Cake Toppers",
      boxes: "Cajitas Temáticas",
      carton: "Cartonaje",
      invitations: "Tarjetas Invitación",
      projects: "Proyectos Varios",
    },
    en: {
      filters: "Filters",
      tutorials: "Tutorials & Tips",
      categories: "Categories",
      apply: "Apply",
      all: "All",
      exclusive: "Exclusive",
      additional: "Additional",
      cake: "Cake Toppers",
      boxes: "Themed Boxes",
      carton: "Paper Craft",
      invitations: "Invitation Cards",
      projects: "Various Projects",
    },
  }[language];

  // 🧠 Cierra el panel si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    if (openFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter, setOpenFilter]);

  // 📚 Listas traducidas dinámicamente
  const categorias = [
    { id: "Todos", label: t.all },
    { id: "Cake Toppers", label: t.cake },
    { id: "Cajitas Temáticas", label: t.boxes },
    { id: "Cartonaje", label: t.carton },
    { id: "Tarjetas Invitación", label: t.invitations },
    { id: "Proyectos Varios", label: t.projects },
  ];

  const tutoriales = [
    { id: "Todos", label: t.all },
    { id: "Exclusivos", label: t.exclusive },
    { id: "Adicionales", label: t.additional },
  ];

  return (
    <div
      className={`fixed top-0 right-0 w-screen h-screen flex justify-end bg-[#1717178a] z-[60]
      transition-opacity duration-300 ease-in-out
      ${
        openFilter
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <section
        ref={sectionRef}
        className="w-full max-w-[383px] h-screen py-10 px-5 bg-white flex flex-col items-center gap-6 relative"
      >
        {/* Cerrar */}
        <button
          className="absolute top-5 right-5 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => setOpenFilter(false)}
        >
          <IoCloseOutline className="text-[#FC68B9] text-4xl" />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3 text-[#FC68B9] mt-4">
          <Image
            src="/icons/grid-pink.svg"
            alt={t.filters}
            width={40}
            height={40}
            priority
          />
          <h2 className="text-lg font-semibold">{t.filters.toUpperCase()}</h2>
        </div>

        {/* --- SECCIÓN TUTORIALES --- */}
        <article className="w-full">
          <Button
            className="w-full bg-white text-[#FC68B9] text-lg font-semibold flex justify-between border border-[#FC68B9]"
            endContent={
              <IoIosArrowUp
                className={`text-xl transition-transform ${
                  openTutoriales ? "" : "rotate-180"
                }`}
              />
            }
            radius="full"
            onPress={() => setOpenTutoriales(!openTutoriales)}
          >
            {t.tutorials}
          </Button>

          {openTutoriales && (
            <div className="mt-4 space-y-2 pl-2">
              {tutoriales.map((item) => (
                <label
                  key={item.id}
                  htmlFor={`tut-${item.id}`}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    id={`tut-${item.id}`}
                    name="tutorial"
                    value={item.id}
                    checked={tutorial === item.id}
                    onChange={() => setTutorial(item.id)}
                    className="appearance-none w-5 h-5 border-2 border-pink-500 rounded-full grid place-content-center
                      before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:scale-0 
                      before:transition-transform before:duration-200 before:bg-pink-500
                      checked:before:scale-100"
                  />
                  <span className="text-medium font-semibold text-gray-500">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </article>

        {/* --- SECCIÓN CATEGORÍAS --- */}
        <article className="w-full">
          <Button
            className="w-full bg-white text-[#FC68B9] text-lg font-semibold flex justify-between border border-[#FC68B9]"
            endContent={
              <IoIosArrowUp
                className={`text-xl transition-transform ${
                  openCategorias ? "" : "rotate-180"
                }`}
              />
            }
            radius="full"
            onPress={() => setOpenCategorias(!openCategorias)}
          >
            {t.categories}
          </Button>

          {openCategorias && (
            <div className="mt-4 space-y-2 pl-2">
              {categorias.map((cat) => (
                <label
                  key={cat.id}
                  htmlFor={`cat-${cat.id}`}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    id={`cat-${cat.id}`}
                    name="categoria"
                    value={cat.id}
                    checked={categoria === cat.id}
                    onChange={() => setCategoria(cat.id)}
                    className="appearance-none w-5 h-5 border-2 border-pink-500 rounded-full grid place-content-center
                      before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:scale-0 
                      before:transition-transform before:duration-200 before:bg-pink-500
                      checked:before:scale-100"
                  />
                  <span className="text-medium font-semibold text-gray-500">
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </article>

        <div className="flex-1" />

        {/* Botón Aplicar */}
        <Button
          className="w-full py-6 bg-[#FC68B9] text-white text-lg font-bold hover:bg-[#e3569c] transition-colors"
          radius="full"
          onPress={gfindRecursos}
        >
          {t.apply}
        </Button>
      </section>
    </div>
  );
}
