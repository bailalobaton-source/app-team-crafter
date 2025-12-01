import { Recurso } from "./recurso.interface";

export interface FormClase {
  image_clase: File[] | null;
  video_clase: string;
  titulo_clase: string;
  descripcion_clase: string;
  categoria_clase: string;
  tutoriales_tips: string;
}

export interface Clase {
  id: number;
  image_clase: string;
  video_clase: string;
  titulo_clase: string;
  descripcion_clase: string;
  nro_reproducciones: number;
  nro_likes: number;
  categoria_clase: string;
  tutoriales_tips: string;
  duracion_video: string;
  status: "active" | "disabled";
  createdAt: string;
  recurso: Recurso;
  poster_url: string;
}
