"use client";
import { Snippet } from "@heroui/react";
import { useLanguageStore } from "@/stores/useLanguage.store";

export const CopyIcon = () => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="40" height="40" rx="11" fill="#FFB4DF" />
      <path
        d="M25.5 21.9V24.9C25.5 28.9 23.9 30.5 19.9 30.5H16.1C12.1 30.5 10.5 28.9 10.5 24.9V21.1C10.5 17.1 12.1 15.5 16.1 15.5H19.1"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.5001 21.9H22.3001C19.9001 21.9 19.1001 21.1 19.1001 18.7V15.5L25.5001 21.9Z"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.1001 10.5H24.1001"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 13.5C15.5 11.84 16.84 10.5 18.5 10.5H21.12"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.4999 16.5V22.69C30.4999 24.24 29.2399 25.5 27.6899 25.5"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.5 16.5H27.5C25.25 16.5 24.5 15.75 24.5 13.5V10.5L30.5 16.5Z"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export interface Descuento {
  id: number;
  valor_descuento: number;
  tipo_descuento: string;
  titulo_descuento: string;
  descripcion_descuento: string;
  fecha_expiracion: string;
  codigo_descuento: string;
}

interface Props {
  descuento: Descuento;
}

export default function CardDescuento({ descuento }: Props) {
  const { language } = useLanguageStore();

  // 🌐 Traducciones
  const t = {
    es: {
      discountLabel: "DSCTO",
      expiration: "Fecha de expiración",
      valid: "Cupón válido en nuestra web: glorialobatonarchivos.com",
      code: "Código:",
    },
    en: {
      discountLabel: "OFF",
      expiration: "Expiration date",
      valid: "Coupon valid on our website: glorialobatonarchivos.com",
      code: "Code:",
    },
  }[language];

  return (
    <article className="w-full relative flex overflow-hidden max-sm:flex-col">
      <span className="absolute -top-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white z-10" />
      <span className="absolute -bottom-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white z-10" />
      <span className="absolute -bottom-[18px] -left-[18px] w-[36px] h-[36px] rounded-full bg-white z-10" />

      {/* LADO IZQUIERDO */}
      <div className="relative w-[220px] h-[185px] bg-[#68E1E0] flex flex-col items-center justify-center text-white z-10 max-sm:w-full">
        <span className="absolute -top-[18px] -left-[18px] w-[36px] h-[36px] rounded-full bg-white" />
        <span className="absolute -top-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white" />
        <span className="absolute -bottom-[18px] -left-[18px] w-[36px] h-[36px] rounded-full bg-white" />
        <span className="absolute -bottom-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white" />
        <h3 className="text-5xl font-bold">
          {descuento.tipo_descuento === "efectivo"
            ? `$ ${descuento.valor_descuento}`
            : `${descuento.valor_descuento}%`}
        </h3>
        <h5 className="text-2xl font-bold">{t.discountLabel}</h5>
      </div>

      {/* LADO DERECHO */}
      <div className="relative w-full h-[185px] bg-white border-2 border-[#68E1E0] flex items-center justify-between gap-6 text-[#8A8A8A] overflow-hidden p-6 max-sm:flex-col max-sm:h-auto">
        <span className="absolute -top-[18px] -left-[18px] w-[36px] h-[36px] rounded-full bg-white border-2 border-[#68E1E0]" />
        <span className="absolute -top-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white border-2 border-[#68E1E0]" />
        <span className="absolute -bottom-[18px] -left-[18px] w-[36px] h-[36px] rounded-full bg-white border-2 border-[#68E1E0]" />
        <span className="absolute -bottom-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white border-2 border-[#68E1E0]" />

        <article className="flex flex-col max-sm:text-center">
          <h3 className="text-2xl font-bold">{descuento.titulo_descuento}</h3>
          <p className="text-lg">{descuento.descripcion_descuento}</p>
          <span className="text-[14px] font-bold mt-2">
            {t.expiration}: {descuento.fecha_expiracion}
          </span>
          <span className="text-[14px] font-medium">{t.valid}</span>
        </article>

        <article className="flex flex-col items-center justify-center gap-1.5">
          <h3 className="text-[#FC68B9]">{t.code}</h3>
          <Snippet
            className="bg-[#FC68B9]"
            size="lg"
            symbol=""
            copyIcon={<CopyIcon />}
          >
            <p className="font-bold text-white tracking-wide">
              {descuento.codigo_descuento}
            </p>
          </Snippet>
        </article>
      </div>
    </article>
  );
}
