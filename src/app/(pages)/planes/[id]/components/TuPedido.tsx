import CorreoNoVerificado from "@/app/components/CorreoNoVerificado";
import {
  getPerfil,
  getPerfilRegistrarTarjeta,
} from "@/services/auth/auth.service";
import {
  postSuscripcion,
  postSuscripcionPaypal,
} from "@/services/auth/suscripcion.service";
import { User } from "@/interfaces/user.type";
import { planes } from "@/utils/planes";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPay from "@/app/components/LoadingPay";
import Loading from "@/app/components/Loading";

export default function TuPedido() {
  const params = useParams();
  const id = params?.id as string;
  const [perfil, setPerfil] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPay, setLoadingPay] = useState(false);

  // ✅ TODOS LOS useEffect TAMBIÉN DEBEN IR AQUÍ
  const productoFind = planes.find((p) => p.id === Number(id));

  const fetchPerfil = async () => {
    try {
      const res = await getPerfil();

      setPerfil(res.perfil);
    } catch (error) {
      console.error("Error cargando perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, [id]);

  const fetchPayment = async () => {
    if (productoFind) {
      setLoadingPay(true);
      try {
        await postSuscripcion(productoFind.id);

        const res = await getPerfilRegistrarTarjeta();

        setPerfil(res.perfil);
        window.location.href = res.url;
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoadingPay(false);
      }
    }
  };

  const fetchPaymentPaypal = async () => {
    if (productoFind) {
      setLoadingPay(true);

      try {
        const res = await postSuscripcionPaypal(productoFind.id);

        window.location.href = res.link_pago;
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoadingPay(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (perfil && perfil.emailVerified === false) {
    return <CorreoNoVerificado perfil={perfil} />;
  }

  return (
    <section
      className="w-1/2 min-w-[300px] h-full bg-white p-14 rounded-2xl flex flex-col justify-center items-start gap-14 max-sm:p-10 max-sm:w-full
    "
    >
      {loadingPay && <LoadingPay />}
      <h1 className="text-2xl font-bold text-[#68E1E0]">Tu pedido</h1>

      {/* Detalles del pedido */}
      <ul className="w-full space-y-4">
        <li className="text-[#8A8A8A] text-base font-semibold grid grid-cols-2 gap-10">
          <p>Producto</p>
          <p>{productoFind?.nombre_plan}</p>
        </li>
        <li className="text-[#8A8A8A] text-base font-semibold grid grid-cols-2 gap-10">
          <p>Subtotal</p>
          <p>${productoFind?.precio_plan.toFixed(2)}</p>
        </li>
        <li className="text-[#8A8A8A] text-base font-semibold grid grid-cols-2 gap-10">
          <p>Total</p>
          <p>${productoFind?.precio_plan.toFixed(2)}</p>
        </li>
      </ul>

      <p className="text-sm text-gray-600">
        Tus datos personales se utilizarán para procesar tu pedido, mejorar tu
        experiencia en esta web y otros propósito descritos en nuestra{" "}
        <span className="text-[#fc68b9] hover:underline">
          política de privacidad
        </span>
      </p>
      {/* {openForm && <FlowSubscribe token={tokenTarjeta} />} */}

      <div className="w-full flex flex-col justify-center items-center gap-4">
        <Button
          className="w-[270px] bg-white  text-[#596203ff] text-md  font-bold px-10 py-5 border-3 border-[#fa89c7] hover:bg-[#fc68b9] hover:border-[#fc68b9] hover:text-white shadow-rigth-yellow duration-500 flex flex-col items-center gap-2"
          radius="full"
          onPress={fetchPayment}
          // isDisabled={processingPayment}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Suscribirse</span>

            <Image
              src="/icons/flow.svg"
              alt="PayPal Logo"
              width={50}
              height={60}
              className="rounded-md"
            />
          </div>{" "}
        </Button>
        <Button
          className="w-[270px] bg-white  text-[#222D65] text-md  font-bold px-10 py-5 border-3 border-[#fa89c7] hover:bg-[#fc68b9] hover:border-[#fc68b9] hover:text-white shadow-rigth-yellow duration-500 flex flex-col items-center gap-2"
          radius="full"
          onPress={fetchPaymentPaypal}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Suscribirse</span>

            <Image
              src="/icons/paypal.svg"
              alt="PayPal Logo"
              width={80}
              height={70}
              className="rounded-md"
            />
          </div>
        </Button>
      </div>
    </section>
  );
}
