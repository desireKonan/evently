// components/EnhancedBadge.tsx
import React from 'react';
import QRCode from 'react-qr-code';

interface Participant {
  id: string;
  name: string;
  photoUrl: string;
  role: string;
  email?: string;
  company?: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  logoUrl: string;
  location?: string;
  organizer?: string;
}

interface EnhancedBadgeProps {
  event: Event;
  participant: Participant;
  showQrCode?: boolean;
  className?: string;
}

const EnhancedBadge: React.FC<EnhancedBadgeProps> = ({ 
  event, 
  participant, 
  showQrCode = true,
  className = '' 
}) => {
  // Générer les données pour le QR code
  const qrData = JSON.stringify({
    eventId: event.id,
    participantId: participant.id,
    name: participant.name,
    role: participant.role,
    timestamp: new Date().toISOString()
  });

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${className}`}>
      <div className="w-full max-w-sm">
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden border border-border-light dark:border-border-dark">
          {/* En-tête */}
          <div className="bg-primary p-4 flex items-center justify-between">
            <img 
              alt="Event Logo" 
              className="h-10 w-auto invert brightness-0"
              src={event.logoUrl}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/160x40/0fa985/ffffff?text=EVENT+LOGO';
              }}
            />
            <span className="font-bold text-white text-lg tracking-wider">EVENTPASS</span>
          </div>

          {/* Corps */}
          <div className="p-6">
            {/* Informations événement */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-text-light dark:text-text-dark line-clamp-2">
                {event.name}
              </h1>
              <p className="text-primary font-semibold text-md mt-2">{event.date}</p>
              {event.location && (
                <p className="text-text-light/70 dark:text-text-dark/70 text-sm mt-1">
                  📍 {event.location}
                </p>
              )}
            </div>

            {/* Informations participant */}
            <div className="text-center my-6">
              <img 
                alt={`Photo de ${participant.name}`}
                className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-primary/50 object-cover"
                src={participant.photoUrl}
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.name)}&background=0fa985&color=fff&size=96`;
                }}
              />
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-1">
                {participant.name}
              </h2>
              <p className="text-text-light/70 dark:text-text-dark/70 text-sm mb-2">
                {participant.role}
              </p>
              {participant.company && (
                <p className="text-text-light/60 dark:text-text-dark/60 text-xs">
                  {participant.company}
                </p>
              )}
            </div>

            {/* QR Code ou icône par défaut */}
            <div className="flex justify-center items-center my-4">
              {showQrCode ? (
                <div className="p-2 bg-white rounded-lg">
                  <QRCode 
                    value={qrData}
                    size={120}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
              ) : (
                <svg className="w-32 h-32 text-text-light dark:text-text-dark" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M172 104v8h-8v-8h8Zm-48 0v8h-8v-8h8Zm48-48v8h-8V56h8Zm-48 0v8h-8V56h8Zm-8 128h8v-8h-8v8Zm-40-40v8h-8v-8h8Zm96 0h8v-8h-8v8Zm-56-48v8h-8v-8h8Zm-40 0v8h-8v-8h8Zm136-88v192H40V40h192Zm-8 8H48v176h176V48Zm-24 104v8h-8v-8h8Zm-40 24h8v-8h-8v8Zm-8-8v-8h-8v8h8Zm-32-16v8h-8v-8h8Zm8-8h8v-8h-8v8Zm32 8v8h-8v-8h8Zm8-40h-8v8h8v-8Zm8-8v-8h-8v8h8Zm-8-8h-8v8h8v-8Zm-32 32h8v-8h-8v8Zm-8-8v-8h-8v8h8Zm-32-40v8h-8v-8h8Zm8-8h8v-8h-8v8Zm32 8v8h-8v-8h8Zm-8-32h-8v8h8v-8Zm8-8v-8h-8v8h8Zm-8-8h-8v8h8v-8Z" />
                </svg>
              )}
            </div>
          </div>

          {/* Pied de page */}
          <div className="bg-primary/10 dark:bg-primary/20 p-3 text-center">
            <p className="text-sm text-primary font-semibold">ID: {participant.id}</p>
            {event.organizer && (
              <p className="text-xs text-text-light/60 dark:text-text-dark/60 mt-1">
                Organisé par {event.organizer}
              </p>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-text-light/60 dark:text-text-dark/60 mt-4 px-4">
          Ce badge est votre pass pour l'événement. Veuillez le présenter à l'entrée pour validation.
        </p>
      </div>
    </div>
  );
};

export default EnhancedBadge;