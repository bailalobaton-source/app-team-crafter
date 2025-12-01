import instance from "./auth/axiosInstance";

export async function getLikeForos() {
  const res = await instance.get(`/like-foro`);

  return res.data.likeForos;
}

export async function postLikeForos(id: number) {
  const res = await instance.post(`/like-foro/${id}`);

  return res.data.likeForos;
}

export async function deleteLikeForos(id: number) {
  const res = await instance.delete(`/like-foro/${id}`);

  return res.data.likeForos;
}
