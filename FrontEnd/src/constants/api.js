// Configuration pour l'environnement
const isProduction = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

// URL du backend selon l'environnement
export const BASE_URL =
  isProduction || isVercel
    ? "https://memoramagnetbackend.vercel.app/"
    : "http://localhost:4001/";

export const authAPI = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "auth/logout",
  VERIFY_EMAIL: "/auth/verify-email",
  SEND_VERIFICATION_EMAIL: "/auth/send-verification-email",
  REFRESH_TOKEN: "/auth/refresh-tokens",
  RESET_PASSWORD: "/auth/reset-password",
  FORGOT_PASSWORD: "/auth/forgot-password",
  ME: "/auth/me",
  UPDATE: "/auth/update",
};
