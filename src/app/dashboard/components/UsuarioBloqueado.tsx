"use client";

import { useVideoStore } from "@/stores/videoPresentacion.store";
import { removeToken } from "@/utils/authUtils";
import { Link } from "@heroui/react";
import Image from "next/image";

export default function UsuarioBloqueado() {
  const clear = useVideoStore((state) => state.clear);

  const handleLogout = () => {
    clear();
    removeToken();
    window.location.reload();
  };

  // Preparamos el link de WhatsApp (Código +51 de Perú pegado al número)
  const whatsappNumber = "51994757941";
  const mensajeSoporte = encodeURIComponent(
    "Hola, mi cuenta en la plataforma aparece como bloqueada y me gustaría recibir asistencia para recuperarla.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${mensajeSoporte}`;

  return (
    <>
      <Image
        className="w-screen h-screen absolute top-0 object-cover object-top"
        src="/inicio1.png"
        alt="fondo de pantalla"
        width={200}
        height={200}
      />
      <div
        className={`fixed w-screen h-screen bg-[#FC68B94D] z-[100] flex items-center justify-center backdrop-blur-sm`}
      >
        <section className="w-full max-w-xl z-10 bg-white py-10 px-6 rounded-2xl flex flex-col items-center gap-6 text-center">
          <Image
            className="w-16"
            src={"/icons/advertencia.svg"}
            alt="cuenta bloqueada"
            width={200}
            height={200}
          />
          <h2 className="text-3xl text-[#FC68B9] font-black text-balance">
            Tu cuenta se encuentra <br />
            bloqueada
          </h2>
          <p className="text-lg text-[#8A8A8A] font-medium">
            TU CUENTA ESTÁ BLOQUEADA por motivos de seguridad o incumplimiento
            de las normas. Si crees que ha sido un error o deseas mas
            información comunícate con nosotros.
          </p>

          {/* Botón de WhatsApp con prop isExternal para abrir en nueva pestaña */}
          <Link
            href={whatsappLink}
            isExternal
            className="w-fit bg-[#fc68b9] text-white text-lg font-semibold px-10 py-2 border-5 border-[#fc68b9] rounded-full hover:bg-[#fc68b9] hover:border-[#fc68b9] hover:text-[#ffee97] shadow-rigth-yellow duration-500"
          >
            Contactar a Soporte
          </Link>

          <button
            onClick={handleLogout}
            className="text-[#FC68B9] text-base font-semibold cursor-pointer hover:underline"
          >
            Cerrar Sesión
          </button>
        </section>
      </div>
    </>
  );
}
