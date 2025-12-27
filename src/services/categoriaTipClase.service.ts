import instance from "./auth/axiosInstance";

export async function getCategoriaClase() {
  const res = await instance.get(`/ajustes/categorias-clase`);
  return res.data.categorias;
}

// tips

export async function getTipsClase() {
  const res = await instance.get(`/ajustes/tips-clase`);
  return res.data.tips;
}
