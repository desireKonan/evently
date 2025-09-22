import React from 'react';
import Layout from "@/components/layout/admin/AdminLayout";
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/shared/DataTable';
import { columns } from './table/columns';
import { SAMPLE_USERS } from '@/mock/user.mock';

const UserList: React.FC = () => {
  // Données pour les cartes de statistiques
  const navigate = useNavigate();

  return (
    <Layout pageTitle="Liste des utilisateurs" buttons={
      <button
        onClick={() => navigate('/create/event')}
        className="flex items-center gap-2 rounded-full bg-[var(--secondary-color)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
      >
        <Plus />
        <span> Créer un utilisateur </span>
      </button>
    }>
      <div className="p-10">
        {/* Events Table */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Liste des utilisateurs</h2>
          <div className="rounded-md border bg-white">
            <DataTable columns={columns} data={SAMPLE_USERS} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserList;