import { Clase } from "@/interfaces/clase.interface";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import useFavoritosStore from "@/stores/favoritos.store";

interface Props {
  clase: Clase;
  width?: string;
  icon_favoritos?: false;
  hegiht_portada?: string;
}

export default function CardClases({ clase, width }: Props) {
  const { isFavorito, toggleFavorito } = useFavoritosStore();
  const [isLoadingFavorito, setIsLoadingFavorito] = useState(false);

  const handleToggleFavorite = async () => {
    if (isLoadingFavorito) return;
    setIsLoadingFavorito(true);

    try {
      await toggleFavorito(clase.id);
    } catch (error) {
      console.error("Error al dar like:", error);
    } finally {
      setIsLoadingFavorito(false);
    }
  };
  return (
    <article
      className={`${width}   aspect-[1.5/1] flex flex-col gap-1  max-md:w-full`}
    >
      <Link href={`/dashboard/clases/${clase?.id}`}>
        <div className="w-full relative rounded-2xl overflow-hidden">
          <div className="w-full hover:scale-105 duration-300">
            <VideoPlayer
              hlsUrl={clase.video_clase}
              ThumbnailUrl={clase.poster_url}
              mode="poster"
            />
          </div>
          <Image
            className="absolute right-4 bottom-4  w-14"
            src={"/icons/playVideo.svg"}
            alt={`reproducir ${clase.descripcion_clase}`}
            width={100}
            height={100}
          />
        </div>
      </Link>
      <div className="flex justify-between mt-1">
        <section className=" flex gap-4">
          <div className="flex items-center gap-1.5">
            <Image
              className="w-6"
              src={"/icons/clock.svg"}
              alt={`reproducir ${clase.descripcion_clase}`}
              width={100}
              height={100}
            />
            <p className="text-medium text-[#FFB4DF] font-semibold">
              {clase.duracion_video}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Image
              className="w-5"
              src={"/icons/calendario.svg"}
              alt={`reproducir ${clase.descripcion_clase}`}
              width={100}
              height={100}
            />
            <p className="text-medium text-[#FFB4DF] font-semibold">
              {formatDate(clase.createdAt)}
            </p>
          </div>
        </section>
        <button
          className=" duration-300 rounded-lg cursor-pointer mr-2"
          onClick={handleToggleFavorite}
        >
          {isFavorito(clase.id) ? (
            <Image
              className="w-5"
              src={"/icons/favoritos.svg"}
              alt="agregar a favorito"
              width={70}
              height={70}
            />
          ) : (
            <Image
              className="w-5"
              src={"/icons/favoritos-no.svg"}
              alt="agregar a favorito"
              width={50}
              height={50}
            />
          )}
        </button>
      </div>

      <h3 className=" text-medium   font-semibold text-[#8A8A8A] uppercase">
        {clase.titulo_clase}
      </h3>
    </article>
  );
}
