import instance from "./auth/axiosInstance";

export async function getLikeComentarioForo() {
  const res = await instance.get(`/like-comentario-foro`);

  return res.data.likeComentarioForos;
}

export async function postLikeComentarioForo(id: number) {
  const res = await instance.post(`/like-comentario-foro/${id}`);

  return res.data.likeComentarioForos;
}

export async function deleteLikeComentarioForo(id: number) {
  const res = await instance.delete(`/like-comentario-foro/${id}`);

  return res.data.likeComentarioForos;
}
