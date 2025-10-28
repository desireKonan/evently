import React from 'react';
import Layout from "@/components/layout/admin/AdminLayout";
// import { DataTable } from '@/components/shared/DataTable';
// import { PARTICIPANTS_SAMPLE } from '@/mock/participant.mock';
// import { columns } from './table/columns';

const ParticipantList: React.FC = () => {
  return (
    <Layout pageTitle="Liste des participants d'un evenement">
      <div className="p-10">
        {/* Events Table */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground mb-4">Liste des participants a cet evenement</h2>
          <div className="rounded-md border bg-white">
            {/* <DataTable columns={columns} data={PARTICIPANTS_SAMPLE} /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParticipantList;