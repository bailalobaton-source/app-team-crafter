"use client";

import { postLogin } from "@/services/auth/auth.service";
import { Login } from "@/interfaces/auth.type";
import { inputClassNames } from "@/utils/classNames";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button, Input, Spinner, useDisclosure } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ModalOlvideContraseña from "./ModalOlvideContraseña";
import { FcGoogle } from "react-icons/fc";

export default function FormIniciarSesion() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<Login>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = useCallback(
    async (data: Login) => {
      setLoading(true);
      try {
        await postLogin(data);
        router.push("/");
        window.location.reload();
      } catch (err: unknown) {
        handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const watchedFields = watch(["correo", "password"]);

  const isFormValid = watchedFields.every((field) => {
    if (typeof field === "string") {
      return field && field.trim() !== "";
    }
    return field !== undefined && field !== null && field !== "";
  });

  const loginGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/user/google`;
  };

  return (
    <section className="w-1/2   h-full bg-white p-6  rounded-2xl  flex flex-col justify-center items-center  gap-10 max-md:w-full ">
      <Image
        className="w-[190px]"
        src="/logo.png"
        alt="ps y ai"
        width={800}
        height={800}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full max-w-[500px] flex flex-col justify-center items-center gap-6"
      >
        <div className="w-full flex flex-col gap-8">
          <Input
            isRequired
            classNames={inputClassNames}
            label="Correo electrónico"
            placeholder="Escribe tu correo"
            labelPlacement="outside"
            type="email"
            {...register("correo")}
            errorMessage="El correo es obligatorio"
            radius="full"
          />
          <Input
            isRequired
            classNames={inputClassNames}
            label="Contraseña"
            placeholder="Escribe tu contraseña"
            labelPlacement="outside"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            errorMessage="La contraseña es obligatoria"
            endContent={
              <button
                className="cursor-pointer"
                type="button"
                onClick={togglePasswordVisibility}
                aria-label="toggle password visibility"
              >
                {showPassword ? (
                  <AiOutlineEye className="text-2xl text-gray flex-shrink-0" />
                ) : (
                  <AiOutlineEyeInvisible className="text-2xl text-gray flex-shrink-0" />
                )}
              </button>
            }
            radius="full"
          />
        </div>
        <button
          className="color-pink text-base font-semibold cursor-pointer"
          onClick={onOpen}
          type="button"
        >
          Olvidaste tu contraseña?
        </button>

        <Button
          className={`text-xl font-semibold px-8 py-6 border-3 duration-500 transition-all ${
            isFormValid
              ? "bg-[#fc68b9] text-[#ffee97] border-[#FFEE97] hover:bg-[#fc68b9] hover:border-[#FFEE97] hover:text-[#ffee97] shadow-rigth-yellow cursor-pointer"
              : "bg-[#E2E6F5] text-gray-400 border-[#E2E6F5] cursor-not-allowed opacity-50"
          }`}
          radius="full"
          type="submit"
          disabled={!isFormValid || loading}
        >
          {loading ? <Spinner /> : "Iniciar sesión"}
        </Button>
      </form>
      <Button
        className=" bg-white text-[#8A8A8A] p-6 -mt-6 border-1 border-neutral-300"
        startContent={<FcGoogle className=" text-2xl" />}
        radius="full"
        onPress={loginGoogle}
      >
        Iniciar sesión con Google
      </Button>
      <div className="text-sm flex gap-2">
        <p className="text-gray ">¿No tienes una cuenta?</p>
        <Link
          href={`/crea-tu-cuenta?${plan ? `plan=${plan}` : ""}`}
          className="color-pink  font-semibold"
        >
          Suscríbete
        </Link>
      </div>
      <ModalOlvideContraseña onOpenChange={onOpenChange} isOpen={isOpen} />
    </section>
  );
}
