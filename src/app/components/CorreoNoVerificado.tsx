import { User } from "@/interfaces/user.type";
import { removeToken } from "@/utils/authUtils";
import Image from "next/image";

interface Props {
  perfil: User;
}

export default function CorreoNoVerificado({ perfil }: Props) {
  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };
  return (
    <div
      className="fixed inset-0 w-screen h-screen background-login z-50 flex flex-col items-center justify-center backdrop-blur-sm text-center px-4"
      role="alert"
      aria-live="assertive"
    >
      <Image
        className="w-32 mb-4"
        src="/logo.png"
        alt="Logo de la aplicación"
        width={200}
        height={200}
        priority
      />
      <h1 className="text-2xl text-[#fc68b9] font-bold">
        Correo no verificado
      </h1>
      <p className="mt-2 text-base max-w-md">
        Por favor revisa tu buzón de correo o la carpeta de spam para verificar
        tu cuenta:
        <span className="font-semibold block mt-1 text-[#fc68b9]">
          {perfil.correo}
        </span>
      </p>
      <button className="mt-10 cursor-pointer" onClick={handleLogout}>
        <p className="text-[#FC68B9] text-sm font-semibold">Cerrar Sesión</p>
      </button>
    </div>
  );
}
