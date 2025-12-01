// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/planes"); // <-- protegemos planes y planes/:id

  const isAuthRoute = [
    "/iniciar-sesion",
    "/crea-tu-cuenta",
    "/crea-tu-cuenta/correo",
  ].includes(pathname);

  // Redirección en raíz "/"
  if (pathname === "/") {
    return token
      ? NextResponse.redirect(new URL("/dashboard/inicio", request.url))
      : NextResponse.redirect(new URL("/iniciar-sesion", request.url));
  }

  // Rutas protegidas → si no hay token, redirigir a login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/iniciar-sesion", request.url));
  }

  // Rutas de login/registro → si ya hay token, redirigir al dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard/inicio", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/planes/:path*", // <-- agregamos planes y subrutas
    "/iniciar-sesion",
    "/crea-tu-cuenta",
    "/crea-tu-cuenta/correo",
  ],
};
