"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useLanguageStore } from "@/stores/useLanguage.store"; // 🌍

interface Props {
  setOpenFilter: (open: boolean) => void;
  openFilter?: boolean;
  setCategoria: (categorias: string[]) => void;
  setTutorial: (tutoriales: string[]) => void;
  categoria: string[];
  tutorial: string[];
  gfindClases: () => void;
}

export default function FiltrarClases({
  setOpenFilter,
  openFilter,
  setCategoria,
  setTutorial,
  categoria,
  tutorial,
  gfindClases,
}: Props) {
  const [openCategorias, setOpenCategorias] = useState(true);
  const [openTutoriales, setOpenTutoriales] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { language } = useLanguageStore(); // 🔤 idioma actual

  // 🌍 Traducciones
  const t = {
    es: {
      filters: "FILTROS",
      categories: "Categorías",
      tutorials: "Tutoriales y Tips",
      apply: "Aplicar",
      cakeToppers: "Cake Toppers",
      cajas: "Cajitas Temáticas",
      cartonaje: "Cartonaje",
      tarjetas: "Tarjetas Invitación",
      varios: "Proyectos Varios",
      tutSilhouette: "Tutoriales Silhouette Studio",
      tutCricut: "Tutoriales Cricut Design",
      tipsDesign: "Tips de Diseño",
      tipsCut: "Tips de Corte",
      others: "Varios/otros",
    },
    en: {
      filters: "FILTERS",
      categories: "Categories",
      tutorials: "Tutorials & Tips",
      apply: "Apply",
      cakeToppers: "Cake Toppers",
      cajas: "Themed Boxes",
      cartonaje: "Cartonage",
      tarjetas: "Invitation Cards",
      varios: "Various Projects",
      tutSilhouette: "Silhouette Studio Tutorials",
      tutCricut: "Cricut Design Tutorials",
      tipsDesign: "Design Tips",
      tipsCut: "Cutting Tips",
      others: "Various/Others",
    },
  }[language];

  // 🔎 Detecta clics fuera del panel
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openFilter, setOpenFilter]);

  const categorias = [
    { id: "Cake Toppers", label: t.cakeToppers },
    { id: "Cajitas Temáticas", label: t.cajas },
    { id: "Cartonaje", label: t.cartonaje },
    { id: "Tarjetas Invitación", label: t.tarjetas },
    { id: "Proyectos Varios", label: t.varios },
  ];

  const tutoriales = [
    { id: "Tutoriales Silhouette Studio", label: t.tutSilhouette },
    { id: "Tutoriales Cricut Design", label: t.tutCricut },
    { id: "Tips de Diseño", label: t.tipsDesign },
    { id: "Tips de Corte", label: t.tipsCut },
    { id: "Varios/otros", label: t.others },
  ];

  // ✅ Selección de categorías
  const handleCategoriaChange = (categoriaId: string) => {
    setCategoria(
      categoria.includes(categoriaId)
        ? categoria.filter((id) => id !== categoriaId)
        : [...categoria, categoriaId]
    );
  };

  // ✅ Selección de tutoriales
  const handleTutorialChange = (tutorialId: string) => {
    setTutorial(
      tutorial.includes(tutorialId)
        ? tutorial.filter((id) => id !== tutorialId)
        : [...tutorial, tutorialId]
    );
  };

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
        className="w-full max-w-[383px] h-screen py-10 px-5 bg-white flex flex-col items-center gap-6"
      >
        {/* Botón cerrar */}
        <button
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setOpenFilter(false)}
        >
          <IoCloseOutline className="text-[#FC68B9] text-4xl" />
        </button>

        {/* Título */}
        <div className="flex items-center gap-3 text-[#FC68B9]">
          <Image
            src="/icons/grid-pink.svg"
            alt={t.filters}
            width={40}
            height={40}
          />
          <h2 className="text-lg font-semibold">{t.filters}</h2>
        </div>

        {/* Categorías */}
        <article className="w-full">
          <Button
            className="w-full bg-white text-[#FC68B9] text-lg font-semibold flex justify-between border border-[#FC68B9]"
            endContent={<IoIosArrowUp className="text-xl" />}
            radius="full"
            onPress={() => setOpenCategorias(!openCategorias)}
          >
            {t.categories} ({categoria.length})
          </Button>

          {openCategorias && (
            <div className="mt-4 space-y-2 pl-2">
              {categorias.map((cat) => (
                <label
                  key={cat.id}
                  htmlFor={`cat-${cat.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={`cat-${cat.id}`}
                    value={cat.id}
                    checked={categoria.includes(cat.id)}
                    onChange={() => handleCategoriaChange(cat.id)}
                    className="appearance-none w-5 h-5 border-2 border-pink-500 rounded-md grid place-content-center before:content-['✓'] before:text-xs before:text-white before:font-bold before:scale-0 before:transition-transform before:duration-200 checked:bg-pink-500 checked:before:scale-100"
                  />
                  <span className="text-medium font-semibold text-gray-500">
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </article>

        {/* Tutoriales */}
        <article className="w-full">
          <Button
            className="w-full bg-white text-[#FC68B9] text-lg font-semibold flex justify-between border border-[#FC68B9]"
            endContent={<IoIosArrowUp className="text-xl" />}
            radius="full"
            onPress={() => setOpenTutoriales(!openTutoriales)}
          >
            {t.tutorials} ({tutorial.length})
          </Button>

          {openTutoriales && (
            <div className="mt-4 space-y-2 pl-2">
              {tutoriales.map((item) => (
                <label
                  key={item.id}
                  htmlFor={`tut-${item.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={`tut-${item.id}`}
                    value={item.id}
                    checked={tutorial.includes(item.id)}
                    onChange={() => handleTutorialChange(item.id)}
                    className="appearance-none w-5 h-5 border-2 border-pink-500 rounded-md grid place-content-center before:content-['✓'] before:text-xs before:text-white before:font-bold before:scale-0 before:transition-transform before:duration-200 checked:bg-pink-500 checked:before:scale-100"
                  />
                  <span className="text-medium font-semibold text-gray-500">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </article>

        <div className="flex-1"></div>

        {/* Botón Aplicar */}
        <Button
          className="w-full py-6 bg-[#FC68B9] text-white text-lg font-bold"
          radius="full"
          type="button"
          onPress={gfindClases}
        >
          {t.apply}
        </Button>
      </section>
    </div>
  );
}
