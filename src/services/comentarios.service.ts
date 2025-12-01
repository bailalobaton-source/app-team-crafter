import instance from "@/services/auth/axiosInstance";

export async function getComentarios(id: string | number) {
  const res = await instance.get(`/comentario-clase/${id}`);

  return res.data.comentarios;
}

export async function postComentario(id: string | number, comentario: string) {
  const res = await instance.post(`/comentario-clase/${id}`, {
    comentario: comentario,
  });

  return res.data.comentario;
}

export async function postRespuestaComentario(
  id: string | number,
  comentario: string,
  user_comentario_id: string
) {
  const res = await instance.post(`/respuesta-comentario-clase/${id}`, {
    comentario: comentario,
    user_comentario_id: user_comentario_id,
  });

  return res.data.comentario;
}

export async function getRespuestaComentario(id: string | number) {
  const res = await instance.get(`/respuesta-comentario-clase/${id}`);

  return res.data.respuestas;
}
