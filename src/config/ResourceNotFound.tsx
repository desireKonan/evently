import React from 'react';
import { Link } from 'react-router-dom';

interface ResourceNotFoundProps {
  resource: string;
  resourceId?: string;
}

const ResourceNotFound: React.FC<ResourceNotFoundProps> = ({ 
  resource, 
  resourceId 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-event-background py-12 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🔍</div>
        
        <h1 className="text-2xl font-bold text-event-foreground mb-4">
          { resource } non trouvé(e)
        </h1>
        
        <p className="text-event-muted-foreground mb-6">
          {resourceId 
            ? `Le ${resource.toLowerCase()} avec l'identifiant "${resourceId}" n'existe pas ou a été supprimé.`
            : `Le ${resource.toLowerCase()} que vous recherchez n'existe pas ou a été supprimé.`
          }
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-event-primary text-white px-6 py-3 font-medium hover:bg-event-primary-dark transition-colors"
          >
            Retour à l'accueil
          </Link>
          
          <Link
            to="/admin/events"
            className="inline-flex items-center justify-center rounded-full border border-event-primary text-event-primary px-6 py-3 font-medium hover:bg-event-primary hover:text-white transition-colors"
          >
            Voir tous les événements
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceNotFound;