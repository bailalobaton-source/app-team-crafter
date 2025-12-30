import instance from "./auth/axiosInstance";

interface GetRecursoParams {
  categoria_recurso?: number[];
  tipo_recurso?: number[];
  cuatro_ultimos?: string;
  order?: string;
}

export async function getRecursos(params: GetRecursoParams = {}) {
  const queryParams = new URLSearchParams();

  if (params.categoria_recurso?.length) {
    queryParams.append("categoria_recurso", params.categoria_recurso.join(","));
  }

  if (params.tipo_recurso?.length) {
    queryParams.append("tipo_recurso", params.tipo_recurso.join(","));
  }

  if (params.cuatro_ultimos) {
    queryParams.append("cuatro_ultimos", params.cuatro_ultimos);
  }

  if (params.order) {
    queryParams.append("order", params.order);
  }

  const res = await instance.get(`/recurso?${queryParams.toString()}`);
  return res.data.recursos;
}

export async function postExpirado(id: number, mensaje: string) {
  const res = await instance.post(`/recurso/expirado/${id}`, {
    mensaje: mensaje,
  });

  return res.data.clase;
}
