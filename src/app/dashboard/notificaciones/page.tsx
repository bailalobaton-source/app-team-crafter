"use client";
import LoadingTransparente from "@/app/components/LoadingTransparente";
import { NotificacionesType } from "@/interfaces/notificaciones.interface";
import { getNotificacion } from "@/services/notificacion.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState<NotificacionesType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const gfindNotificaciones = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getNotificacion();
      setNotificaciones(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindNotificaciones();
  }, [gfindNotificaciones]);

  return (
    <main className="w-full max-w-4xl mx-auto p-10 py-16 gap-4 max-sm:px-4">
      {loading && <LoadingTransparente />}
      <h1
        className="relative  m-auto w-fit text-6xl font-black text-[#96EAEA] flex items-center  justify-center uppercase
      max-sm:text-3xl
      "
      >
        Notificaciones
      </h1>

      <div className="space-y-4 mt-14 max-sm:mt-10">
        {notificaciones?.map((notificacion) => (
          <article
            key={notificacion.id}
            className="w-full bg-[#F4F4F4] border-l-5 border-[#C6C6C6] py-4 px-6 rounded-2xl flex gap-4 max-sm:px-4"
          >
            <div className="w-fit h-fit p-3 bg-white rounded-lg">
              <Image
                src={"/icons/megafono.svg"}
                alt="notificacion"
                width={20}
                height={20}
              />
            </div>
            <div className="w-full text-[#8A8A8A]">
              <article className="w-full flex justify-between">
                <h3 className="text-lg  font-bold  max-sm:text-medium">
                  {notificacion.titulo}
                </h3>
                <span className="text-xs">
                  {formatDate(notificacion.createdAt)}
                </span>
              </article>
              <p className="max-sm:text-sm">{notificacion.contenido}</p>
              <Link
                className="text-[#FC68B9]"
                href={notificacion.url_notificacion || ""}
              >
                Ver ahora
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
