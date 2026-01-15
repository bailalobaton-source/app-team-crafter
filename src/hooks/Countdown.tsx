import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useLanguageStore } from "@/stores/useLanguage.store";

interface CountdownProps {
  fechaCaducidad: string;
  onDelete?: () => void;
}

export function useCountdown(fechaCaducidad: string, onDelete?: () => void) {
  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const { language } = useLanguageStore();

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
      setCountdown(language === "es" ? "Caducado" : "Expired");
      if (!isExpired) {
        setIsExpired(true);
        onDelete?.();
      }
      return;
    }

    const diffDays = differenceInDays(caducidad, nowPeru);

    if (diffDays >= 1) {
      setCountdown(
        `${language === "es" ? "Caduca" : "Expires"} ${
          language === "es" ? "en" : "in"
        } ${diffDays} ${language === "es" ? "día" : "day"}${
          diffDays > 1 ? "s" : ""
        }`
      );
    } else {
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

      setCountdown(
        `${language === "es" ? "Caduca" : "Expires"} ${
          language === "es" ? "en" : "in"
        } ${hours}:${minutes}:${seconds}`
      );
    }
  };

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [fechaCaducidad, isExpired, language]); // ✅ Agregado 'language'

  return { countdown, isExpired, language };
}

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
