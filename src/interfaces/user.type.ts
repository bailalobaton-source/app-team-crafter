export type User = {
  id: string;
  foto_perfil?: string | null;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  codigo_pais: string;
  zona_horaria?: string | null;
  dni_id_ce: string | null;
  reset_password: string;
  status: "active" | "disabled";
  emailVerified: boolean;
  videoPresentacion: boolean;
};

export interface DatosCliente {
  created: string; // "2025-09-02 16:30:43"
  creditCardType: string; // "MASTERCARD"
  customerId: string; // "cus_b36aee149a"
  email: string; // "kechuvega2@gmail.com"
  externalId: string; // "14016faa-566e-4923-9346-2748915665e6"
  last4CardDigits: string; // "0769"
  name: string; // "Emerson Wilson"
  pay_mode: string; // "auto"
  registerDate: string; // "2025-09-04 01:07:49"
  status: number; // 1
}
