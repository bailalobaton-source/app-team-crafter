export interface Plan {
  id: number;
  nombre_plan: string;
  precio_plan: number;
  titulo: string;
  descripcion: string;
  color_card: string;
  color_principal: string;
  color_text: string;
  ruta_img: string;
  paypal_id?: string;
}
