"use client";

import { useEffect, useRef } from "react";
import PsAi from "@/app/components/PsAi";
import TuPedido from "./components/TuPedido";
import Link from "next/link";
import useSuscripcionStore from "@/stores/SuscripcionContext";
import { Button } from "@heroui/react";

export default function PlanId() {
  const { suscripcion } = useSuscripcionStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [suscripcion]);

  return (
    <main className="relative w-full min-h-screen h-auto p-10 py-10 flex gap-8 background-login max-sm:px-4">
      <Link
        href="/planes"
        className="absolute left-2 top-4 lg:left-10 lg:top-10 z-10"
      >
        <Button className="bg-[#FC68B9] text-white font-bold rounded-full">
          Regresar
        </Button>
      </Link>

      <div
        ref={scrollRef}
        className="w-full min-h-full h-auto max-w-[1440px] mx-auto flex overflow-x-hidden overflow-y-auto max-sm:p-0  "
      >
        <PsAi />

        {suscripcion ? (
          <section className="m-auto w-1/2 min-w-[300px] h-full bg-white rounded-2xl p-10 flex flex-col justify-center items-start gap-14 max-sm:w-full">
            <h1 className="text-xl font-bold text-[#68E1E0] text-center">
              Ya cuenta con una suscripcion activa
            </h1>
            <Link
              href={"/"}
              className="color-pink m-auto text-base font-semibold"
            >
              Ir a inicio
            </Link>
          </section>
        ) : (
          <TuPedido />
        )}
      </div>
    </main>
  );
}
