import { Button } from "@heroui/react";
import CardDescuento from "../../components/CardDescuento";
import Image from "next/image";
import { Descuento } from "@/interfaces/descuentos.interface";
import { useCallback, useEffect, useState } from "react";
import { getDescuentos } from "@/services/descuentos.service";
import { handleAxiosError } from "@/utils/errorHandler";

export default function TodosDescuentos() {
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);

  const gfindClases = useCallback(async () => {
    try {
      const res = await getDescuentos();
      setDescuentos(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []); // 👈 dependencias

  useEffect(() => {
    gfindClases();
  }, []);

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
