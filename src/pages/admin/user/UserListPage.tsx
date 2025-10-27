"use client"

import React from 'react';
import Layout from "@/components/layout/admin/AdminLayout";
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/shared/DataTable';
import { columns } from './table/columns';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';
import { CustomDialogForm } from '@/components/shared/CustomDialogForm';
import { UserForm } from './form/UserForm';
import { userFormSchema, type UserFormData } from '@/app/schema/user.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserService } from '@/app/service/user.service';
import { LoadingPage } from '@/config/LoadingPage';


const UserList: React.FC = () => {
  const { fetchAllUsers, setPagination } = useUserService();

  // Utilisation de React Query pour récupérer les événements avec pagination
  const { data: usersData, isLoading, error, isError } = fetchAllUsers();

  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Données pour les cartes de statistiques
  const { isOpen, toggleModal } = useModal();
  const userformData = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      createdAt: new Date()
    },
    mode: 'onChange'
  });


  return (
    <Layout pageTitle="Liste des utilisateurs" buttons={
      <>
        <Button
          onClick={toggleModal}
          className="flex items-center gap-2 rounded-full bg-[var(--secondary-color)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          <Plus />
          <span> Créer un utilisateur </span>
        </Button>
      </>
    }>
      <div className="p-10">
        {isLoading && (
          <LoadingPage label='Chargement des utilisateurs...' />
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

        {/* Users Table */}
        {
          !isLoading && !isError && usersData && (
            <div className="mt-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  Liste des utilisateurs
                </h2>
                <div className="text-sm text-gray-600">
                  Page {usersData.currentPage} sur {usersData.totalPages}
                  • Total: {usersData.totalItems} événements
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-4">Liste des utilisateurs</h2>
              <div className="rounded-md border bg-white">
                <DataTable
                  columns={columns}
                  data={usersData.data}
                  pagination={usersData}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )
        }

        <div>
          <CustomDialogForm
            title='Formulaire des utilisateurs'
            description='Ajouter un utilisateur'
            open={isOpen}
            onClose={toggleModal}
            handleSubmit={userformData.handleSubmit((data) => console.log('Data submitted: ', data))}
          >
            <UserForm formReturn={userformData} />
          </CustomDialogForm>
        </div>
      </div>
    </Layout>
  );
};

export default UserList;