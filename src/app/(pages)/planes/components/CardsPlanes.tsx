import { planes } from "@/utils/planes";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CardsPlanes() {
  const router = useRouter();

  return (
    <section className="w-full flex items-end justify-center gap-10 mt-20 max-sm:flex-col">
      {planes.map((plan) => (
        <article
          key={plan.id}
          style={{
            backgroundColor: plan.color_card,
            borderColor: plan.color_principal,
            boxShadow: `10px 10px 0px 0px ${plan.color_principal}`,
          }}
          className="w-full max-w-[360px] relative text-center p-[30px] rounded-[86px] border-[5px] overflow-hidden cursor-pointer"
          onClick={() => {
            router.push(`/planes/${plan.id}`);
          }}
        >
          <div className="space-y-3">
            <h2
              style={{ backgroundColor: plan.color_principal }}
              className="mx-auto w-fit py-2 px-7 text-white text-lg font-black rounded-full"
            >
              {plan.nombre_plan}
            </h2>
            <span
              style={{ color: plan.color_text }}
              className="block text-4xl font-medium"
            >
              ${plan.precio_plan} USD
            </span>
            <h3
              style={{ color: plan.color_text }}
              className="text-[17px] font-bold "
            >
              {plan.titulo}
            </h3>
            <p
              style={{
                color: plan.id === 1 ? "#EDD558" : plan.color_principal,
              }}
              className="font-bold"
            >
              {plan.descripcion}
            </p>
            <Button
              className={`text-xl font-semibold px-8 py-5 border-3 duration-500 transition-all ${"bg-[#fc68b9] text-[#ffee97] border-[#FFEE97] hover:bg-[#fc68b9] hover:border-[#FFEE97] hover:text-[#ffee97] shadow-rigth-yellow cursor-pointer"}`}
              radius="full"
              type="submit"
            >
              Suscríbete
            </Button>
          </div>
          <div
            className={`relative ${
              plan.id === 3 ? "h-[380px]" : "h-[300px]"
            }  w-full `}
          >
            {plan.id === 3 && (
              <Image
                className="absolute -right-2 w-32 top-4"
                src={"/planes/1mes.svg"}
                alt={plan.nombre_plan}
                width={500}
                height={500}
              />
            )}
            <span className="absolute -right-24 -bottom-20 flex w-[361px] h-[361px] bg-white rounded-full" />
            <img
              className={`absolute z-10 ${
                plan.id === 3 ? "min-w-[330px]" : "w-full"
              }  bottom-[-30px] -right-10 `}
              src={plan.ruta_img}
              alt={plan.nombre_plan}
              width={500}
              height={500}
            />
          </div>
        </article>
      ))}
    </section>
  );
}
