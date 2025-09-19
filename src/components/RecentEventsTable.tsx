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
import { Button } from "@/components/ui/button";
import type { Event } from '@/stores/eventStore';

interface RecentEventsTableProps {
  events: Event[];
}

const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }: RecentEventsTableProps) => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-foreground mb-4">Événements récents</h2>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom de l'événement</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Organisateur</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.organizer}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>
                  <Badge variant={event.status === 'published' ? 'default' : 'secondary'} className={event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {event.status === 'published' ? 'Publié' : 'Brouillon'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Éditer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentEventsTable;