import { nuevoPasswordCorreo } from "@/services/auth/auth.service";
import { inputClassNames } from "@/utils/classNames";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button, Input, Modal, ModalContent } from "@heroui/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  onOpenChange: (i: boolean) => void;
  isOpen: boolean;
}

interface Correo {
  correo: string;
}

export default function ModalOlvideContraseña({ onOpenChange, isOpen }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Correo>({
    defaultValues: { correo: "" },
  });

  const onSubmit = async (data: Correo) => {
    toast.promise(nuevoPasswordCorreo(data.correo), {
      loading: "Enviando correo...",
      success: () => {
        reset(); // limpiar form
        onOpenChange(false);
        return "Correo enviado correctamente 📧";
      },
      error: (err) => {
        handleAxiosError(err);
        setError("correo", {
          message: "No pudimos enviar el correo, intenta de nuevo",
        });
        return "Error al enviar el correo";
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent className="w-full p-4">
        {(onClose) => (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full p-4 flex flex-col gap-4"
          >
            <h2 className="text-2xl text-[#68E1E0] font-bold">
              ¿Olvidaste tu contraseña?
            </h2>

            <p className="text-sm text-gray-600">
              Ingresa tu correo electrónico y te enviaremos un enlace para
              restablecer tu contraseña.
            </p>

            <Input
              className="mt-4"
              isRequired
              classNames={inputClassNames}
              label="Correo electrónico"
              placeholder="Escribe tu correo"
              labelPlacement="outside"
              type="email"
              radius="full"
              {...register("correo", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "El correo no es válido",
                },
              })}
              errorMessage={errors.correo?.message}
            />

            <div className="w-full flex justify-end gap-4 mt-4">
              <Button
                type="button"
                className="bg-white text-[#FC68B9] font-semibold border-1 border-[#FC68B9]"
                radius="full"
                onPress={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#FC68B9] text-white font-semibold"
                radius="full"
              >
                Recuperar
              </Button>
            </div>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
