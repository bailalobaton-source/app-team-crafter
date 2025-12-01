"use client";
import { useCallback, useEffect, useState } from "react";
import FiltrarClases from "./components/FiltrarClases";
import ListaClases from "./components/ListaClases";
import TituloFiltroClases from "./components/TituloFiltroClases";
import { Clase } from "@/interfaces/clase.interface";
import { getClases } from "@/services/clases.service";
import { handleAxiosError } from "@/utils/errorHandler";

export default function Clases() {
  const [openFilter, setOpenFilter] = useState(false);
  const [clases, setClases] = useState<Clase[]>([]);
  const [categoria, setCategoria] = useState<string[]>([]);
  const [tutorial, setTutorial] = useState<string[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("desc"); // 👈 nuevo estado

  const gfindClases = useCallback(async () => {
    try {
      const res = await getClases({
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
    <main className="w-full    mx-auto  px-10 py-8 max-md:px-4">
      <TituloFiltroClases
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
