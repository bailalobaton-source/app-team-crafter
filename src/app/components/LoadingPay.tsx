export default function LoadingPay() {
  return (
    <div className="fixed w-screen h-[100vh] bg-black/[0.7] top-0 left-0 z-[100] flex flex-col gap-2 items-center justify-center ">
      <p className="mt-6 text-2xl font-semibold text-white flex items-center gap-2">
        <span className="animate-pulse">🔒</span> Cargando pago seguro…
      </p>
    </div>
  );
}
