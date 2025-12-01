"use client";

import { inputClassNames, inputClassNames2 } from "@/utils/classNames";
import { Button, Input, useDisclosure } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Signup } from "../../../../../interfaces/auth.type";
import { postSignup } from "@/services/auth/auth.service";
import { toast } from "sonner";
import { handleAxiosError } from "@/utils/errorHandler";
import Loading from "@/app/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import ModalOlvideContraseña from "@/app/(pages)/iniciar-sesion/components/ModalOlvideContraseña";

function FormRegistroCorreoContent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<Signup>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const watchedFields = watch([
    "nombre",
    "apellidos",
    "correo",
    "password",
    "telefono",
    "codigo_pais",
  ]);

  const isFormValid = watchedFields.every((field) => {
    if (typeof field === "string") {
      return field && field.trim() !== "";
    }
    return field !== undefined && field !== null && field !== "";
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = useCallback(
    async (data: Signup) => {
      setLoading(true);
      try {
        await postSignup(data, plan);
        toast.success("Se registró correctamente");
        reset();
        if (plan) {
          router.push(`/planes/${plan}`);
        } else {
          router.push(`/planes`);
        }
      } catch (err: unknown) {
        handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    },
    [reset, plan, router]
  );

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

  return (
    <section className="w-1/2 min-w-[300px] h-auto bg-white p-6 rounded-2xl flex flex-col justify-start items-center gap-10 max-md:w-full ">
      {loading && <Loading />}

      <Image
        className="w-[170px]"
        src="/logo.png"
        alt="Logo PS y AI"
        width={800}
        height={800}
        priority
      />
      <article className="text-center">
        <h1 className="text-5xl text-[#68E1E0] font-black uppercase max-md:text-3xl">
          Crea tu cuenta
        </h1>
        <h2 className="-mt-7 text-6xl text-[#FC68B9] font-[LearningCurve] max-md:text-5xl">
          en un minuto
        </h2>
      </article>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[500px] flex flex-col justify-center items-center gap-6"
      >
        <div className="w-full flex flex-col gap-8">
          <Input
            isRequired
            classNames={inputClassNames}
            label="Nombre"
            placeholder="Natalia"
            labelPlacement="outside"
            type="text"
            {...register("nombre", { required: true })}
            errorMessage="El nombre es obligatorio"
            radius="full"
          />
          <Input
            isRequired
            classNames={inputClassNames}
            label="Apellidos"
            placeholder="Escribe tus apellidos"
            labelPlacement="outside"
            type="text"
            {...register("apellidos", { required: true })}
            errorMessage="Los Apellidos son obligatorios"
            radius="full"
          />
          <Input
            isRequired
            classNames={inputClassNames}
            label="Correo electrónico"
            placeholder="Escribe tu correo"
            labelPlacement="outside"
            type="email"
            {...register("correo", { required: true })}
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
            {...register("password", {
              required: true,
              validate: validatePassword,
            })}
            isInvalid={!!errors.password}
            errorMessage={
              errors?.password?.message || "La contraseña es obligatoria"
            }
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
          <Input
            isRequired
            classNames={inputClassNames}
            label="DNI/ID/CE"
            labelPlacement="outside"
            type="text"
            {...register("dni_id_ce")}
            errorMessage="El DNI/ID/CE es obligatorio"
            radius="full"
            placeholder="Escribe tu DNI/ID/CE"
          />

          {/* Campo de teléfono */}
          <div className="relative flex flex-col gap-1">
            <Input
              className="absolute right-0 w-[calc(100%-105px)] bottom-0 z-10"
              classNames={inputClassNames2}
              isRequired
              label=""
              labelPlacement="outside"
              type="number"
              {...register("telefono", { required: true })}
            />
            <label className="text-gray text-base font-medium pb-1.5">
              Teléfono
            </label>
            <Controller
              name="codigo_pais"
              control={control}
              rules={{ required: "El teléfono es obligatorio" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="relative">
                  <PhoneInput
                    value={value}
                    country={"us"}
                    onChange={(phone) => onChange(phone)}
                    inputStyle={{
                      width: "150px",
                      height: "48px",
                      borderRadius: "9999px",
                      paddingLeft: "60px",
                      fontSize: "14px",
                      fontWeight: "400",
                      backgroundColor: "#F1F6FB",
                      color: "#18181b",
                      outline: "none",
                      transition: "all 0.2s ease",
                    }}
                    buttonStyle={{
                      border: "none",
                      backgroundColor: "transparent",
                      borderRadius: "10px",
                      paddingLeft: "16px",
                      paddingRight: "8px",
                    }}
                    containerStyle={{
                      width: "150px",
                    }}
                    dropdownStyle={{
                      borderRadius: "12px",
                      border: "2px solid #e4e4e7",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  {error && (
                    <p className="text-xs text-red-500 mt-1 ml-3">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
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
          Registrarse y continuar
        </Button>
      </form>

      <div className="text-sm flex gap-2">
        <p className="text-gray">¿Ya tienes una cuenta?</p>
        <Link href="/iniciar-sesion" className="color-pink font-semibold">
          Iniciar sesión
        </Link>
      </div>
      <ModalOlvideContraseña onOpenChange={onOpenChange} isOpen={isOpen} />
    </section>
  );
}

export default function FormRegistroCorreo() {
  return (
    <Suspense fallback={<Loading />}>
      <FormRegistroCorreoContent />
    </Suspense>
  );
}
