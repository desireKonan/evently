import type { LucideIcon } from "lucide-react";
import type { EventStatus } from "./event.model";

export type StatisticOrganizerEvently = {
    events_count: number;
    events_tickets: number;
    total_payment: number;
    events_status_count: EventStatusCount[]; 
}

export type StatisticAdminEvently = {
    users_count: number;
    organizers_count: number;
    tickets_sell: number;
    ticket_sell_amount: number;
    events_status_count: EventStatusCount[];
}


export type EventStatusCount = {
    event_count: number;
    status: EventStatus;
}

export interface StatCardData {
  id: number;
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  color: string;
}