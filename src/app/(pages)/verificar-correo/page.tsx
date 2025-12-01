"use client";

import Loading from "@/app/components/Loading";
import { verificarCorreo } from "@/services/auth/auth.service";
import { User } from "@/interfaces/user.type";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerificarCorreoContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const plan = searchParams.get("plan");

  const router = useRouter();

  const [perfil, setPerfil] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [contador, setContador] = useState(5); // ⏳ segundos para redirigir

  useEffect(() => {
    if (token) {
      const fetchPerfil = async () => {
        try {
          const res = await verificarCorreo(token);
          setPerfil(res);
        } catch (error) {
          console.error("Error al verificar el correo:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPerfil();
    }
  }, [token]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setContador((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          if (plan) {
            router.push(`/planes/${plan}`);
          } else {
            router.push(`/planes`);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [loading, perfil, router, plan]);

  if (loading) return <Loading />;

  return (
    <div
      className="fixed inset-0 w-screen h-screen background-login z-50 flex flex-col items-center justify-center backdrop-blur-sm text-center px-4"
      role="alert"
      aria-live="assertive"
    >
      <Image
        className="w-32 mb-4"
        src="/logo.png"
        alt="Logo de la aplicación"
        width={200}
        height={200}
        priority
      />
      <h1 className="text-2xl text-[#fc68b9] font-bold">
        ¡Tu correo electrónico ha sido verificado con éxito!
      </h1>
      <p className="mt-2 text-base max-w-md">
        Gracias por confirmar tu correo electrónico.
        <span className="font-semibold block mt-2 text-[#fc68b9]">
          {perfil?.correo}
        </span>
      </p>

      <p className="mt-4 text-sm text-gray-600">
        Serás redirigido en <span className="font-bold">{contador}</span>{" "}
        segundos...
      </p>
    </div>
  );
}

export default function VerificarCorreoPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerificarCorreoContent />
    </Suspense>
  );
}
