"use client";

import { useEffect } from "react";
import { useDisclosure } from "@heroui/react";
import { useVideoStore } from "@/stores/videoPresentacion.store";
import VideoPresentacion from "./components/VideoPresentacion";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import SuscripcionVencida from "./components/SuacripcionVencida";
import useSuscripcionStore, {
  useAutoRefetch,
} from "@/stores/SuscripcionContext";
import useLikedClasesStore from "@/stores/likeClases.store";
import useLikeComentarioClaseStore from "@/stores/likeComentarioClase.store";
import useFavoritosStore from "@/stores/favoritos.store";
import Loading from "../components/Loading";
import useLikedForoStore from "@/stores/likeForos.store";
import useLikeComentarioForoStore from "@/stores/likeComentarioForo.store";
import { getPerfil } from "@/services/auth/auth.service";
import { usePerfilStore } from "@/stores/perfil.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { suscripcion, isLoading, isInitialLoading } = useSuscripcionStore();
  const { onOpen, onOpenChange } = useDisclosure();

  // ✅ Store del video
  const hasWatchedVideo = useVideoStore((s) => s.hasWatchedVideo);

  useAutoRefetch();
  const fetchFavoritos = useFavoritosStore((s) => s.fetchFavoritos);
  const fetchLikes = useLikedClasesStore((s) => s.fetchLikes);
  const fetchLikesComentarioClases = useLikeComentarioClaseStore(
    (s) => s.fetchLikes
  );
  const fetchLikesForos = useLikedForoStore((s) => s.fetchLikes);
  const fetchLikesComentarioForos = useLikeComentarioForoStore(
    (s) => s.fetchLikes
  );
  const setPerfil = usePerfilStore((state) => state.setPerfil);

  const fetchPerfil = async () => {
    try {
      const res = await getPerfil();
      setPerfil(res);
    } catch (error) {
      console.error("Error cargando perfil:", error);
    }
  };

  useEffect(() => {
    fetchPerfil();
    fetchFavoritos();
    fetchLikes();
    fetchLikesComentarioClases();
    fetchLikesForos();
    fetchLikesComentarioForos();
  }, [
    fetchLikes,
    fetchLikesComentarioClases,
    fetchFavoritos,
    fetchLikesForos,
    onOpen,
  ]);

  if (isInitialLoading || isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      {!suscripcion && <SuscripcionVencida />}

      <Header />
      <VideoPresentacion
        onOpenChange={onOpenChange}
        isOpen={!hasWatchedVideo}
      />
      <div className="h-full w-full flex overflow-hidden">
        <Menu />
        <div className="flex flex-col w-full h-full overflow-y-auto">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}
