import { RespuestaComentario } from "@/interfaces/comentario.interface";
import { Avatar, Link } from "@heroui/react";
// import { PiHeart } from "react-icons/pi";

interface Props {
  respuesta: RespuestaComentario;
}

export default function RespuestaComentariosForo({ respuesta }: Props) {
  return (
    <article className="flex gap-3">
      <Avatar
        className="w-7 h-7 flex-shrink-0"
        src={
          respuesta.usuario?.foto_perfil
            ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${respuesta.usuario?.foto_perfil}`
            : "/icons/user.svg"
        }
        alt={`Avatar de ${respuesta.usuario.nombre}`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-[#8A8A8A] font-semibold text-sm truncate">
            {respuesta.usuario.nombre}
          </p>
          <time className="text-[#8A8A8A] text-xs font-light flex-shrink-0">
            {respuesta.createdAt}
          </time>
        </div>

        <div className="mb-2">
          {respuesta.user_id && respuesta.usuario && (
            <Link
              href="#"
              className="text-xs font-semibold text-[#FC68B9] hover:underline mr-1"
            >
              @{respuesta.usuario.nombre}
            </Link>
          )}
          <p className="text-sm text-[#8A8A8A] leading-relaxed">
            {respuesta.comentario}
          </p>
        </div>
      </div>
    </article>
  );
}
