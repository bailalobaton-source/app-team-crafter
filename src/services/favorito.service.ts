import instance from "./auth/axiosInstance";
import { GetClasesParams } from "./clases.service";

export async function getFavoritos() {
  const res = await instance.get(`/favorito`);

  return res.data.favoritos;
}

export async function postFavorito(id: number) {
  const res = await instance.post(`/favorito/${id}`);

  return res.data.favoritos;
}

export async function deleteFavorito(id: number) {
  const res = await instance.delete(`/favorito/${id}`);

  return res.data.favoritos;
}

export async function getFavoritosView(params: GetClasesParams = {}) {
  const queryParams = new URLSearchParams();

  // Convertir arrays a strings separados por comas
  if (params.categoria_clase && params.categoria_clase.length > 0) {
    queryParams.append("categoria_clase", params.categoria_clase.join(","));
  }

  if (params.tutoriales_tips && params.tutoriales_tips.length > 0) {
    queryParams.append("tutoriales_tips", params.tutoriales_tips.join(","));
  }

  if (params.cuatro_ultimos) {
    queryParams.append("cuatro_ultimos", params.cuatro_ultimos);
  }

  if (params.order) {
    queryParams.append("order", params.order);
  }

  const query = queryParams.toString();
  const res = await instance.get(`/favorito/view?${query}`);

  return res.data.favoritos;
}
