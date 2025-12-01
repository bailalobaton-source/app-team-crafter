import axios from "axios";
import { cookies } from "next/headers";

export async function axiosWithAuth() {
  const cookieStore = await cookies(); // No necesita `await` porque cookies() ya es síncrona en App Router
  const token = cookieStore.get("token")?.value;

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
