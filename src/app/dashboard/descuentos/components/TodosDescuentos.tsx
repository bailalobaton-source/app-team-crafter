import { Button } from "@heroui/react";
import CardDescuento from "../../components/CardDescuento";
import Image from "next/image";

const descuentos = [
  {
    id: 1,
    valor_descuento: 20,
    tipo_descuento: "porcentaje",
    titulo_descuento: "20% en Primer Taller",
    descripcion_descuento:
      "Aprovecha un 20% de descuento en tu primer taller de scrapbooking. Ideal para quienes desean empezar a crear con nosotros.",
    fecha_expiracion: "15/11/2024",
    codigo_descuento: "PRIMERO20",
  },
  {
    id: 2,
    valor_descuento: 15,
    tipo_descuento: "porcentaje",
    titulo_descuento: "Descuento en Kits de Materiales",
    descripcion_descuento:
      "Compra un kit de materiales y obtén un 15% de descuento en tu próxima compra. Perfecto para quienes buscan armar su colección de herramientas.",
    fecha_expiracion: "15/11/2024",
    codigo_descuento: "KIT15",
  },
  {
    id: 3,
    valor_descuento: 5,
    tipo_descuento: "efectivo",
    titulo_descuento: "5 USD de Descuento en Archivos Digitales",
    descripcion_descuento:
      "Obtén 5 USD de descuento en archivos digitales seleccionados. Diseños únicos listos para descargar y personalizar.",
    fecha_expiracion: "15/11/2024",
    codigo_descuento: "CLASE10",
  },
];
export default function TodosDescuentos() {
  return (
    <section className="w-full flex flex-col gap-7 mt-16 ">
      <Button
        className="w-fit bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold mt-4 hover:bg-[#fc68b939] m-0"
        radius="full"
        startContent={
          <Image
            className="text-xs"
            src={"/icons/arrows.svg"}
            alt={`Más reciente `}
            width={20}
            height={20}
          />
        }
      >
        Más reciente
      </Button>
      {descuentos.map((descuento) => (
        <CardDescuento key={descuento.id} descuento={descuento} />
      ))}
    </section>
  );
}
