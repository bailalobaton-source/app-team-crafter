"use client";
import CorreoNoVerificado from "@/app/components/CorreoNoVerificado";
import Loading from "@/app/components/Loading";
import { User } from "@/interfaces/user.type";
import { getPerfil } from "@/services/auth/auth.service";
import useSuscripcionStore from "@/stores/SuscripcionContext";
import { useEffect, useState } from "react";

export default function PlanIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const forceRefetch = useSuscripcionStore((state) => state.forceRefetch);
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

    forceRefetch();
  }, [forceRefetch]);

  if (loading) return <Loading />;
  if (perfil && perfil.emailVerified === false) {
    return <CorreoNoVerificado perfil={perfil} />;
  }

  return <>{children}</>;
}
