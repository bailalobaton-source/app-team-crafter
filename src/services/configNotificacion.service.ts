import { ConfigNotificacion } from "@/interfaces/configNotificacion.interface";
import instance from "./auth/axiosInstance";

export async function getConfigNotificacion() {
  const res = await instance.get(`/config-notificacion`);

  return res.data.notificaciones;
}

export async function updateConfigNotificacion(data: ConfigNotificacion) {
  const res = await instance.patch(`/config-notificacion`, data);

  return res.data.notificaciones;
}
