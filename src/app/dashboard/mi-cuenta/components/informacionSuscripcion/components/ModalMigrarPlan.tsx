"use client";

import { Plan } from "@/interfaces/plan.interface";
import { patchMigrarSuscripcion } from "@/services/auth/suscripcion.service";
import useSuscripcionStore, { Suscripcion } from "@/stores/SuscripcionContext";
import { handleAxiosError } from "@/utils/errorHandler";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { toast } from "sonner";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface Props {
  onOpenChange: (i: boolean) => void;
  isOpen: boolean;
  selectSuscripcion: Suscripcion;
  plan: Plan;
}

export default function ModalMigrarPlan({
  onOpenChange,
  isOpen,
  selectSuscripcion,
  plan,
}: Props) {
  const { forceRefetch } = useSuscripcionStore();
  const { language } = useLanguageStore();

  // 🌐 Traducciones
  const t = {
    es: {
      title: "Confirmar membresía de plan",
      message:
        "¿Estás seguro de que deseas migrar tu membresía al plan seleccionado?",
      cancel: "Cancelar",
      confirm: "Confirmar",
      success: "El plan se migró correctamente.",
    },
    en: {
      title: "Confirm plan membership",
      message:
        "Are you sure you want to migrate your membership to the selected plan?",
      cancel: "Cancel",
      confirm: "Confirm",
      success: "Plan successfully migrated.",
    },
  }[language];

  const handleMigrarPlan = async () => {
    try {
      const resData = await patchMigrarSuscripcion(selectSuscripcion.id, {
        planExternalId: plan.id,
      });
      if (resData.link_pago) {
        window.location.href = resData.link_pago;
      } else {
        toast.success(t.success);
        await forceRefetch();
      }
    } catch (err) {
      handleAxiosError(err);
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-[#8A8A8A] font-bold text-xl max-sm:text-xl">
              {t.title}
            </ModalHeader>
            <ModalBody>
              <p>
                {t.message}{" "}
                <strong className="text-[#FC68B9]">{plan.nombre_plan}</strong>?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {t.cancel}
              </Button>
              <Button
                className="bg-[#FC68B9]"
                color="primary"
                onPress={handleMigrarPlan}
              >
                {t.confirm}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
