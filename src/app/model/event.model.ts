export interface Event {
  id: any
  title: string
  description?: string
  date?: string
  time?: string
  location?: string
  isFavorite?: boolean
  price?: number
  image?: string
  organizer: string
  //category: 'music' | 'tech' | 'sports' | 'all' | 'technology' | 'Technologie' | 'Musique'
  category: string
  status: 'active' | 'inactive' | 'completed' | 'published' | 'draft'
  sales?: number
  capacity?: number
}


export type EventType = 'CONFERENCE' | 'SEMINAR' | 'LIVING_ROOM' | 'WORKSHOP' | 'WEBINAR' | 'B2B' | 'FORUM' | 'GALA_DINNER' | 'PRIVATE_EVENING' | 'OTHER';