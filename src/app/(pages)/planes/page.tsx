"use client";
import { useEffect, useState } from "react";
import CardsPlanes from "./components/CardsPlanes";
import HeaderPlanes from "./components/HeaderPlanes";
import TituloPlanes from "./components/TituloPlanes";
import { getPerfil } from "@/services/auth/auth.service";
import { User } from "@/interfaces/user.type";
import Loading from "@/app/components/Loading";
import CorreoNoVerificado from "@/app/components/CorreoNoVerificado";

export default function Planes() {
  const [perfil, setPerfil] = useState<User | null>(null); // 👈 inicializar como null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await getPerfil();
        setPerfil(res);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  if (loading) return <Loading />;
  if (perfil && perfil.emailVerified === false) {
    <CorreoNoVerificado perfil={perfil} />;
  }

  return (
    <>
      {perfil && perfil.emailVerified === false && (
        <CorreoNoVerificado perfil={perfil} />
      )}
      <HeaderPlanes />
      <main className="w-full max-w-9xl p-10 pt-20 max-sm:px4">
        <TituloPlanes />
        <CardsPlanes />
      </main>
    </>
  );
}
