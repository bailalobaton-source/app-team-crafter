import { CategoriaClase, TipClase } from "./categoriasTipsClase.interface";
import { Recurso } from "./recurso.interface";

export interface FormClase {
  video_clase: string;
  duracion_video: string;
  titulo_clase: string;
  titulo_clase_en: string;
  descripcion_clase: string;
  descripcion_clase_en: string;
  categoria_clase_id: string;
  tutoriales_tips_id: string;
  poster_url: string;
}

export interface Clase {
  id: number;
  image_clase: string;
  video_clase: string;
  titulo_clase: string;
  titulo_clase_en: string;
  descripcion_clase: string;
  descripcion_clase_en: string;
  duracion_video: string;
  nro_reproducciones: number;
  nro_likes: number;
  categoria_clase_id: string;
  tutoriales_tips_id: string;
  status: "active" | "disabled";
  recurso: Recurso;
  poster_url: string;
  categoria_clase: CategoriaClase;
  tip_clase: TipClase;
}
