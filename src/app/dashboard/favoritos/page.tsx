"use client";
import { useCallback, useEffect, useState } from "react";
import ListaClases from "./components/ListaClases";
import { Clase } from "@/interfaces/clase.interface";
import { handleAxiosError } from "@/utils/errorHandler";
import { getFavoritosView } from "@/services/favorito.service";
import TituloFiltroFavoritos from "./components/TituloFiltroFavoritos";
import FiltrarClases from "../clases/components/FiltrarClases";

export default function Favoritos() {
  const [openFilter, setOpenFilter] = useState(false);
  const [clases, setClases] = useState<Clase[]>([]);
  const [categoria, setCategoria] = useState<string[]>([]);
  const [tutorial, setTutorial] = useState<string[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("desc"); // 👈 nuevo estado

  const gfindClases = useCallback(async () => {
    try {
      const res = await getFavoritosView({
        categoria_clase: categoria.length > 0 ? categoria : undefined,
        tutoriales_tips: tutorial.length > 0 ? tutorial : undefined,
        order,
      });
      setClases(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [categoria, tutorial, order]); // 👈 dependencias

  useEffect(() => {
    gfindClases();
  }, [order]);

  return (
    <main className="w-full  max-w-7xl  mx-auto  px-10 py-8 max-sm:px-4">
      <TituloFiltroFavoritos
        setOpenFilter={setOpenFilter}
        order={order}
        setOrder={setOrder}
      />
      <ListaClases clases={clases} />
      <FiltrarClases
        setOpenFilter={setOpenFilter}
        openFilter={openFilter}
        setCategoria={setCategoria}
        setTutorial={setTutorial}
        categoria={categoria}
        tutorial={tutorial}
        gfindClases={gfindClases}
      />
    </main>
  );
}
