"use client";

import { usePerfilStore } from "@/stores/perfil.store";
import useSuscripcionStore from "@/stores/SuscripcionContext";
import { removeToken } from "@/utils/authUtils";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { PiTextItalicDuotone } from "react-icons/pi";
import { RiArrowDownSLine } from "react-icons/ri";

export default function HeaderPlanes() {
  const perfil = usePerfilStore((state) => state.perfil);
  const { suscripcion } = useSuscripcionStore();

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };
  return (
    <header className=" w-screen h-[80px] px-20 bg-[#fc68b9] flex items-center justify-between max-sm:px-4">
      <Link href={"/dashboard/inicio"}>
        <Image
          className="h-[54px] w-auto flex-shrink-0"
          src="/logo.png"
          alt="Logo PS y AI"
          width={200}
          height={54}
          priority
        />
      </Link>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Dropdown
          classNames={{
            base: "before:bg-[#FFE1F2]",
            content:
              "bg-[#FFE1F2] min-w-[200px] shadow-lg border border-[#ffcce9]",
          }}
        >
          <DropdownTrigger>
            <div className="flex items-center text-white gap-2 cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-105">
              <Image
                className="h-[40px] w-[40px] border-2 border-[#68E1E0] rounded-full object-cover transition-all duration-200"
                src={
                  perfil?.foto_perfil
                    ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${perfil.foto_perfil}`
                    : "/icons/user.svg"
                }
                alt="Avatar usuario"
                width={40}
                height={40}
              />
              <p className="text-base font-bold hidden max-sm:block">
                Natalia Tobar
              </p>
              <RiArrowDownSLine className="text-2xl transition-transform duration-200 group-hover:rotate-180 max-md:hidden" />
            </div>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Menú de usuario"
            variant="flat"
            itemClasses={{
              base: ["rounded-t-xs"],
            }}
          >
            {suscripcion && (
              <DropdownItem
                key="mi-cuenta"
                className="group px-4 py-1 data-[hover=true]:bg-transparent rounded-lg mx-2 my-1 transition-all duration-200"
                startContent={
                  <div className="w-8 h-8 rounded-lg bg-[#ffcce9] group-hover:bg-[#FC68B9] p-1.5 flex items-center justify-center">
                    <Image
                      className="h-[24px] w-[24px]"
                      src="/icons/miCuenta.svg"
                      alt="Mi cuenta"
                      width={24}
                      height={24}
                    />
                  </div>
                }
              >
                <Link
                  href="/dashboard/mi-cuenta"
                  className="text-[#FC68B9] text-base font-semibold w-full block"
                >
                  Mi cuenta
                </Link>
              </DropdownItem>
            )}

            {suscripcion && (
              <DropdownItem
                key="favoritos"
                className="px-4 py-1 data-[hover=true]:bg-transparent rounded-lg mx-2 my-1 transition-all duration-200"
                startContent={
                  <div className="w-8 h-8 rounded-lg bg-[#ffcce9] group-hover:bg-[#FC68B9] p-1.5 flex items-center justify-center">
                    <Image
                      className="h-[22px] w-[22px]"
                      src="/icons/favoritos-white.svg"
                      alt="Mi cuenta"
                      width={24}
                      height={24}
                    />
                  </div>
                }
              >
                <Link
                  href="/dashboard/favoritos"
                  className="text-[#FC68B9] text-base font-semibold w-full block"
                >
                  Favoritos
                </Link>
              </DropdownItem>
            )}

            <DropdownItem
              key="cerrar-sesion"
              onClick={handleLogout}
              className="px-4 py-1 data-[hover=true]:bg-transparent rounded-lg mx-2 my-1 transition-all duration-200"
              startContent={
                <div className="w-8 h-8 rounded-lg bg-[#ffcce9] group-hover:bg-[#FC68B9] p-1.5 flex items-center justify-center">
                  <Image
                    className="h-[24px] w-[24px]"
                    src="/icons/cerrarSesion.svg"
                    alt="Cerrar sesión"
                    width={24}
                    height={24}
                  />
                </div>
              }
            >
              <span className="text-[#FC68B9] text-base font-semibold">
                Cerrar Sesión
              </span>
            </DropdownItem>
            {/* <DropdownItem
              key="favoritos"
              className="px-4 py-1 data-[hover=true]:bg-transparent rounded-lg mx-2 my-1 transition-all duration-200"
            >
              <Select
                className="max-w-xs"
                defaultSelectedKeys={["cat"]}
                label="Favorite Animal"
                placeholder="Select an animal"
                startContent={<PiTextItalicDuotone />}
              >
                <SelectItem key="Español">Español</SelectItem>
              </Select>
            </DropdownItem> */}
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
