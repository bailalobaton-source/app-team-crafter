import { User } from "./user.type";

export interface FormForo {
  titulo_foro: string;
  contenido_foro: string;
  img_foro: File[] | null;
  categoria_foro: string;
}

export interface ComentarioForo {
  id: number;
  foro: Foro;
  comentario: string;
  usuario: User;
  createdAt: string;
  likes_comentario_foro: number;
  foro_id: number;
  user_id: number;
  respuesta_comentarios_foros: RespuestaComentarioForo[];
}

export interface Foro {
  id: number;
  titulo_foro: string;
  contenido_foro: string;
  img_foro: string;
  categoria_foro: string;
  usuario: User;
  createdAt: string;
  likes_foro: number;
  comentarios_foro: ComentarioForo[];
}

export interface RespuestaComentarioForo {
  id: number;
  comentario_foro_id: number;
  user_id: number;
  comentario: string;
  nro_likes: number;
  usuario: User;
  createdAt: string;
}
