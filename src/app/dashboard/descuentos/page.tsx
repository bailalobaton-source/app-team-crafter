"use client";

import TituloDescuentos from "./components/TituloDescuentos";
import TodosDescuentos from "./components/TodosDescuentos";

export default function Descuentos() {
  return (
    <main className="w-full max-w-7xl mx-auto p-8  pb-24 max-sm:px-4">
      <TituloDescuentos />
      <TodosDescuentos />
    </main>
  );
}
