"use client";

import { Comentario } from "@/interfaces/comentario.interface";
import ComentarioItem from "./ComentariosItem/ComentariosItem";

interface ComentariosClaseProps {
  className?: string;
  claseId: number;
  comentarios: Comentario[];
}

// Interfaces y tipos

const ComentariosClase: React.FC<ComentariosClaseProps> = ({
  comentarios,
  className = "",
}) => {
  // Early return con tipado
  if (!comentarios?.length) {
    return (
      <section className={`w-full mt-12 ${className}`}>
        <p className="text-center text-[#8A8A8A] py-8">
          No hay comentarios aún. ¡Sé el primero en comentar!
        </p>
      </section>
    );
  }

  return (
    <section
      className={`w-full mt-12 ${className}`}
      role="region"
      aria-label="Sección de comentarios"
    >
      <div className="space-y-8">
        {comentarios.map((comentario: Comentario) => (
          <ComentarioItem
            key={comentario.id}
            comentario={comentario}
            // onLikeComentario={handleLikeComentario}
            // onLikeRespuesta={handleLikeRespuesta}
            // onResponder={handleResponder}
          />
        ))}
      </div>
    </section>
  );
};

export default ComentariosClase;
