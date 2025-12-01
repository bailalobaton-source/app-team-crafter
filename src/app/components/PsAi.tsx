import Image from "next/image";

export default function PsAi() {
  return (
    <section className=" relative w-1/2  h-full   max-md:w-full max-md:h-auto overflow-hidden ">
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
