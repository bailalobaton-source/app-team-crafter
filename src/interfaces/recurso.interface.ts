import { CategoriaClase, TipClase } from "./categoriasTipsClase.interface";
import { Clase } from "./clase.interface";

export interface FormClase {
  image_clase: File[] | null;
  video_clase: string;
  titulo_clase: string;
  descripcion_clase: string;

  categoria_clase: string;
  tutoriales_tips: string;
}

export interface Recurso {
  id: number;
  clase_id: string;
  nombre_recurso: string;
  nombre_recurso_en: string;
  link_recurso: string;
  img_recurso: string;
  fecha_caducidad: string;
  status: "active" | "disabled";
  createdAt: string;
  clase: Clase;
  categorias_ids: CategoriaRecursoId[];
  tipos_ids: TipRecursoId[];
}

export interface Descarga {
  id: number;
  fecha_descarga: string;
  recurso: Recurso;
}

export interface CategoriaRecursoId {
  id: number;
  clase_id: number;
  categoria_recurso_id: number;
  categoria_recurso: CategoriaClase;
}

export interface TipRecursoId {
  id: number;
  recurso_id: number;
  tipo_recurso_id: number;
  tipo_recurso: TipClase;
}
