import { Suspense } from "react";
import PsAi from "../../components/PsAi";
import FormIniciarSesion from "./components/FormIniciarSesion";

export default function IniciarSesion() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login  max-md:h-auto">
      <div className="w-full min-h-screen h-full  max-w-[1440px] mx-auto flex    p-12 max-md:flex-col-reverse  max-md:p-4 max-md:py-10 max-md:gap-10 max-md:h-auto">
        <PsAi />
        <Suspense fallback={<div>Cargando...</div>}>
          <FormIniciarSesion />
        </Suspense>
      </div>
    </main>
  );
}
