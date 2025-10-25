export interface EventDto {
  id: string
  name: string
  description?: string
  type: EventType
  limit?: number
  image_path: string
  address?: string
  place?: string
  code_qr: string
  organizer_id: string
  status: EventStatus
  ticket_prices: TicketPrice[]
  promotional_formule?: PromotionalFormule
  sub_events: string[]
  organizer: OrganizerDto
  start_date: Date
  end_date: Date
  created_at: Date
  updated_at: Date | null
  closed_at: Date | null
  published_at: Date | null
}


export type EventElementDTO = {
  id: string
  name: string
  description?: string
  category: EventType
  status: EventStatus
  organizer: OrganizerDto
  start_date: Date
  end_date: Date
  created_at: Date
  published_at: Date | null
}

export type OrganizerDto = {
  id: string,
  name: string,
  email: string,
  contact: string
}


export type TicketPrice = {
  name: string,
  description: string,
  price: number
}


export type PromotionalFormule = {
  name: string,
  rate: number,
  start_date: Date,
  end_date: Date
}

export const EventStatus = {
  PENDING: 'PENDING',
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  REJECTED: 'REJECTED'
};

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

export type EventType = 'CONFERENCE' | 'SEMINAR' | 'LIVING_ROOM' | 'WORKSHOP' | 'WEBINAR' | 'B2B' | 'FORUM' | 'GALA_DINNER' | 'PRIVATE_EVENING' | 'OTHER';

export interface EventTypeOption {
  value: EventType;
  label: string;
}

export const EVENT_TYPE_OPTIONS: EventTypeOption[] = [
  { value: 'CONFERENCE', label: 'Conférence' },
  { value: 'SEMINAR', label: 'Séminaire' },
  { value: 'LIVING_ROOM', label: 'Salon' },
  { value: 'WORKSHOP', label: 'Atelier' },
  { value: 'WEBINAR', label: 'Webinaire' },
  { value: 'B2B', label: 'Événement B2B' },
  { value: 'FORUM', label: 'Forum' },
  { value: 'GALA_DINNER', label: 'Dîner de gala' },
  { value: 'PRIVATE_EVENING', label: 'Soirée privée' },
  { value: 'OTHER', label: 'Autre' }
];


export const getStatusConfig = (status: EventStatus) => {
  const statusConfigs = {
    [EventStatus.PUBLISHED]: {
      label: 'Publié',
      variant: 'default' as const,
      className: 'bg-green-100 text-green-800 border-green-200'
    },
    [EventStatus.DRAFT]: {
      label: 'Brouillon',
      variant: 'secondary' as const,
      className: 'bg-gray-100 text-gray-800 border-gray-200'
    },
    [EventStatus.PENDING]: {
      label: 'En attente',
      variant: 'outline' as const,
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    [EventStatus.REJECTED]: {
      label: 'Rejeté',
      variant: 'destructive' as const,
      className: 'bg-red-100 text-red-800 border-red-200'
    }
  };

  return statusConfigs[status] || {
    label: 'Inconnu',
    variant: 'secondary' as const,
    className: 'bg-gray-100 text-gray-800 border-gray-200'
  };
};
