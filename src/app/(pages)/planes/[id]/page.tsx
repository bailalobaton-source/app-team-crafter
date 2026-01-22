"use client";

import PsAi from "@/app/components/PsAi";
import TuPedido from "./components/TuPedido";
import Link from "next/link";
import useSuscripcionStore from "@/stores/SuscripcionContext";
import { Button } from "@heroui/react";

export default function PlanId() {
  const { suscripcion } = useSuscripcionStore();

  return (
    <main className="relative w-full min-h-screen h-full p-10 py-14  flex gap-8 background-login max-sm:px-4">
      <Link href="/planes" className=" absolute left-10 top-10 z-10">
        <Button
          className="bg-[#FC68B9] text-white font-bold rounded-full"
          startContent={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.364 7.99932H1.63605"
                stroke="white"
                strokeWidth="2.57143"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.00001 14.3633L1.63605 7.99932L8.00001 1.63536"
                stroke="white"
                strokeWidth="2.57143"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Atras
        </Button>
      </Link>
      <div className="w-full  h-full max-w-[1440px] mx-auto flex   overflow-hidden max-sm:p-0 max-sm:flex-col-reverse">
        <PsAi />
        {suscripcion ? (
          <section
            className="m-auto w-1/2 min-w-[300px]  h-full bg-white rounded-2xl p-10  flex flex-col justify-center items-start  gap-14
          max-sm:w-full
          "
          >
            <h1 className="text-xl font-bold text-[#68E1E0] text-center">
              Ya cuenta con una suscripcion activa
            </h1>
            <Link
              href={"/"}
              className="color-pink m-auto text-base font-semibold"
            >
              Ir a inico
            </Link>
          </section>
        ) : (
          <TuPedido />
        )}
      </div>
    </main>
  );
}
