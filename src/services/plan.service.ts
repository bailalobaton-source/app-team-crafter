import instance from "./auth/axiosInstance";

export async function getPlan(id: string | number) {
  const res = await instance.get(`/plan/${id}`);

  return res.data.plan;
}
