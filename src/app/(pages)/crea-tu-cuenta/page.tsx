"use client";
import Link from "next/link";
import PsAi from "../../components/PsAi";
import MetodosRegistro from "./components/MetodosRegistro";
import { Button } from "@heroui/react";

export default function CreaTuCuenta() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login  max-md:h-auto ">
      <div className="relative w-full min-h-screen h-full  max-w-[1440px] mx-auto flex    p-12 max-md:flex-col-reverse  max-md:p-4 max-md:py-10 max-md:gap-10 max-md:h-auto">
        <Link href="/planes" className=" absolute left-0 top-0 z-10">
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
        <PsAi />
        <MetodosRegistro />
      </div>
    </main>
  );
}
