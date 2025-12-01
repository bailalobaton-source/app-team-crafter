"use client";
import PsAi from "../../components/PsAi";
import MetodosRegistro from "./components/MetodosRegistro";

export default function CreaTuCuenta() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login  max-md:h-auto ">
      <div className="w-full min-h-screen h-full  max-w-[1440px] mx-auto flex    p-12 max-md:flex-col-reverse  max-md:p-4 max-md:py-10 max-md:gap-10 max-md:h-auto">
        <PsAi />
        <MetodosRegistro />
      </div>
    </main>
  );
}
