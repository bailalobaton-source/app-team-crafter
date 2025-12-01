"use client";

import { nuevoPassword } from "@/services/auth/auth.service";
import { inputClassNames } from "@/utils/classNames";
import { Button, Input, Link } from "@heroui/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";

type PasswordFormInputs = {
  nueva_password: string;
  repeat_password: string;
};

export default function FormCambiarPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<PasswordFormInputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordCambiado, setPasswordCambiado] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Validación de contraseña
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (!minLength || !hasNumber || !hasUpperCase || !hasLowerCase) {
      return "La contraseña debe tener al menos 8 caracteres, incluir un número, una letra mayúscula y una minúscula.";
    }
    return true;
  };

  const validatePasswordConfirmation = (value: string) => {
    const password = watch("nueva_password");
    return value === password || "Las contraseñas no coinciden";
  };

  const onSubmit = async (data: PasswordFormInputs) => {
    if (token) {
      try {
        nuevoPassword(data.nueva_password, token);
        setPasswordCambiado(true);
        toast.success("Contraseña cambiada exitosamente");
      } catch (error) {
        console.error("Error:", error);
        setError("root", {
          type: "manual",
          message: "Error al cambiar la contraseña. Intenta nuevamente.",
        });
      }
    }
  };

  return (
    <section className="w-full min-w-[300px] h-full bg-white p-6 rounded-2xl flex flex-col justify-center items-center gap-10">
      <Image
        className="w-[170px]"
        src="/logo.png"
        alt="Logo PS y AI"
        width={800}
        height={800}
        priority
      />

      {passwordCambiado ? (
        <div className="w-full max-w-[500px] flex flex-col justify-center items-center gap-6">
          <Image
            className="w-[100px]"
            src="/verificacion.gif"
            alt="Logo PS y AI"
            width={800}
            height={800}
            priority
          />

          <Image
            className="w-[250px]"
            src="/password-cambiado.svg"
            alt="Logo PS y AI"
            width={800}
            height={800}
            priority
          />
          <Link
            href="/iniciar-sesion"
            className=" text-xl font-semibold px-8 py-3 border-3 bg-[#fc68b9] border-[#FFEE97] text-[#ffee97] shadow-rigth-yellow rounded-full "
          >
            Iniciar sesión
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[500px] flex flex-col justify-center items-center gap-6"
        >
          <div className="w-full flex flex-col gap-8">
            <Input
              isRequired
              classNames={inputClassNames}
              label="Nueva Contraseña"
              placeholder="Ingresa tu nueva contraseña"
              labelPlacement="outside"
              type={showPassword ? "text" : "password"}
              {...register("nueva_password", {
                required: "La contraseña es obligatoria",
                validate: validatePassword,
              })}
              isInvalid={!!errors.nueva_password}
              errorMessage={errors.nueva_password?.message}
              description="La contraseña debe tener al menos 8 caracteres, incluir un número, una letra mayúscula y una minúscula."
              endContent={
                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
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

            <Input
              isRequired
              classNames={inputClassNames}
              label="Confirmar Contraseña"
              placeholder="Repite tu nueva contraseña"
              labelPlacement="outside"
              type={showConfirmPassword ? "text" : "password"}
              {...register("repeat_password", {
                required: "Debes confirmar la contraseña",
                validate: validatePasswordConfirmation,
              })}
              isInvalid={!!errors.repeat_password}
              errorMessage={errors.repeat_password?.message}
              description="Ingresa nuevamente la contraseña para confirmarla."
              endContent={
                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={
                    showConfirmPassword
                      ? "Ocultar confirmación de contraseña"
                      : "Mostrar confirmación de contraseña"
                  }
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye className="text-2xl text-gray flex-shrink-0" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-2xl text-gray flex-shrink-0" />
                  )}
                </button>
              }
              radius="full"
            />
          </div>

          {errors.root && (
            <div className="text-red-500 text-sm text-center">
              {errors.root.message}
            </div>
          )}

          <Button
            className="bg-[#E2E6F5] text-white text-xl font-semibold px-8 py-6 border-3 border-[#E2E6F5] hover:bg-[#fc68b9] hover:border-[#FFEE97] hover:text-[#ffee97] shadow-rigth-yellow duration-500 disabled:opacity-50"
            radius="full"
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Guardar
          </Button>
        </form>
      )}
    </section>
  );
}
