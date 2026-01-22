"use client";

import { Suspense } from "react";
import PsAi from "../../components/PsAi";
import FormCambiarPassword from "./components/FormCambiarPassword";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import { Button } from "@heroui/react";

function NuevoPassword() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login max-sm:h-auto max-sm:py-10 ">
      <div className="relative w-full min-h-screen h-full  max-w-[1440px] m-auto flex  p-12 overflow-hidden max-sm:flex-col-reverse max-sm:p-4 gap-10">
        <Link href="/" className=" absolute left-0 top-0 z-10">
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
        <FormCambiarPassword />
      </div>
    </main>
  );
}

export default function NuevoPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NuevoPassword />
    </Suspense>
  );
}
