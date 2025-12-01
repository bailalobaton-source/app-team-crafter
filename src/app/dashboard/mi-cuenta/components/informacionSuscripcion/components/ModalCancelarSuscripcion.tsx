"use client";

import { cancelarSuscripcion } from "@/services/auth/suscripcion.service";
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
}

export default function ModalCancelarSuscripcion({
  onOpenChange,
  isOpen,
  selectSuscripcion,
}: Props) {
  const { forceRefetch } = useSuscripcionStore();
  const { language } = useLanguageStore();

  // 🌐 Traducciones
  const t = {
    es: {
      title: "Cancelar membresía",
      message: "¿Estás seguro de que deseas cancelar tu membresía?",
      cancel: "Cancelar",
      confirm: "Confirmar",
      success: "La membresía ha sido cancelada con éxito",
    },
    en: {
      title: "Cancel membership",
      message: "Are you sure you want to cancel your membership?",
      cancel: "Cancel",
      confirm: "Confirm",
      success: "Membership has been successfully canceled",
    },
  }[language];

  const handleCancelarPlan = async () => {
    try {
      await cancelarSuscripcion(selectSuscripcion.id);
      toast.success(t.success);
      await forceRefetch();
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
              <p>{t.message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {t.cancel}
              </Button>
              <Button
                className="bg-[#FC68B9]"
                color="primary"
                onPress={handleCancelarPlan}
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
