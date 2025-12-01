import instance from "./auth/axiosInstance";

export async function getLikeClases() {
  const res = await instance.get(`/like-clase`);

  return res.data.likeClases;
}

export async function postLikeClases(id: number) {
  const res = await instance.post(`/like-clase/${id}`);

  return res.data.likeClases;
}

export async function deleteLikeClases(id: number) {
  const res = await instance.delete(`/like-clase/${id}`);

  return res.data.likeClases;
}
