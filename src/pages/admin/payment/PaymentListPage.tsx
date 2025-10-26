import React from 'react';
import Layout from "@/components/layout/admin/AdminLayout";
import { DataTable } from '@/components/shared/DataTable';
import { getColumns } from './table/columns';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { usePaymentService } from '@/app/service/payment.service';
import { LoadingPage } from '@/config/LoadingPage';

const PaymentList: React.FC = () => {
  const navigate = useNavigate();
  const { setPagination, fetchAllPayments, validPaymentMutation } = usePaymentService();
  const { user } = useAuthStore();

  // Utilisation de React Query pour récupérer les événements avec pagination
  const { data: paymentsData, isLoading, error, isError } = fetchAllPayments();

  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleValidation = (id: string) => {
    if (window.confirm(`Valider un paiement à l'événement "${id}" ?`)) {
      validPaymentMutation.mutate({
        id,
        user
      });
    }
  };

  const handleView = (id: string) => {
  };

  const columns = getColumns({
    onView: handleView,
    onValidate: handleValidation,
  });


  return (
    <Layout pageTitle="Liste des paiements d'un evenement">
      <div className="p-10">
        {/* Events Table */}
        <div className="mt-10">
          {/* États de chargement et d'erreur */}
          {isLoading && (
            <LoadingPage label='Chargement des événements...' />
          )}

          {isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>Erreur: {(error as Error)?.message || 'Une erreur est survenue'}</p>
              <button
                onClick={() => setPagination(prev => ({ ...prev }))}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Events Table */}
          {
            !isLoading && !isError && paymentsData && (
              <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-foreground">
                    Liste des paiements à cet évenement
                  </h2>
                  <div className="text-sm text-gray-600">
                    Page {paymentsData.currentPage} sur {paymentsData.totalPages}
                    • Total: {paymentsData.totalItems} événements
                  </div>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-4"> Liste des paiements à cet évenement </h2>
                <div className="rounded-md border bg-white">
                  <DataTable
                    columns={columns}
                    data={paymentsData.data}
                    pagination={paymentsData}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  );
};

export default PaymentList;