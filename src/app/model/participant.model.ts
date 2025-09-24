export interface Participant {
  id: string
  event_id: string
  event_name: string
  user_id?: string
  fullname: string
  phoneNumber: string
  email: string
  paidAt?: Date
  tickets: any[]
  status: 'PENDING' | 'BUYED' | 'NOT_VALIDATED'
  arrivedAt?: Date
  createdAt: Date
  updatedAt?: Date
  validatedBy?: string
}