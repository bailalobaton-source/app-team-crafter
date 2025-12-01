import { Descarga } from "@/interfaces/recurso.interface";
import { getDescargas } from "@/services/decargas.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { formatDateHoure } from "@/utils/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { useCallback, useEffect, useState } from "react";

const DescargaRecursos = () => {
  const [descargas, setDescargas] = useState<Descarga[]>([]);

  const getfindDescargas = useCallback(async () => {
    try {
      const res = await getDescargas();
      setDescargas(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    getfindDescargas();
  }, [getDescargas]);

  return (
    <section className="w-full max-w-7xl mx-auto p-8 pb-24 flex flex-col gap-6 max-sm:px-0">
      <article className="w-full flex items-center justify-between gap-3">
        <h2 className="text-[#8A8A8A] font-bold text-2xl max-sm:text-xl">
          Descargas de recursos
        </h2>
      </article>

      <Table aria-label="Subscription table" classNames={{ wrapper: "p-1" }}>
        <TableHeader>
          <TableColumn>Nro</TableColumn>
          <TableColumn>Recurso</TableColumn>
          <TableColumn>Fecha de descarga</TableColumn>
        </TableHeader>

        <TableBody>
          {descargas.map((descarga, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{descarga.recurso.nombre_recurso}</TableCell>
              <TableCell>{formatDateHoure(descarga.fecha_descarga)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default DescargaRecursos;
