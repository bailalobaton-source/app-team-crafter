"use client";

import { Suspense } from "react";
import PsAi from "../../components/PsAi";
import FormIniciarSesion from "./components/FormIniciarSesion";
import { LuDoorOpen } from "react-icons/lu";

export default function IniciarSesion() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login  max-md:h-auto">
      <div className="relative w-full min-h-screen h-full  max-w-[1440px] mx-auto flex    p-12 max-md:flex-col-reverse  max-md:p-4 max-md:py-10 max-md:gap-10 max-md:h-auto">
        <PsAi />
        <a
          href="https://team-crafter.com/"
          className="absolute top-4 left-4 flex gap-2 items-center bg-white p-1 px-4 rounded-full border-1 text-md font-bold
          max-sm:relative max-sm:mx-auto max-sm:-mt-4 w-fit"
        >
          <LuDoorOpen className="text-xl" />
          Ir a la página de inicio
        </a>
        <Suspense fallback={<div>Cargando...</div>}>
          <FormIniciarSesion />
        </Suspense>
      </div>
    </main>
  );
}
