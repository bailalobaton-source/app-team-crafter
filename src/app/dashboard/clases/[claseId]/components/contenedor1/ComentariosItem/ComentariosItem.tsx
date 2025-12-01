"use client";
import {
  Comentario,
  RespuestaComentario,
} from "@/interfaces/comentario.interface";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { PiHeart } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import ComentarClase from "../ComentarClase";
import { getRespuestaComentario } from "@/services/comentarios.service";
import { handleAxiosError } from "@/utils/errorHandler";
import RespuestaComentarios from "./components/RespuestaComentarios";
import useLikeComentarioClaseStore from "@/stores/likeComentarioClase.store";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  comentario: Comentario;
}

export default function ComentarioItem({ comentario }: Props) {
  const { isLiked, toggleLike } = useLikeComentarioClaseStore();
  const { language } = useLanguageStore();

  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(comentario.nro_likes);

  const [openResponder, setOpenResponder] = useState<boolean>(false);
  const [respuestacomentarios, setRespuestaComentarios] = useState<
    RespuestaComentario[]
  >([]);

  const classText = "text-lg text-[#FFB4DF] font-medium";

  // 🌐 Traducciones
  const t = {
    es: {
      reply: "Responder",
      errorLike: "Error al dar like:",
    },
    en: {
      reply: "Reply",
      errorLike: "Error liking comment:",
    },
  }[language];

  const findRespuestaComentarios = useCallback(async () => {
    try {
      const res = await getRespuestaComentario(comentario.id);
      setRespuestaComentarios(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [comentario.id]);

  useEffect(() => {
    findRespuestaComentarios();
  }, [findRespuestaComentarios, comentario.id]);

  const handleToggleLike = async () => {
    if (isLoadingLike) return;
    setIsLoadingLike(true);

    const alreadyLiked = isLiked(comentario.id);

    try {
      await toggleLike(comentario.id);
      setLikesCount((prev) => (alreadyLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error(t.errorLike, error);
    } finally {
      setIsLoadingLike(false);
    }
  };

  return (
    <article className="w-full">
      <div className="flex gap-4">
        <Avatar
          className="w-10 h-10 flex-shrink-0"
          src={
            comentario.usuario?.foto_perfil
              ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${comentario.usuario?.foto_perfil}`
              : "/icons/user.svg"
          }
          alt={`Avatar de ${comentario.usuario.nombre}`}
        />

        <div className="flex-1 min-w-0">
          {/* Información del usuario */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
              {comentario.usuario.nombre}
            </h3>
            <time className="text-[#8A8A8A] text-sm font-light flex-shrink-0">
              {comentario.createdAt}
            </time>
          </div>

          {/* Contenido del comentario */}
          <p className="text-[#8A8A8A] leading-relaxed mb-3">
            {comentario.comentario}
          </p>

          <div className="flex gap-2 mt-2 items-center">
            <button
              onClick={handleToggleLike}
              disabled={isLoadingLike}
              className={`transition-transform duration-200 ${
                isLoadingLike ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLiked(comentario.id) ? (
                <FaHeart className="text-xl text-[#FC68B9] cursor-pointer" />
              ) : (
                <PiHeart className="text-xl text-[#FFB4DF] cursor-pointer" />
              )}
            </button>

            <p className={classText}>{likesCount}</p>

            <Button
              variant="light"
              size="sm"
              className="p-0 ml-4 h-auto min-w-0 gap-2 text-[#FC68B9] hover:bg-[#FC68B9]/10"
              onPress={() => setOpenResponder(!openResponder)}
              startContent={
                <Image
                  src="/icons/message.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="opacity-80"
                />
              }
            >
              <span className="text-sm font-medium">{t.reply}</span>
            </Button>
          </div>

          {openResponder && (
            <ComentarClase
              claseId={comentario.clase_id}
              findComentarios={findRespuestaComentarios}
              respuestaComentario={true}
              comentarioId={comentario.id}
              user_comentario_id={comentario.user_id}
            />
          )}
        </div>
      </div>

      <div className="ml-10 mt-4">
        {respuestacomentarios.map((respuesta) => (
          <RespuestaComentarios key={respuesta.id} respuesta={respuesta} />
        ))}
      </div>
    </article>
  );
}
