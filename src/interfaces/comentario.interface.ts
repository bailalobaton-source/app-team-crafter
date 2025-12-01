import { User } from "./user.type";

export interface Comentario {
  id: number;
  clase_id: number;
  user_id: string;
  comentario: string;
  nro_likes: number;
  usuario: User;
  createdAt: string;
}

export interface RespuestaComentario {
  id: number;
  comentario_clase_id: number;
  user_id: number;
  comentario: string;
  nro_likes: number;
  usuario: User;
  createdAt: string;
}
