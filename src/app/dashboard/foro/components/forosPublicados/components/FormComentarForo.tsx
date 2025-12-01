import { ComentarioForo } from "@/interfaces/foro.interface";
import {
  postComentarioForo,
  postRespuestaComentarioForo,
} from "@/services/foro.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button, Textarea } from "@heroui/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  foroId: number;
  reloadForo: () => void;
  respuestaComentario?: boolean;
  user_comentario_id?: number;
  comentarioId?: number;
  onCancel?: () => void;
}

export default function FormComentarForo({
  foroId,
  reloadForo,
  respuestaComentario,
  user_comentario_id,
  comentarioId,
  onCancel,
}: Props) {
  const { register, handleSubmit, reset } = useForm<ComentarioForo>();
  const [isLoading, setIsLoading] = useState(false); // 🆕 Estado de carga

  const onSubmit = useCallback(async (data: ComentarioForo) => {
    setIsLoading(true);

    try {
      if (respuestaComentario && comentarioId && user_comentario_id) {
        await postRespuestaComentarioForo(
          comentarioId,
          data.comentario,
          user_comentario_id
        );
      } else {
        await postComentarioForo(foroId, data);
      }

      reloadForo();
      reset();
      toast.success(
        respuestaComentario ? "Respuesta enviada" : "Comentario enviado"
      );

      // Si es una respuesta y hay callback de cancelar, ejecutarlo
      if (respuestaComentario && onCancel) {
        onCancel();
      }
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <form
      className="w-full flex items-center gap-2 mt-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full relative">
        <Textarea
          className="w-full"
          placeholder="Escribir comentario"
          classNames={{
            inputWrapper:
              "bg-[#F1F6FB] data-[hover=true]:bg-[#F1F6FB] h-11 px-6",
          }}
          {...register("comentario")}
        />
        <Button
          type="submit"
          className="absolute bottom-2 right-2 bg-[#FC68B9] text-white font-semibold"
          radius="full"
        >
          {isLoading ? "cargando ... " : "Publicar"}
        </Button>
      </div>
    </form>
  );
}
