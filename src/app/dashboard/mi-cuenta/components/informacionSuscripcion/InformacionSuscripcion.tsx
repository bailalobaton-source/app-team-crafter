"use client";

import { DatosCliente } from "@/interfaces/user.type";
import { getSuscripciones } from "@/services/auth/suscripcion.service";
import useSuscripcionStore, { Suscripcion } from "@/stores/SuscripcionContext";
import { handleAxiosError } from "@/utils/errorHandler";
import { formatDate } from "@/utils/formatDate";
import { planes } from "@/utils/planes";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import ModalMigrarPlan from "./components/ModalMigrarPlan";
import ModalCancelarSuscripcion from "./components/ModalCancelarSuscripcion";
import { Plan } from "@/interfaces/plan.interface";
import { useLanguageStore } from "@/stores/useLanguage.store";

export default function InformacionSuscripcion() {
  const { language } = useLanguageStore();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectModal, setSelectModal] = useState("");
  const [selectPlan, setSelectPlan] = useState<Plan>();
  const { suscripcion } = useSuscripcionStore();
  const [suscripciones, setSuscripciones] = useState<Suscripcion[]>([]);

  const gfindsuscripciones = useCallback(async () => {
    try {
      const res = await getSuscripciones();
      setSuscripciones(res.suscripciones);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    gfindsuscripciones();
  }, [getSuscripciones]);

  const planActivo = planes.find((p) => p.id === suscripcion?.plan_id);

  const planSuscripcion = (planExternalId: number) => {
    const planActivo = planes.find((p) => p.id === planExternalId);
    return planActivo;
  };

  const handleMigrarPlan = (plan: Plan) => {
    setSelectModal("migrarPlan");
    setSelectPlan(plan);
    onOpen();
  };

  const handleCancelarSuscripcion = () => {
    setSelectModal("cancelarSuscripcion");
    onOpen();
  };

  // 🌐 Traducciones
  const t = {
    es: {
      planInfo: "Información de plan",
      cancelMembership: "Cancelar membresía",
      migratePlan: "Migrar Plan",
      paymentMethod: "Método de pago",
      history: "Historial Suscripciones",
      plan: "Plan",
      price: "Precio",
      startDate: "Fecha inicio",
      endDate: "Fecha final",
      status: "Estado",
      noEndDate: "Sin fecha de finalización",
    },
    en: {
      planInfo: "Plan Information",
      cancelMembership: "Cancel membership",
      migratePlan: "Migrate Plan",
      paymentMethod: "Payment Method",
      history: "Subscription History",
      plan: "Plan",
      price: "Price",
      startDate: "Start Date",
      endDate: "End Date",
      status: "Status",
      noEndDate: "No end date",
    },
  }[language];

  return (
    <section className="w-full max-w-7xl mx-auto p-8 pb-24 flex flex-col gap-6 max-sm:px-0">
      {/* 🧾 Título e acción de cancelar */}
      <article className="w-full flex items-center justify-between gap-3">
        <h2 className="text-[#8A8A8A] font-bold text-2xl max-sm:text-xl">
          {t.planInfo}
        </h2>
        <button
          className="text-sm text-red-400 font-semibold underline cursor-pointer"
          onClick={handleCancelarSuscripcion}
        >
          {t.cancelMembership}
        </button>
      </article>

      {/* 💳 Planes disponibles */}
      <div className="w-full flex flex-col gap-3">
        {planes.map((plan) => (
          <div key={plan.id} className="w-full flex flex-col items-end gap-0.5">
            {planActivo?.id !== plan.id && (
              <button
                className="text-sm text-[#FC68B9] font-semibold underline cursor-pointer"
                onClick={() => handleMigrarPlan(plan)}
              >
                {t.migratePlan}
              </button>
            )}
            <article
              className={`w-full p-4 px-5 ${
                planActivo?.id === plan.id
                  ? "border-3 border-[#FC68B9] text-[#8A8A8A]"
                  : "border-2 border-[#C5C5C5] text-[#C5C5C5]"
              } rounded-2xl flex justify-between`}
            >
              <div className="flex flex-col justify-between">
                <span
                  className={`w-6 h-6 rounded-full ${
                    planActivo?.id === plan.id ? "border-7" : "border-2"
                  } border-[#FC68B9]`}
                />
                <Button
                  className={`${
                    planActivo?.id === plan.id ? "bg-[#FC68B9]" : "bg-[#C5C5C5]"
                  } text-white text-lg font-black px-7 max-sm:text-sm max-sm:px-4`}
                  radius="full"
                >
                  {plan.nombre_plan}
                </Button>
              </div>
              <div className="flex flex-col gap-2 text-end">
                <h3 className="text-3xl font-medium max-sm:text-2xl">
                  ${plan.precio_plan} USD
                </h3>
                <h4 className="font-bold max-sm:text-sm">{plan.titulo}</h4>
                <p
                  className={`${
                    planActivo?.id === plan.id
                      ? "text-[#FC68B9]"
                      : "text-[#C5C5C5]"
                  } text-sm font-semibold max-sm:text-xs`}
                >
                  {plan.descripcion}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* 💰 Método de pago
      <h2 className="text-[#8A8A8A] font-bold text-2xl mt-4 max-sm:text-xl">
        {t.paymentMethod}
      </h2> */}

      {/* 📜 Historial de suscripciones */}
      <h2 className="text-[#8A8A8A] font-bold text-2xl mt-4 max-sm:text-xl">
        {t.history}
      </h2>

      <Table aria-label="Subscription table" classNames={{ wrapper: "p-1" }}>
        <TableHeader>
          <TableColumn>{t.plan}</TableColumn>
          <TableColumn>{t.price}</TableColumn>
          <TableColumn>{t.startDate}</TableColumn>
          <TableColumn>{t.endDate}</TableColumn>
          <TableColumn>{t.status}</TableColumn>
        </TableHeader>

        <TableBody>
          {suscripciones.map((suscripcion, index) => (
            <TableRow key={index}>
              <TableCell>
                {planSuscripcion(suscripcion.plan_id)?.nombre_plan}
              </TableCell>
              <TableCell>
                ${planSuscripcion(suscripcion.plan_id)?.precio_plan.toFixed(2)}
              </TableCell>
              <TableCell>{formatDate(suscripcion.startDate)}</TableCell>
              <TableCell>
                {suscripcion.endDate
                  ? formatDate(suscripcion.endDate)
                  : t.noEndDate}
              </TableCell>
              <TableCell>{suscripcion.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 🧩 Modales */}
      {suscripcion && selectPlan && selectModal === "migrarPlan" && (
        <ModalMigrarPlan
          key={suscripcion.subscriptionId}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          selectSuscripcion={suscripcion}
          plan={selectPlan}
        />
      )}

      {suscripcion && selectModal === "cancelarSuscripcion" && (
        <ModalCancelarSuscripcion
          key={suscripcion.subscriptionId}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          selectSuscripcion={suscripcion}
        />
      )}
    </section>
  );
}
