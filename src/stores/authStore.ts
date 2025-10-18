import type { User } from "@/app/model/user.model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
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
        token: null,
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

            const { access_token, ...user } = data;

            // Stockage des données d'authentification
            set({
              user,
              token: access_token,
              isLoading: false,
              error: null,
            });

            // Stockage dans le localStorage si nécessaire
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", access_token);

            set({
              isAuthenticated: !!access_token && !!user,
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
            token: null,
          });

          const response = await fetch("/auth/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          });

          if (response.ok) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            set({
              isAuthenticated: false,
            });
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: "auth-store",
      }
    )
  )
);
