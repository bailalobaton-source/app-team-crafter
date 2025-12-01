import { ComentarioForo } from "@/interfaces/foro.interface";
import instance from "./auth/axiosInstance";

export async function getForos(order: "asc" | "desc") {
  const res = await instance.get(`/foro?order=${order}`);

  return res.data.foros;
}

export async function postForo(data: FormData) {
  const res = await instance.post(`/foro`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.foro;
}

export async function deleteforo(id: number) {
  const res = await instance.delete(`/foro/${id}`);

  return res.data.foro;
}

export async function getComentarioForo(id: number) {
  const res = await instance.get(`/comentario-foro/${id}`);

  return res.data.comentarioForos;
}

export async function postComentarioForo(id: number, data: ComentarioForo) {
  const res = await instance.post(`/comentario-foro/foro/${id}`, data);

  return res.data.comentarioForos;
}

export async function postRespuestaComentarioForo(
  id: number,
  comentario: string,
  user_comentario_id: number
) {
  const res = await instance.post(`/respuesta-comentario-foro/${id}`, {
    comentario: comentario,
    user_comentario_id: user_comentario_id,
  });

  return res.data.respuestas;
}

export async function getRespuestaComentarioForo(id: number) {
  const res = await instance.get(`/respuesta-comentario-foro/${id}`);

  return res.data.respuestas;
}
