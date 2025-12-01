import instance from "./auth/axiosInstance";

export interface GetClasesParams {
  categoria_clase?: string[];
  tutoriales_tips?: string[];
  cuatro_ultimos?: string;
  order?: string;
}

export async function getClases(params: GetClasesParams = {}) {
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
  const res = await instance.get(`/clase?${query}`);

  return res.data.clases;
}

export async function getClasesId(id: number | string) {
  const res = await instance.get(`/clase/${id}`);

  return res.data.clase;
}

export async function getLikeClase(id: number | string) {
  const res = await instance.get(`/clase/${id}`);

  return res.data.clase;
}

export async function getViewClase(id: number | string) {
  const res = await instance.get(`/clase/view/${id}`);
  return res.data.clases;
}

export async function getBuscar(buscador: string) {
  const res = await instance.get(`/clase/buscar?buscador=${buscador}`);
  return res.data.clases;
}

// export async function postClase(data: FormClase) {
//   const res = await instance.post(`/clase`, data);

//   return res.data.clase;
// }

// export async function updateClase(data: FormClase, id: number) {
//   const res = await instance.patch(`/clase/${id}`, data);

//   return res.data.clase;
// }
