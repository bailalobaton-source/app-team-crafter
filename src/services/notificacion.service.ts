import { ConfigNotificacion } from "@/interfaces/configNotificacion.interface";
import instance from "./auth/axiosInstance";

export async function getNotificacion() {
  const res = await instance.get(`/notificaciones/usuario`);

  return res.data.notificaciones;
}

export async function updateNotificacion(data: ConfigNotificacion) {
  const res = await instance.patch(`/config-notificacion`, data);

  return res.data.notificaciones;
}

export async function getBanner() {
  const res = await instance.get(`/banner/usuario`);
  return res.data.banners;
}
