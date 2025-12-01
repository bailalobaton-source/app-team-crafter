import { BreadcrumbItem, Breadcrumbs, Button } from "@heroui/react";
import Image from "next/image";

interface Props {
  setOpenFilter: (open: boolean) => void;
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
}

export default function TituloFiltroFavoritos({
  setOpenFilter,
  order,
  setOrder,
}: Props) {
  const toggleOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  return (
    <section>
      <Breadcrumbs
        itemClasses={{
          item: [" data-[current=true]:text-[#FC68B9] transition-colors"],
        }}
        size="lg"
      >
        <BreadcrumbItem key="inicio">Inicio</BreadcrumbItem>
        <BreadcrumbItem>Favoritos</BreadcrumbItem>
      </Breadcrumbs>

      <h1 className="mt-6 text-4xl font-black text-[#96EAEA] max-sm:text-2xl">
        Favoritos
      </h1>

      <article className="w-full flex justify-between items-end max-md:flex-col">
        <p className="text-[#8A8A8A] max-sm:w-full">
          Aquí encontraras todas tus clases guardadas{" "}
        </p>
        <div className="flex gap-2 max-md:mt-4">
          <Button
            className="bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold mt-4 hover:bg-[#fc68b939] m-0"
            radius="full"
            onPress={toggleOrder}
            startContent={
              <Image
                className="text-xs"
                src={"/icons/arrows.svg"}
                alt="Ordenar"
                width={20}
                height={20}
              />
            }
          >
            {order === "desc" ? "Más reciente" : "Más antiguo"}
          </Button>

          <Button
            className="bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold mt-4 hover:bg-[#fc68b939] m-0"
            radius="full"
            startContent={
              <Image
                className="text-xs"
                src={"/icons/grid.svg"}
                alt="Filtros"
                width={22}
                height={22}
              />
            }
            onPress={() => setOpenFilter(true)}
          >
            Filtros
          </Button>
        </div>
      </article>
    </section>
  );
}
