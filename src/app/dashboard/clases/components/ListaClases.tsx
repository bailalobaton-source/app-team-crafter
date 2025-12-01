"use client";
import { Clase } from "@/interfaces/clase.interface";
import { cn, Pagination, PaginationItemType } from "@heroui/react";
import type { PaginationItemRenderProps } from "@heroui/react";
import Image from "next/image";
import CardClases from "../../components/CardClases";

interface Props {
  clases: Clase[];
}

export default function ListaClases({ clases }: Props) {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className="bg-default-200/50 min-w-8 w-8 h-8 hidden"
          onClick={onNext}
        >
          -
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className="bg-default-200/50 min-w-8 w-8 h-8 hidden"
          onClick={onPrevious}
        >
          -
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          "relative  min-w-[40px] min-h-[40px] text-[#68E1E0] font-black text-xl flex items-center justify-center  cursor-pointer ",
          isActive && "text-white "
        )}
        onClick={() => setPage(value)}
      >
        {isActive && (
          <Image
            className="absolute  min-w-[38px] min-h-[38px]"
            src="/icons/starPage.svg"
            alt=" select page"
            width={20}
            height={20}
          />
        )}
        <p className="z-10">{value}</p>
      </button>
    );
  };

  return (
    <section className="w-full flex flex-col items-center gap-8 pt-10">
      <div className="w-full grid grid-cols-4 gap-[20px] max-2xl:grid-cols-3   max-md:grid-cols-2  max-sm:flex max-sm:flex-col max-sm:gap-[50px] ">
        {clases.map((clase, index) => (
          <div className="w-full" key={index}>
            <CardClases clase={clase} width="w-full" />
          </div>
        ))}
      </div>
      <Pagination
        disableCursorAnimation
        showControls
        className="gap-4 mt-8"
        initialPage={1}
        renderItem={renderItem}
        total={1}
        boundaries={3}
        variant="light"
      />
    </section>
  );
}
