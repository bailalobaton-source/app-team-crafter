import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

interface CountdownProps {
  fechaCaducidad: string; // formato "YYYY-MM-DD"
  onDelete?: () => void; // opcional
}

// Hook que devuelve countdown y estado de expiración
export function useCountdown(fechaCaducidad: string, onDelete?: () => void) {
  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  const getPeru = () => {
    const now = new Date();
    const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    return new Date(utc.getTime() - 5 * 60 * 60 * 1000);
  };

  const updateCountdown = () => {
    const nowPeru = getPeru();
    const caducidad = new Date(fechaCaducidad + "T23:59:59");

    const diffMs = caducidad.getTime() - nowPeru.getTime();

    if (diffMs <= 0) {
      setCountdown("Caducado");
      if (!isExpired) {
        setIsExpired(true);
        onDelete?.();
      }
      return;
    }

    const diffDays = differenceInDays(caducidad, nowPeru);

    if (diffDays >= 1) {
      // 👈 Mostrar SIEMPRE en días exactos
      setCountdown(`Caduca en ${diffDays} día${diffDays > 1 ? "s" : ""}`);
    } else {
      // 👈 Si falta menos de un día → reloj hh:mm:ss
      const hours = String(differenceInHours(caducidad, nowPeru)).padStart(
        2,
        "0"
      );
      const minutes = String(
        differenceInMinutes(caducidad, nowPeru) % 60
      ).padStart(2, "0");
      const seconds = String(
        differenceInSeconds(caducidad, nowPeru) % 60
      ).padStart(2, "0");

      setCountdown(`Caduca en ${hours}:${minutes}:${seconds}`);
    }
  };

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [fechaCaducidad, isExpired]);

  return { countdown, isExpired };
}

// Componente visual
export default function Countdown({
  fechaCaducidad,
  onDelete,
}: CountdownProps) {
  const { countdown } = useCountdown(fechaCaducidad, onDelete);

  return (
    <span className="w-full p-1 flex items-center justify-center text-base font-bold rounded-full">
      {countdown}
    </span>
  );
}
