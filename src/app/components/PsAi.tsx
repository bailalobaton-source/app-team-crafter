import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function PsAi() {
  return (
    <section className=" relative w-1/2  h-full   max-md:w-full max-md:h-auto overflow-hidden ">
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
      <div
        className={`fixed w-1/2 pr-4  h-full top-0   left-0  flex flex-col items-center justify-center  max-md:relative max-md:w-full`}
      >
        <Image
          className="w-auto h-[75vh]  max-sm:h-auto"
          src="/PsAi.png"
          alt="ps y ai"
          width={800}
          height={800}
        />
        <Image
          className="px-6 w-auto h-[45] max-sm:h-auto"
          src="/compatibleCon.png"
          alt="ps y ai"
          width={800}
          height={800}
        />
      </div>
    </section>
  );
}
