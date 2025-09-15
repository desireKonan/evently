import React, { useState } from 'react';

// Types pour les données
export interface Event {
  id: number;
  name: string;
  date: string;
  organizer: string;
  category: string;
  status: 'published' | 'draft';
}

export interface Stats {
  events: number;
  users: number;
  organizers: number;
  categories: number;
}

export interface DashboardData {
  stats: Stats;
  recentEvents: Event[];
}


const DashboardPage: React.FC = () => {
  // État pour les statistiques
  const [stats, setStats] = useState<Stats>({
    events: 120,
    users: 500,
    organizers: 50,
    categories: 10
  });

  // Données des événements récents
  const [recentEvents, setRecentEvents] = useState<Event[]>([
    {
      id: 1,
      name: 'Conférence sur la technologie',
      date: '2024-07-15',
      organizer: 'Tech Innovators',
      category: 'Technologie',
      status: 'published'
    },
    {
      id: 2,
      name: 'Festival de musique d\'été',
      date: '2024-08-20',
      organizer: 'Music Events Inc.',
      category: 'Musique',
      status: 'published'
    },
    {
      id: 3,
      name: 'Atelier de cuisine',
      date: '2024-09-10',
      organizer: 'Culinary Arts Academy',
      category: 'Cuisine',
      status: 'draft'
    },
    {
      id: 4,
      name: 'Salon de l\'art',
      date: '2024-10-05',
      organizer: 'Artistic Expressions',
      category: 'Art',
      status: 'published'
    },
    {
      id: 5,
      name: 'Séminaire sur le marketing',
      date: '2024-11-12',
      organizer: 'Marketing Solutions Ltd.',
      category: 'Marketing',
      status: 'published'
    }
  ]);

  // Fonction pour formater la date en français
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Fonction pour obtenir les classes de statut
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour obtenir le texte du statut
  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publié';
      case 'draft':
        return 'Brouillon';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="bg-[#ecf0f1] min-h-screen text-[#2c3e50]" style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}>
      <div className="relative flex flex-col min-h-screen overflow-x-hidden">
        <div className="flex h-full grow flex-row">
          {/* Sidebar */}
          <aside className="flex h-screen sticky top-0 flex-col justify-between border-r border-gray-200 bg-white p-4">
            <div className="flex flex-col gap-8">
              {/* Logo */}
              <div className="flex items-center gap-3 px-3">
                <svg className="h-8 w-8 text-[#16a085]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <h2 className="text-lg font-bold text-gray-800">Evently</h2>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2">
                <a className="flex items-center gap-3 rounded-full bg-[#16a085] px-3 py-2 text-white" href="#">
                  <span className="material-symbols-outlined">dashboard</span>
                  <p className="text-sm font-medium">Tableau de bord</p>
                </a>
                <a className="flex items-center gap-3 rounded-full px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800" href="#">
                  <span className="material-symbols-outlined">calendar_month</span>
                  <p className="text-sm font-medium">Événements</p>
                </a>
                <a className="flex items-center gap-3 rounded-full px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800" href="#">
                  <span className="material-symbols-outlined">group</span>
                  <p className="text-sm font-medium">Utilisateurs</p>
                </a>
                <a className="flex items-center gap-3 rounded-full px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800" href="#">
                  <span className="material-symbols-outlined">groups</span>
                  <p className="text-sm font-medium">Organisateurs</p>
                </a>
                <a className="flex items-center gap-3 rounded-full px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800" href="#">
                  <span className="material-symbols-outlined">category</span>
                  <p className="text-sm font-medium">Catégories</p>
                </a>
                <a className="flex items-center gap-3 rounded-full px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800" href="#">
                  <span className="material-symbols-outlined">settings</span>
                  <p className="text-sm font-medium">Paramètres</p>
                </a>
              </nav>
            </div>

            {/* Profil utilisateur */}
            <div className="flex items-center gap-3 rounded-full bg-gray-100 p-2">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfimSwHikVoC7UwmMoZ674nuzfUwX6XiA6dHXUC2EH7Pbk9_vGxLjryQ-sIxEmZ4QE_ys62vijpgoO9xYg5pOy8g7mTaWhtL_FofZ3lYOtf0zUe1Ub_aBt9vIAR43-NhrAUByLP1h5Bt-6NLnJU3KJGcGqKj6d1MNIO4k3-PGEhZP0aQEaTHINIOv5IeZFVLnRTlzFG6DQRWu3_6XceYfpX029ldCuTCl0bsGp-geSH28uB4H9agtXFZTDzwckSK2P4F4wq9c3Ckw")' }}
              ></div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@evently.com</p>
              </div>
              <button className="ml-auto text-gray-500 hover:text-gray-800">
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </aside>

          {/* Contenu principal */}
          <main className="flex-1 overflow-y-auto">
            {/* Header */}
            <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-gray-200 bg-[#ecf0f1]/80 px-10 py-5 backdrop-blur-sm">
              <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
              <button className="flex items-center gap-2 rounded-full bg-[#27ae60] px-4 py-2 text-sm font-bold text-white hover:opacity-90">
                <span className="material-symbols-outlined">add_circle</span>
                <span>Créer un événement</span>
              </button>
            </header>

            {/* Contenu */}
            <div className="p-10">
              {/* Cartes de statistiques */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Carte Événements */}
                <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="material-symbols-outlined text-[#16a085]">event</span>
                    <p className="text-sm font-medium">Événements</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{stats.events}</p>
                </div>

                {/* Carte Utilisateurs */}
                <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="material-symbols-outlined text-[#16a085]">person</span>
                    <p className="text-sm font-medium">Utilisateurs</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{stats.users}</p>
                </div>

                {/* Carte Organisateurs */}
                <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="material-symbols-outlined text-[#16a085]">store</span>
                    <p className="text-sm font-medium">Organisateurs</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{stats.organizers}</p>
                </div>

                {/* Carte Catégories */}
                <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="material-symbols-outlined text-[#16a085]">label</span>
                    <p className="text-sm font-medium">Catégories</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{stats.categories}</p>
                </div>
              </div>

              {/* Tableau des événements récents */}
              <h2 className="mt-10 text-xl font-bold text-gray-800">Événements récents</h2>
              <div className="mt-4 overflow-x-auto">
                <div className="min-w-full rounded-xl border border-gray-200 bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Nom de l'événement
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Organisateur
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Catégorie
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                          Statut
                        </th>
                        <th className="relative px-6 py-3" scope="col">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentEvents.map((event) => (
                        <tr key={event.id}>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                            {event.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {formatDate(event.date)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {event.organizer}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {event.category}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(event.status)}`}>
                              {getStatusText(event.status)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <a className="text-[#16a085] hover:text-teal-700" href="#">
                              Éditer
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;