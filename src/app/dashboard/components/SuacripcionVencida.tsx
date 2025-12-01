import { removeToken } from "@/utils/authUtils";
import { Link } from "@heroui/react";
import Image from "next/image";

export default function SuscripcionVencida() {
  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };
  return (
    <div
      className={`fixed  w-screen h-screen bg-[#FC68B94D] z-[100] flex items-center justify-center backdrop-blur-sm`}
    >
      <section className="w-full max-w-xl bg-white py-10 px-6  rounded-2xl flex flex-col  items-center gap-6 text-center">
        <Image
          className="w-16"
          src={"/icons/advertencia.svg"}
          alt="cuenta suspendida"
          width={200}
          height={200}
        />
        <h2 className="text-4xl text-[#FC68B9] font-black text-nowrap">
          Suscripción vencida
        </h2>
        <p className="text-lg text-[#8A8A8A] font-medium">
          Tu suscripción ha vencido. Para seguir disfrutando del contenido
          exclusivo, renuévala ahora.
        </p>
        <Link
          href={"/planes"}
          className="w-fit  bg-[#fc68b9] text-white text-lg font-semibold px-10 py-2 border-5 border-[#fc68b9] rounded-full hover:bg-[#fc68b9] hover:border-[#fc68b9] hover:text-[#ffee97] shadow-rigth-yellow duration-500"
        >
          Suscribirme{" "}
        </Link>
        <button
          onClick={handleLogout}
          className="text-[#FC68B9] text-base font-semibold cursor-pointer"
        >
          Cerrar Sesión
        </button>
      </section>
    </div>
  );
}
