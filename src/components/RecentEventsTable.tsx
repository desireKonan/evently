import React from 'react';

const RecentEventsTable: React.FC = () => {
  // Données pour les événements récents
  const recentEvents: Event[] = [
    {
      id: 1,
      name: "Conférence sur la technologie",
      date: "2024-07-15",
      organizer: "Tech Innovators",
      category: "Technologie",
      status: "published"
    },
    {
      id: 2,
      name: "Festival de musique d'été",
      date: "2024-08-20",
      organizer: "Music Events Inc.",
      category: "Musique",
      status: "published"
    },
    {
      id: 3,
      name: "Atelier de cuisine",
      date: "2024-09-10",
      organizer: "Culinary Arts Academy",
      category: "Cuisine",
      status: "draft"
    },
    {
      id: 4,
      name: "Salon de l'art",
      date: "2024-10-05",
      organizer: "Artistic Expressions",
      category: "Art",
      status: "published"
    },
    {
      id: 5,
      name: "Séminaire sur le marketing",
      date: "2024-11-12",
      organizer: "Marketing Solutions Ltd.",
      category: "Marketing",
      status: "published"
    }
  ];

  // Fonction pour obtenir les classes de statut
  const getStatusClasses = (status: 'published' | 'draft') => {
    if (status === 'published') {
      return "bg-green-100 text-green-800";
    } else {
      return "bg-yellow-100 text-yellow-800";
    }
  };

  // Fonction pour obtenir le texte du statut
  const getStatusText = (status: 'published' | 'draft') => {
    return status === 'published' ? 'Publié' : 'Brouillon';
  };

  return (
    <>
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
                  <span className="sr-only">Edit</span>
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
                    {event.date}
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
                    <a className="text-[var(--primary-color)] hover:text-teal-700" href="#">
                      Éditer
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecentEventsTable;