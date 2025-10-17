"use client"

import type { EventDto } from "@/app/model/event.model";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
export const columns: ColumnDef<EventDto>[] = [
    {
        accessorKey: "event-name",
        header: "Nom de l'événement",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "organizer",
        header: "Organisateur",
    },
    {
        accessorKey: "category",
        header: "Catégorie",
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            return (
                <Badge variant={row.getValue("status") === 'published' ? 'default' : 'secondary'} className={row.getValue("status") === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {row.getValue("status") === 'published' ? 'Publié' : 'Brouillon'}
                </Badge>
            );
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-left"> Actions </div>,
        cell: ({ row }) => {
            return (
                <Button variant="ghost" size="sm">
                    Éditer
                </Button>
            );
        }
    }
]