import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getStatusConfig, type EventDto } from '@/app/model/event.model';
import { formatDateRangeWithTime } from '@/lib/date';
import { getEventTypeLabel } from '@/app/schema/event.schema';

interface RecentEventsTableProps {
  events: EventDto[];
}

const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }: RecentEventsTableProps) => {
  return (
    <div className="w-full mt-10">
      <h2 className="text-xl font-bold text-foreground mb-4">Événements récents</h2>
      <div className="rounded-md border bg-white">
        <Table className="w-screen m-2">
          <TableHeader>
            <TableRow>
              <TableHead>Nom de l'événement</TableHead>
              <TableHead>Organisateur</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de début - Date de fin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => {
              const status = getStatusConfig(event.status);
              return (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.organizer.name}</TableCell>
                  <TableCell>{ getEventTypeLabel(event.type) }</TableCell>
                  <TableCell>
                    <Badge variant={status.variant} className={status.className}>
                      { status.label }
                    </Badge>
                  </TableCell>
                  <TableCell>{ formatDateRangeWithTime(event.start_date, event.end_date)}</TableCell>
                </TableRow>
              );
            })
          }
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentEventsTable;