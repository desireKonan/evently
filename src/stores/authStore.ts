import type { User } from "@/app/model/user.model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
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
            const response = await fetch(
              `${process.env.VITE_EVENTLY_URL}/auth/login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
              }
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Erreur de connexion");
            }

            const data = await response.json();

            const { accessToken, refreshToken, expiresDate, ...user } = data;

            // Stockage des données d'authentification
            set({
              user,
              isLoading: false,
              error: null,
            });

            // Stockage dans le localStorage si nécessaire
            localStorage.setItem("user", JSON.stringify(user));
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

        logout: async () => {
          set({
            user: null,
          });

          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("expiredAt");

          set({
            isAuthenticated: false,
          });
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: "auth-store",
      }
    )
  )
);
