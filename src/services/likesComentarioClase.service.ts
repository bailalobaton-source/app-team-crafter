import instance from "./auth/axiosInstance";

export async function getLikeComentarioClase() {
  const res = await instance.get(`/like-comentario-clase`);

  return res.data.likeComentarioClases;
}

export async function postLikeComentarioClase(id: number) {
  const res = await instance.post(`/like-comentario-clase/${id}`);

  return res.data.likeComentarioClases;
}

export async function deleteLikeComentarioClase(id: number) {
  const res = await instance.delete(`/like-comentario-clase/${id}`);

  return res.data.likeComentarioClases;
}
