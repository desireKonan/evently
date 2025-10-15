// components/common/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NotFoundProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ 
  title = "Page non trouvée", 
  message = "La page que vous recherchez n'existe pas ou a été déplacée.",
  showBackButton = true 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-event-background py-12 px-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-event-primary/20 mb-4">404</div>
        
        <div className="text-6xl mb-6">😕</div>
        
        <h1 className="text-3xl font-bold text-event-foreground mb-4">
          {title}
        </h1>
        
        <p className="text-event-muted-foreground mb-8 text-lg">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-event-primary text-white px-6 py-3 font-medium hover:bg-event-primary-dark transition-colors"
          >
            Retour à l'accueil
          </Link>
          
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-full border border-event-primary text-event-primary px-6 py-3 font-medium hover:bg-event-primary hover:text-white transition-colors"
            >
              Page précédente
            </button>
          )}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-event-muted-foreground">
            Si vous pensez qu'il s'agit d'une erreur,{" "}
            <a 
              href="mailto:support@example.com" 
              className="text-event-secondary hover:underline"
            >
              contactez le support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;