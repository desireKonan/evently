import type { User } from "@/app/model/user.model";
import type { SignUpFormData } from "@/app/schema/auth.schema";
import httpService from "@/app/service/http.service";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignUpFormData) => Promise<string>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,

        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null });

          try {
            // Appel à votre API de connexion
            const response = await httpService.post('/auth/login', {
              email, password
            });

            if (response.status !== 200) {
              throw new Error(response.request.error || "Erreur de connexion");
            }

            const { accessToken, refreshToken, expiresDate, ...user } = response.data as unknown as any;

            // Stockage des données d'authentification
            set({
              user,
              isLoading: false,
              error: null,
            });

            // Stockage dans le localStorage si nécessaire
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", accessToken);
            localStorage.setItem("expiredAt", expiresDate);

            set({
              isAuthenticated: !!localStorage.getItem('accessToken') && !!user,
            });
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Une erreur est survenue",
            });
          }
        },

        signup: async (data: SignUpFormData) => {
          set({ isLoading: true, error: null });

          try {
            console.log('Data, ', data);
            // Appel à votre API de connexion
            const response = await httpService.post('/auth/register', {
              ...data
            });

            if (response.status !== 200) {
              throw new Error(response.request.error || "Erreur de connexion");
            }

            const { message, ...user } = response.data as unknown as any;
            console.log('Utilisateur crée ', user);

            // Stockage des données d'authentification
            set({
              isLoading: false,
              error: null,
            });
            return message as string;
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Une erreur est survenue",
            });
          }
          return '';
        },

        logout: async () => {
          set({
            user: null,
          });

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("expiredAt");

          set({
            isAuthenticated: false,
          });

          /// On retourne à la page de garde.
          window.location.href = '/explore';
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: "auth-store",
      }
    )
  )
);
