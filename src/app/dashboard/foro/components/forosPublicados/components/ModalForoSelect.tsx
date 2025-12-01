"use client";
import { ComentarioForo, Foro } from "@/interfaces/foro.interface";
import { getComentarioForo } from "@/services/foro.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { Avatar, Button, Divider, Modal, ModalContent } from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import CardComentarioForo from "./CardComentarioForo";
import useLikedForoStore from "@/stores/likeForos.store";
import { FaHeart } from "react-icons/fa";
import { PiHeart } from "react-icons/pi";
import FormComentarForo from "./FormComentarForo";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  selectForo: Foro;
  colorForo: string;
}

export default function ModalForoSelect({
  isOpen,
  onOpenChange,
  selectForo,
  colorForo,
}: Props) {
  const { isLiked, toggleLike } = useLikedForoStore();
  const { language } = useLanguageStore();

  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(selectForo.likes_foro);
  const [comentariosForo, setComentariosForo] = useState<ComentarioForo[]>([]);
  const tieneComentarios: boolean = selectForo.comentarios_foro?.length > 0;

  // 🌐 Traducciones
  const t = {
    es: {
      comments: "Comentarios",
      mostRecent: "Más reciente",
      errorLike: "Error al dar like:",
    },
    en: {
      comments: "Comments",
      mostRecent: "Most recent",
      errorLike: "Error liking post:",
    },
  }[language];

  const findComentariosForos = useCallback(async () => {
    try {
      const res = await getComentarioForo(selectForo.id);
      setComentariosForo(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [selectForo.id]);

  useEffect(() => {
    findComentariosForos();
  }, [findComentariosForos]);

  const handleToggleLike = async () => {
    if (isLoadingLike) return;
    setIsLoadingLike(true);

    const alreadyLiked = isLiked(selectForo.id);

    try {
      await toggleLike(selectForo.id);
      setLikesCount((prev) => (alreadyLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error(t.errorLike, error);
    } finally {
      setIsLoadingLike(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      backdrop="blur"
      placement="center"
    >
      <ModalContent className="w-full max-h-[80vh] overflow-auto p-0">
        {() => (
          <article
            key={selectForo.id}
            className={`w-full p-5 ${colorForo} flex flex-col gap-2 rounded-2xl`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  className="w-8 h-8 flex-shrink-0"
                  src={
                    selectForo.usuario?.foto_perfil
                      ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${selectForo.usuario?.foto_perfil}`
                      : "/icons/user.svg"
                  }
                  alt={`Avatar de ${selectForo.usuario.nombre}`}
                />
                <div className="flex flex-col">
                  <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
                    {selectForo.usuario.nombre}
                  </h3>
                  <time className="text-[#8A8A8A] text-xs font-light flex-shrink-0">
                    {selectForo.createdAt}
                  </time>
                </div>
              </div>
            </div>

            {selectForo.img_foro && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${selectForo.img_foro}`}
                alt={`Imagen del foro ${selectForo.titulo_foro}`}
                width={600}
                height={300}
                className="m-auto w-full max-w-[300px] h-auto rounded-lg object-cover"
              />
            )}

            <h3 className="text-xl text-[#8A8A8A] font-bold">
              {selectForo.titulo_foro}
            </h3>
            <p className="text-medium text-[#8A8A8A] font-medium">
              {selectForo.contenido_foro}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleLike}
                  disabled={isLoadingLike}
                  className={`transition-transform duration-200 ${
                    isLoadingLike ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLiked(selectForo.id) ? (
                    <FaHeart className="text-xl text-[#FC68B9] cursor-pointer" />
                  ) : (
                    <PiHeart className="text-xl text-[#FC68B9] cursor-pointer" />
                  )}
                </button>
                <span className="text-sm font-medium text-[#FC68B9]">
                  {likesCount}
                </span>
              </div>

              <Button
                variant="light"
                size="sm"
                className="p-0 h-auto min-w-0 w-fit gap-1.5 text-[#FC68B9] hover:bg-[#FC68B9]/10"
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
                <span className="text-sm font-medium">
                  {selectForo.comentarios_foro?.length}
                </span>
              </Button>
            </div>

            <div className="w-full flex items-center gap-2 mt-2 ">
              <Avatar
                className="w-8 h-8 flex-shrink-0"
                src={
                  selectForo.usuario?.foto_perfil
                    ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${selectForo.usuario?.foto_perfil}`
                    : "/icons/user.svg"
                }
                alt={`Avatar de ${selectForo.usuario.nombre}`}
              />
              <FormComentarForo
                foroId={selectForo.id}
                reloadForo={findComentariosForos}
              />
            </div>

            <div className="w-full flex justify-between items-center mt-2">
              <span className="text-[#FC68B9] font-semibold">
                {selectForo.comentarios_foro?.length} {t.comments}
              </span>
              <button
                className="text-[#FC68B9] font-semibold flex items-center gap-2"
                type="button"
              >
                <Image
                  className="text-xs"
                  src="/icons/arrows.svg"
                  alt={t.mostRecent}
                  width={20}
                  height={20}
                />
                {t.mostRecent}
              </button>
            </div>

            <Divider />

            {tieneComentarios && comentariosForo && (
              <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                {comentariosForo.map((comentario: ComentarioForo) => (
                  <CardComentarioForo
                    key={comentario.id}
                    comentario={comentario}
                  />
                ))}
              </div>
            )}
          </article>
        )}
      </ModalContent>
    </Modal>
  );
}
