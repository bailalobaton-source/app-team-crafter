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
  link_recurso: string;
  img_recurso: string;
  fecha_caducidad: string;
  tipo_recurso: string;
  categoria_recurso: string;
  status: "active" | "disabled";
  createdAt: string;
  clase: Clase;
}

export interface Descarga {
  id: number;
  fecha_descarga: string;
  recurso: Recurso;
}
