"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { IoMailOutline } from "react-icons/io5";
import Loading from "@/app/components/Loading";
import { Suspense } from "react";

function MetodosRegistroContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const loginGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/user/google`;
  };

  return (
    <section className="w-1/2 min-w-[300px] h-full bg-white p-6 rounded-2xl flex flex-col justify-center items-center gap-10 max-md:w-full max-md:py-16">
      <Image
        className="w-[190px]"
        src="/logo.png"
        alt="ps y ai"
        width={800}
        height={800}
      />
      <article className="text-center">
        <h1 className="text-5xl text-[#68E1E0] font-black uppercase max-md:text-3xl">
          Crea tu cuenta
        </h1>
        <h2 className="-mt-7 text-6xl text-[#FC68B9] font-[LearningCurve] max-md:text-5xl">
          en un minuto
        </h2>
      </article>
      <div className="w-full max-w-[510px] flex flex-col gap-4">
        <Button
          className="bg-white text-[#8A8A8A] p-6 border-1 border-neutral-300"
          startContent={<FcGoogle className="absolute left-6 text-2xl" />}
          radius="full"
          onPress={loginGoogle}
        >
          Continuar con Google
        </Button>
        <Link
          href={`/crea-tu-cuenta/correo?plan=${plan}`}
          className="relative bg-white text-sm text-[#8A8A8A] text-center p-4 border-1 border-neutral-300 rounded-full"
        >
          <IoMailOutline className="absolute left-6 text-2xl tex-[#8A8A8A]" />
          Continuar con correo
        </Link>
      </div>
    </section>
  );
}

export default function MetodosRegistro() {
  return (
    <Suspense fallback={<Loading />}>
      <MetodosRegistroContent />
    </Suspense>
  );
}
