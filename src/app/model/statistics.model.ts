import type { LucideIcon } from "lucide-react";
import type { UserRole } from "./user.model";

export type EventlyStatistics = {
    userRole: UserRole;
    statistics: StatisticItem[];
    event_status: EventStatusItem[];
}

type StatisticItem = {
    label: string;
    value: number;
}

export type EventStatusItem = {
    count: number;
    label: number;
}

export interface StatCardData {
  id: number;
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  color: string;
}