import type { InitPaymentFormData } from "@/app/schema/payment.schema";
import httpService from "@/app/service/http.service";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface PaymentState {
  isLoading: boolean;
  error: string | null;
  
  createPayment: (eventData: InitPaymentFormData) => Promise<unknown>;
  clearError: () => void;
}

export const usePaymentStore = create<PaymentState>()(
  devtools(
    persist(
      (set) => ({
        currentPayment: null,
        isLoading: false,
        error: null,

        
        createPayment: async (paymentForm: InitPaymentFormData) => {
          set({ isLoading: true, error: null });
          try {
            
            let response = null;
            
            if(paymentForm.client_id) {
              response = await httpService.post(`/payment/user/ticket`, {
                ...paymentForm
              });
            } else {
              response = await httpService.post(`/payment/ticket`, {
                ...paymentForm
              });
            }   

            if (response.status !== 201) {
              console.error('Error ', response.data);
              throw new Error(
                "Erreur lors de l'intiation d'un paiement !"
              );
            }

            const result = response.data;

            set({
              isLoading: false,
              error: null,
            });
            return result;
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Une erreur est survenue",
            });
            throw error;
          }
        },

        clearError: () => set({ error: null }),
        
      }),
      {
        name: "event-store",
      }
    )
  )
);
