"use client";

import { useCallback, useEffect, useState } from "react";
import FiltrarForo from "./components/FiltrarForo";
import ForosPublicados from "./components/forosPublicados/ForosPublicados";
import NuevaPublicacion from "./components/NuevaPublicacion";
import ReglasForo from "./components/ReglasForo";
import TituloForo from "./components/TituloForo";
import { handleAxiosError } from "@/utils/errorHandler";
import { getForos } from "@/services/foro.service";

export default function Foro() {
  const [foros, setForos] = useState();
  const [order, setOrder] = useState<"asc" | "desc">("desc"); // 👈 nuevo estado

  const gfindForos = useCallback(async () => {
    try {
      const res = await getForos(order);

      setForos(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [order]);

  useEffect(() => {
    gfindForos();
  }, [order]);

  return (
    <main className="w-full  max-w-7xl  mx-auto  px-10 py-6 pb-20 max-sm:px-4">
      <TituloForo />
      <div className="w-full flex gap-8 mt-16 max-sm:flex-col">
        <div className="w-full flex flex-col gap-6">
          <FiltrarForo order={order} setOrder={setOrder} />
          <NuevaPublicacion gfindForos={gfindForos} />
          {foros && <ForosPublicados foros={foros} />}
        </div>
        <div className="min-w-[312px] max-w-[312px] flex flex-col gap-6 max-sm:w-full max-sm:max-w-full">
          <ReglasForo />{" "}
        </div>
      </div>
    </main>
  );
}
