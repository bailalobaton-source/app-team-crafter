"use client";

import { useEffect, useState } from "react";
import NavMiCuenta from "./components/NavMiCuenta";
import TituloMiCuenta from "./components/TituloMiCuenta";
import InformacionPersonal from "./components/InformacionPersonal";
import InformacionSuscripcion from "./components/informacionSuscripcion/InformacionSuscripcion";
import { useSearchParams } from "next/navigation";
import DescargaRecursos from "./components/DescargaRecursos";

export default function MiCuenta() {
  const searchParams = useSearchParams();
  const nav = searchParams.get("nav");
  const [navSelect, setNavSelect] = useState(1);

  useEffect(() => {
    if (nav) {
      setNavSelect(Number(nav || 1));
    }
  }, [nav]);

  return (
    <main className="w-full p-8  pb-24 flex flex-col gap-8 max-sm:p-4 ">
      <TituloMiCuenta />
      <NavMiCuenta navSelect={navSelect} setNavSelect={setNavSelect} />
      {navSelect === 1 && <InformacionPersonal />}
      {navSelect === 2 && <DescargaRecursos />}

      {navSelect === 4 && <InformacionSuscripcion />}
    </main>
  );
}
