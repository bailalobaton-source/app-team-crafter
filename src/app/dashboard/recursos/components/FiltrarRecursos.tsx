"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useLanguageStore } from "@/stores/useLanguage.store";
import {
  CategoriaClase,
  TipClase,
} from "@/interfaces/categoriasTipsClase.interface";
import {
  getCategoriaRecurso,
  getTipsRecurso,
} from "@/services/categoriaTipClase.service";
import { handleAxiosError } from "@/utils/errorHandler";

interface Props {
  setOpenFilter: (open: boolean) => void;
  openFilter?: boolean;
  setCategoria: (categoria: number[]) => void;
  setTutorial: (tutorial: number[]) => void;
  categoria: number[];
  tutorial: number[];
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
  const { language } = useLanguageStore();

  const [openCategorias, setOpenCategorias] = useState(true);
  const [openTutoriales, setOpenTutoriales] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [categorias, setCategorias] = useState<CategoriaClase[]>([]);
  const [tips, setTips] = useState<TipClase[]>([]);

  const gfindCategorias = useCallback(async () => {
    try {
      const res = await getCategoriaRecurso();
      setCategorias(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  const gfindTips = useCallback(async () => {
    try {
      const res = await getTipsRecurso();

      setTips(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    gfindCategorias();
    gfindTips();
  }, [gfindCategorias, gfindTips]);

  // 🌐 Store de idioma

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

  const handleCategoriaChange = (categoriaId: number) => {
    setCategoria(
      categoria.includes(categoriaId)
        ? categoria.filter((id) => id !== categoriaId)
        : [...categoria, categoriaId],
    );
  };

  const handleTutorialChange = (tutorialId: number) => {
    setTutorial(
      tutorial.includes(tutorialId)
        ? tutorial.filter((id) => id !== tutorialId)
        : [...tutorial, tutorialId],
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
              {tips?.map((tip) => (
                <label
                  key={tip.id}
                  htmlFor={`tip-${tip.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={`tip-${tip.id}`}
                    value={tip.id}
                    checked={tutorial.includes(tip.id)}
                    onChange={() => handleTutorialChange(tip.id)}
                    className="appearance-none w-5 h-5 border-2 border-pink-500 rounded-md grid place-content-center before:content-['✓'] before:text-xs before:text-white before:font-bold before:scale-0 before:transition-transform before:duration-200 checked:bg-pink-500 checked:before:scale-100"
                  />
                  <span className="text-medium font-semibold text-gray-500">
                    {language === "es" ? tip.nombre_es : tip.nombre_en}
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
              {categorias?.map((cat) => (
                <label
                  key={cat.id}
                  htmlFor={`cat-${cat.id}`}
                  className="flex items-center gap-2 cursor-pointer select-none"
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
                    {language === "es" ? cat.nombre_es : cat.nombre_en}{" "}
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
