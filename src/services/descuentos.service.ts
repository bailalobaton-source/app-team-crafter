import instance from "./auth/axiosInstance";

export async function getDescuentos() {
  const res = await instance.get(`/descuento`);

  return res.data.descuentos;
}
