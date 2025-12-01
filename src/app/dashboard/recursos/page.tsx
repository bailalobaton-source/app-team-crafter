"use client";
import { useCallback, useEffect, useState } from "react";
import ListaRecursos from "./components/ListaRecursos";
import FiltrarRecursos from "./components/FiltrarRecursos";
import TituloFiltroRecursos from "./components/TituloFiltroRecursos";
import { Recurso } from "@/interfaces/recurso.interface";
import { handleAxiosError } from "@/utils/errorHandler";
import { getRecursos } from "@/services/recursos.service";

export default function Recursos() {
  const [openFilter, setOpenFilter] = useState(false);
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [categoria, setCategoria] = useState("Todos");
  const [tutorial, setTutorial] = useState("Todos");
  const [order, setOrder] = useState<"asc" | "desc">("desc"); // 👈 nuevo estado

  const gfindRecursos = useCallback(async () => {
    try {
      const res = await getRecursos({
        categoria_recurso: categoria,
        tipo_recurso: tutorial,
        order,
      });
      setRecursos(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [categoria, tutorial, order]); // 👈 dependencias

  useEffect(() => {
    gfindRecursos();
  }, [order]);

  return (
    <main className="w-full p-10 py-8 max-md:px-4">
      <TituloFiltroRecursos
        setOpenFilter={setOpenFilter}
        order={order}
        setOrder={setOrder}
      />
      <ListaRecursos recursos={recursos} />
      <FiltrarRecursos
        setOpenFilter={setOpenFilter}
        openFilter={openFilter}
        setCategoria={setCategoria}
        setTutorial={setTutorial}
        categoria={categoria}
        tutorial={tutorial}
        gfindRecursos={gfindRecursos}
      />
    </main>
  );
}
