import { Foro } from "@/interfaces/foro.interface";
import { useDisclosure } from "@heroui/react";
import { useState } from "react";
import ModalForoSelect from "./components/ModalForoSelect";
import CardForo from "./components/CardForo";
// import ModalForoSelect from "./components/ModalForoSelect";

interface Props {
  foros: Foro[];
}

export default function ForosPublicados({ foros }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectForo, setSelectForo] = useState<Foro | null>(null);
  const [colorForo, setColorForo] = useState<string>("");

  return (
    <section className="flex flex-col gap-4">
      {foros.map((foro, index) => (
        <CardForo
          key={foro.id}
          foro={foro}
          index={index}
          setSelectForo={setSelectForo}
          onOpen={onOpen}
          setColorForo={setColorForo}
        />
      ))}
      {selectForo && (
        <ModalForoSelect
          key={selectForo.id}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          selectForo={selectForo}
          colorForo={colorForo}
        />
      )}
    </section>
  );
}
