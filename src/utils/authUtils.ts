// utils/authUtils.ts

// Funciones para el cliente
// Guardar el token en la cookie (solo en el cliente)
export function setToken(token: string) {
  if (typeof window !== "undefined") {
    document.cookie = `token=${token}; path=/; max-age=864000`; // Establece el token en las cookies con duración de un día
  }
}

// Obtener el token de la cookie (funciona en cliente)
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    const cookiesArray = document.cookie.split("; ");
    const tokenCookie = cookiesArray.find((cookie) =>
      cookie.startsWith("token=")
    );
    if (tokenCookie) {
      return tokenCookie.split("=")[1]; // Retorna el valor del token
    }
  }
  return null; // Retorna null si no se encuentra el token
}

// Eliminar el token de la cookie (cliente)
export function removeToken() {
  if (typeof window !== "undefined") {
    document.cookie = "token=; path=/; max-age=0"; // Elimina el token de las cookies
  }
}
