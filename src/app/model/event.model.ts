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
  start_date: Date
  end_date: Date
  created_at: Date
  updated_at: Date | null
  closed_at: Date | null
  published_at: Date | null
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