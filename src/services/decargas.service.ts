import instance from "./auth/axiosInstance";

export async function getDescargas() {
  const res = await instance.get(`/descargas`);

  return res.data.descargas;
}

export async function postDescarga(id: number) {
  const res = await instance.post(`/descargas//${id}`, {
    mensaje: "descarga creada",
  });

  return res.data.descarga;
}
