import { Spinner } from "@heroui/react";

// components/Skeleton.tsx
export default function LoadingTransparente() {
  return (
    <div className="fixed w-screen h-[100vh] bg-black/[0.7] top-0 left-0 z-[100] flex flex-col gap-2 items-center justify-center ">
      <Spinner color="warning" label="Cargando" labelColor="warning" />
    </div>
  );
}
