import Image from "next/image";

// components/Skeleton.tsx
export default function Loading() {
  return (
    <div
      className={`fixed top-0 left-0  w-screen h-screen background-login  z-50 flex items-center justify-center backdrop-blur-sm`}
    >
      <Image
        className="w-32 "
        src={"/logo.png"}
        alt="cargando"
        width={200}
        height={200}
      />
    </div>
  );
}
