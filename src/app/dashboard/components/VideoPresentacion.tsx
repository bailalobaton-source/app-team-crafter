"use client";
import { Modal, ModalContent } from "@heroui/react";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useVideoStore } from "@/stores/videoPresentacion.store";
import { IoClose } from "react-icons/io5";

interface Props {
  onOpenChange: (i: boolean) => void;
  isOpen: boolean;
}

export default function VideoPresentacion({ onOpenChange, isOpen }: Props) {
  const setWatched = useVideoStore((s) => s.setWatched);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePlayVideo = async () => {
    if (isAnimating || isPlaying) return;

    try {
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

  // 👉 Cuando se cierre el modal (ya sea con X o clic afuera)
  const handleClose = (open: boolean) => {
    if (!open) {
      setWatched(); // marcar como visto al cerrar
    }
    onOpenChange(open);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      size="2xl"
      placement="center"
      backdrop="opaque"
    >
      <ModalContent className="relative w-full  bg-transparent p-6 shadow-none">
        {/* Botón X para cerrar */}
        <button
          onClick={() => handleClose(false)}
          className="absolute top-2 right-2 z-20 bg-[#FC68B9] rounded-full p-0 hover:scale-110 transition-transform cursor-pointer duration-300"
        >
          <IoClose className="text-3xl text-white" />
        </button>

        <article
          className="w-full max-w-[800px] relative rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={handlePlayVideo}
        >
          {/* Poster con play */}
          {/* <button
            className={`w-14 absolute z-10 transition-all duration-300 ease-in-out transform hover:scale-110 cursor-pointer ${
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
          </button> */}

          {/* Video en reproducción */}
          <div
            className={`w-full inset-0 transition-all duration-500 ease-in-out `}
          >
            <VideoPlayer
              hlsUrl="https://vz-96e543ae-f21.b-cdn.net/c5c3ddf8-0f9e-40f1-9f1c-a6bb507eb3f7/playlist.m3u8"
              autoPlay={true}
            />
          </div>

          {/* Loader */}
          {isAnimating && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB4DF]"></div>
            </div>
          )}
        </article>
      </ModalContent>
    </Modal>
  );
}
