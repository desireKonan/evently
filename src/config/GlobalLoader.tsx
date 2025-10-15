// Composant de chargement global
export const GlobalLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-event-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-event-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-event-foreground text-lg">Chargement...</p>
    </div>
  </div>
);