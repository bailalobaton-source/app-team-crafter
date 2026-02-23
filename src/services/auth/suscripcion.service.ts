import instance from "./axiosInstance";

// Opcional pero recomendado: Crear una interfaz para tipar los datos
export interface SuscripcionMPData {
  id: number;
  paypalSubscriptionId: string;
}

export async function postSuscripcion(
  id: number,
  datosSuscripcion: SuscripcionMPData,
) {
  try {
    // ⚠️ EL CAMBIO CLAVE: Pasar 'datosSuscripcion' como segundo parámetro
    const res = await instance.post(`/suscripcion/${id}`, datosSuscripcion);

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function postSuscripcionPaypal({
  id,
  paypalSubscriptionId,
}: SuscripcionMPData) {
  try {
    const res = await instance.post(`/suscripcion/paypal/${id}`, {
      paypalSubscriptionId,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getSuscripcion() {
  try {
    const res = await instance.get(`/suscripcion/activa`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getSuscripcionID(id: string) {
  try {
    const res = await instance.get(`/suscripcion/activa/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export async function getSuscripciones() {
  try {
    const res = await instance.get(`/suscripcion`);

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function patchMigrarSuscripcion(
  id: number,
  data: { planExternalId: number },
) {
  try {
    const res = await instance.patch(`/suscripcion/${id}`, data);

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function cancelarSuscripcion(id: number) {
  try {
    const res = await instance.delete(`/suscripcion/${id}`);

    return res.data;
  } catch (error) {
    throw error;
  }
}
