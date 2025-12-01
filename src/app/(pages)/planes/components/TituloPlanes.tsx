export default function TituloPlanes() {
  return (
    <section className="w-full flex flex-col gap-6">
      <h1
        className="relative  m-auto w-fit text-6xl font-black text-[#96EAEA] flex items-center  justify-center uppercase
      max-sm:text-4xl
      "
      >
        Elige el plan <br />
        <strong
          className="absolute -bottom-13 text-[86px] text-[#FC68B9] font-[LearningCurve] normal-case
        max-sm:text-5xl max-sm:-bottom-8
        "
        >
          perfecto para ti
        </strong>
      </h1>
    </section>
  );
}
