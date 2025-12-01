import BannerInicio from "./components/BannerInicio";
import ClasesRecientesInicio from "./components/ClasesRecientesInicio";
import DescuentoParati from "./components/DescuentosParaTi";
import RecursosMesInicio from "./components/RecursosMesInicio";

export default function Inicio() {
  return (
    <main className="w-full  max-w-7xl  mx-auto  p-10 max-md:px-4">
      <BannerInicio />
      <ClasesRecientesInicio />
      <RecursosMesInicio />
      <DescuentoParati />
    </main>
  );
}
