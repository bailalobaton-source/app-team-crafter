import VideoPlayer from "@/app/dashboard/components/VideoPlayer";
import { Clase } from "@/interfaces/clase.interface";
import { getViewClase } from "@/services/clases.service";
import useFavoritosStore from "@/stores/favoritos.store";
import useLikedClasesStore from "@/stores/likeClases.store";

import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { PiHeart } from "react-icons/pi";

interface Props {
  clase: Clase;
}

export default function VideoClase({ clase }: Props) {
  const { isLiked, toggleLike } = useLikedClasesStore();

  const { isFavorito, toggleFavorito } = useFavoritosStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [isLoadingFavorito, setIsLoadingFavorito] = useState(false);

  const [likesCount, setLikesCount] = useState<number>(clase.nro_likes);

  const classIcons = "w-[22px] h-[22px]";
  const classText = "text-lg text-[#FFB4DF] font-medium";

  // Función para reproducir video
  const handlePlayVideo = async () => {
    if (isAnimating || isPlaying) return;

    try {
      await getViewClase(clase.id);

      setIsAnimating(true);
      setTimeout(() => {
        setIsPlaying(true);
        setIsAnimating(false);
      }, 500);
    } catch (error) {
      console.error("Error al reproducir video:", error);
      setIsAnimating(false);
    }
  };

  // Toggle like con conteo dinámico
  const handleToggleLike = async () => {
    if (isLoadingLike) return;
    setIsLoadingLike(true);

    const alreadyLiked = isLiked(clase.id);

    try {
      await toggleLike(clase.id);

      // Actualiza conteo
      setLikesCount((prev) => (alreadyLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error al dar like:", error);
    } finally {
      setIsLoadingLike(false);
    }
  };

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
    <section className="w-full flex flex-col gap-4">
      {/* Video */}
      <article
        className="w-full  relative rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={handlePlayVideo}
      >
        <div
          className={`w-full transition-all duration-500  hover:scale-105 ease-in-out ${
            isAnimating
              ? "opacity-0 scale-110 transform"
              : isPlaying
              ? "opacity-0 scale-110 transform pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <VideoPlayer
            hlsUrl={clase.video_clase}
            ThumbnailUrl={clase.poster_url}
            mode="poster"
          />
        </div>

        <button
          className={`w-14 absolute z-10 transition-all duration-300 ease-in-out transform hover:scale-110 ${
            isAnimating
              ? "opacity-0 scale-150"
              : isPlaying
              ? "opacity-0 scale-150 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
          onClick={handlePlayVideo}
          disabled={isAnimating || isPlaying}
        >
          <Image
            src={"/icons/playVideo.svg"}
            alt="reproducir"
            width={100}
            height={100}
          />
        </button>

        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            isPlaying ? "opacity-100 " : "opacity-0  pointer-events-none"
          }`}
        >
          {isPlaying && <VideoPlayer hlsUrl={clase.video_clase} />}
        </div>

        {isAnimating && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB4DF]"></div>
          </div>
        )}
      </article>

      {/* Título */}
      <article className="w-full flex justify-between gap-8 mt-1">
        <h1 className="text-xl text-[#8A8A8A] font-bold max-md:text-lg">
          {clase.titulo_clase}
        </h1>
        <button
          className=" duration-300 rounded-lg cursor-pointer mr-2"
          onClick={handleToggleFavorite}
        >
          {isFavorito(clase.id) ? (
            <Image
              className="w-6"
              src={"/icons/favoritos.svg"}
              alt="agregar a favorito"
              width={70}
              height={70}
            />
          ) : (
            <Image
              className="w-6"
              src={"/icons/favoritos-no.svg"}
              alt="agregar a favorito"
              width={50}
              height={50}
            />
          )}
        </button>
      </article>

      {/* Info del video */}
      <article className="w-full flex gap-6  -mt-2 max-md:flex-col max-md:gap-2">
        <div className="flex items-center gap-2">
          <Image
            className={classIcons}
            src={"/icons/clock.svg"}
            alt="tiempo de video"
            width={50}
            height={50}
          />
          <p className={classText}>{clase.duracion_video}</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            className={classIcons}
            src={"/icons/calendario.svg"}
            alt="fecha de video"
            width={50}
            height={50}
          />
          <p className={classText}>{formatDate(clase.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <LuEye className="text-2xl text-[#FFB4DF]" />
          <p className={classText}>{clase.nro_reproducciones}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleLike}
            disabled={isLoadingLike}
            className={`transition-transform duration-200 ${
              isLoadingLike ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLiked(clase.id) ? (
              <FaHeart className="text-2xl text-[#FC68B9] cursor-pointer" />
            ) : (
              <PiHeart className="text-2xl text-[#FFB4DF] cursor-pointer" />
            )}
          </button>
          <p className={classText}>{likesCount}</p>
        </div>
      </article>
    </section>
  );
}
