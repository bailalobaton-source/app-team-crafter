"use client";
// stores/suscripcionStore.ts
import { create } from "zustand";
import { getSuscripcion } from "@/services/auth/suscripcion.service";
import { useEffect, useCallback } from "react";

// 🟢 Enum de estados de suscripción
export enum SubscriptionStatus {
  ACTIVE = "activa",
  PENDING = "pendiente", // ajusta si tu backend usa otro significado
  TRIAL = "expirada", // ajusta si aplica
  CANCELED = "cancelada",
}

interface Plan {
  id: number;
  nombre_plan: string;
  precio_plan: number;
  status: string;
}

export interface Suscripcion {
  id: number;
  subscriptionId: string;
  status: string; // ahora validamos con SubscriptionStatus
  planExternalId: string;
  period_start: string;
  period_end: string;
  precio: number;
  user_id: string;
  plan: Plan;
  customerId: string;
  plan_id: number;
  startDate: string;
  endDate: string;
}

interface SuscripcionState {
  // Estado
  suscripcion: Suscripcion | null;
  isLoading: boolean;
  isInitialLoading: boolean;
  message: string;
  error: string | null;
  lastUpdated: number | null;
  refetchInterval: NodeJS.Timeout | null;

  // Getters computados
  isPremium: boolean;
  planName: string;
  isExpired: boolean;
  daysRemaining: number;
  needsUrgentRefetch: boolean;

  // Acciones
  setSuscripcion: (suscripcion: Suscripcion | null) => void;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string) => void;
  setError: (error: string | null) => void;
  fetchSuscripcion: (force?: boolean) => Promise<void>;
  clearSuscripcion: () => void;

  // Estrategias de refetch
  startSmartRefetch: () => void;
  stopRefetch: () => void;
  forceRefetch: () => Promise<void>;
  refreshIfNeeded: () => Promise<void>;
}

const useSuscripcionStore = create<SuscripcionState>((set, get) => ({
  // Estado inicial
  suscripcion: null,
  isLoading: false,
  isInitialLoading: true,
  message: "",
  error: null,
  lastUpdated: null,
  refetchInterval: null,

  // ✅ Getters computados corregidos
  get isPremium() {
    const { suscripcion, isExpired } = get();
    if (!suscripcion) return false;

    // Solo es premium si está ACTIVA y no expirada
    return suscripcion.status === SubscriptionStatus.ACTIVE && !isExpired;
  },

  get planName() {
    const { suscripcion } = get();
    return suscripcion?.plan?.nombre_plan || "";
  },

  get isExpired() {
    const { suscripcion } = get();
    if (!suscripcion) return true;
    const period_end = new Date(suscripcion.period_end);
    const now = new Date();
    return period_end < now;
  },

  get daysRemaining() {
    const { suscripcion } = get();
    if (!suscripcion) return 0;
    const period_end = new Date(suscripcion.period_end);
    const now = new Date();
    const days = Math.ceil(
      (period_end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, days);
  },

  get needsUrgentRefetch() {
    const { daysRemaining } = get();
    return daysRemaining <= 7 && daysRemaining > 0;
  },

  // Acciones básicas
  setSuscripcion: (suscripcion) => {
    set({
      suscripcion,
      lastUpdated: Date.now(),
      error: null,
      isInitialLoading: false,
    });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setMessage: (message) => set({ message }),
  setError: (error) => set({ error }),

  fetchSuscripcion: async (force = false) => {
    const { setLoading, setSuscripcion, setMessage, setError, lastUpdated } =
      get();

    if (get().isLoading && !force) return;

    const now = Date.now();
    const cacheTime = 2 * 60 * 1000; // 2 min
    if (!force && lastUpdated && now - lastUpdated < cacheTime) return;

    try {
      setLoading(true);
      setError(null);

      const response = await getSuscripcion();

      setSuscripcion(response.suscripcionActiva);
      setMessage(response.msg);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al obtener suscripción";
      setError(errorMessage);

      if (
        error instanceof Error &&
        (error.message.includes("network") || error.message.includes("fetch"))
      ) {
        setMessage("Error de conexión - usando datos en caché");
      } else {
        setSuscripcion(null);
        setMessage("");
      }
    } finally {
      setLoading(false);
      set({ isInitialLoading: false });
    }
  },

  clearSuscripcion: () => {
    const { stopRefetch } = get();
    stopRefetch();
    set({
      suscripcion: null,
      message: "",
      error: null,
      lastUpdated: null,
      isLoading: false,
      isInitialLoading: true,
    });
  },

  // Estrategia de refetch inteligente
  startSmartRefetch: () => {
    const { stopRefetch, refreshIfNeeded } = get();
    stopRefetch();

    const runRefetch = async () => {
      const { needsUrgentRefetch, suscripcion } = get();

      if (!suscripcion) {
        await refreshIfNeeded();
        return;
      }

      const intervalTime = needsUrgentRefetch
        ? 5 * 60 * 1000 // 5 min si quedan pocos días
        : 30 * 60 * 1000; // 30 min normal

      await refreshIfNeeded();

      const nextTimeout = setTimeout(runRefetch, intervalTime);
      set({ refetchInterval: nextTimeout as unknown as NodeJS.Timeout });
    };

    runRefetch();
  },

  stopRefetch: () => {
    const { refetchInterval } = get();
    if (refetchInterval) {
      clearInterval(refetchInterval);
      set({ refetchInterval: null });
    }
  },

  forceRefetch: async () => {
    const { fetchSuscripcion } = get();
    await fetchSuscripcion(true);
  },

  refreshIfNeeded: async () => {
    const { lastUpdated, fetchSuscripcion, needsUrgentRefetch } = get();
    const now = Date.now();

    const cacheTime = needsUrgentRefetch ? 2 * 60 * 1000 : 10 * 60 * 1000;

    if (!lastUpdated || now - lastUpdated > cacheTime) {
      await fetchSuscripcion();
    }
  },
}));

// Hook personalizado para manejo automático del refetch
export const useAutoRefetch = () => {
  const startSmartRefetch = useSuscripcionStore(
    (state) => state.startSmartRefetch
  );
  const stopRefetch = useSuscripcionStore((state) => state.stopRefetch);
  const refreshIfNeeded = useSuscripcionStore((state) => state.refreshIfNeeded);

  const initAutoRefetch = useCallback(() => {
    startSmartRefetch();
  }, [startSmartRefetch]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      refreshIfNeeded();
    }
  }, [refreshIfNeeded]);

  useEffect(() => {
    initAutoRefetch();
    return () => stopRefetch();
  }, [initAutoRefetch, stopRefetch]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
};

export default useSuscripcionStore;
