import { Foro } from "@/interfaces/foro.interface";
import useLikedForoStore from "@/stores/likeForos.store";
import { Avatar, Button, Divider } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { PiHeart } from "react-icons/pi";

interface Props {
  foro: Foro;
  index: number;
  setSelectForo: (i: Foro) => void;
  onOpen: () => void;
  setColorForo: (e: string) => void;
}

export default function CardForo({
  foro,
  index,
  setSelectForo,
  onOpen,
  setColorForo,
}: Props) {
  const { isLiked, toggleLike } = useLikedForoStore();

  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(foro.likes_foro);

  const handleToggleLike = async () => {
    if (isLoadingLike) return;
    setIsLoadingLike(true);

    const alreadyLiked = isLiked(foro.id);

    try {
      await toggleLike(foro.id);

      // Actualiza conteo
      setLikesCount((prev) => (alreadyLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error al dar like:", error);
    } finally {
      setIsLoadingLike(false);
    }
  };
  const colores = ["bg-[#FFEE97]", "bg-[#C3F3F3]", "bg-[#FFE1F2]"];

  const bgColor = colores[index % colores.length];

  return (
    <article
      key={foro.id}
      className={`w-full p-5 ${bgColor} flex flex-col gap-2 rounded-2xl`}
    >
      <div
        className="w-full flex flex-col gap-2 cursor-pointer "
        onClick={() => {
          setSelectForo(foro);
          onOpen();
          setColorForo(bgColor);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              className="w-8 h-8 flex-shrink-0"
              src={
                foro.usuario?.foto_perfil
                  ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${foro.usuario?.foto_perfil}`
                  : "/icons/user.svg"
              }
              alt={`Avatar de ${foro.usuario.nombre}`}
            />
            <div className="flex flex-col">
              <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
                {foro.usuario.nombre}
              </h3>
              <time className="text-[#8A8A8A] text-xs font-light flex-shrink-0">
                {foro.createdAt}
              </time>
            </div>
          </div>
        </div>

        {foro.img_foro && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${foro.img_foro}`}
            alt={`Imagen del foro ${foro.titulo_foro}`}
            width={600}
            height={300}
            className="w-full h-[280px] rounded-lg object-cover"
          />
        )}

        <h3 className="text-xl text-[#8A8A8A] font-bold">{foro.titulo_foro}</h3>
        <p className="text-medium text-[#8A8A8A] font-medium">
          {foro.contenido_foro}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleLike}
            disabled={isLoadingLike}
            className={`transition-transform duration-200 ${
              isLoadingLike ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLiked(foro.id) ? (
              <FaHeart className="text-2xl text-[#FC68B9] cursor-pointer" />
            ) : (
              <PiHeart className="text-2xl text-[#FC68B9] cursor-pointer" />
            )}
          </button>
          <span className="text-sm font-medium text-[#FC68B9]">
            {likesCount}
          </span>
        </div>
        <Button
          variant="light"
          size="sm"
          className="p-0 h-auto min-w-0 gap-1.5 text-[#FC68B9] hover:bg-[#FC68B9]/10"
          startContent={
            <Image
              src="/icons/message.svg"
              alt=""
              width={20}
              height={20}
              className="opacity-80"
            />
          }
          onPress={() => {
            setSelectForo(foro);
            onOpen();
            setColorForo(bgColor);
          }}
        >
          <span className="text-sm font-medium">
            {foro.comentarios_foro?.length}
          </span>
        </Button>
      </div>
      <Divider />
      <button
        className="w-min text-medium text-[#FC68B9] font-semibold underline cursor-pointer"
        onClick={() => {
          setSelectForo(foro);
          onOpen();
          setColorForo(bgColor);
        }}
      >
        Comentar
      </button>
    </article>
  );
}
