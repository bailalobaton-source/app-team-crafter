"use client";

import PsAi from "@/app/components/PsAi";
import DatosCompra from "./components/DatosCompra";

export default function Page() {
  return (
    <main className="w-screen min-h-screen h-max   background-login  max-md:h-auto">
      <div className="w-full min-h-screen h-full  max-w-[1440px] mx-auto flex    p-12 max-md:flex-col-reverse  max-md:p-4 max-md:py-10 max-md:gap-10 max-md:h-auto">
        <PsAi />
        <DatosCompra />
      </div>
    </main>
  );
}
