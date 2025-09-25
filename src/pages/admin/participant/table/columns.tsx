"use client"

import type { Participant } from "@/app/model/participant.model";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
export const columns: ColumnDef<Participant>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return <span className="font-mono text-xs">{row.getValue("id")}</span>;
        }
    },
    {
        accessorKey: "fullname",
        header: "Nom complet",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phoneNumber",
        header: "Téléphone",
    },
    {
        accessorKey: "event_name",
        header: "Événement",
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const getVariant = (status: string) => {
                switch (status) {
                    case "BUYED": return "default";
                    case "PENDING": return "secondary";
                    case "NOT_VALIDATED": return "destructive";
                    default: return "outline";
                }
            };
            
            const getLabel = (status: string) => {
                switch (status) {
                    case "BUYED": return "Payé";
                    case "PENDING": return "En attente";
                    case "NOT_VALIDATED": return "Non validé";
                    default: return status;
                }
            };
            
            return <Badge variant={getVariant(status)}>{getLabel(status)}</Badge>;
        }
    },
    {
        accessorKey: "paidAt",
        header: "Date de paiement",
        cell: ({ row }) => {
            const paidAt = row.getValue("paidAt") as Date;
            return paidAt ? paidAt.toLocaleDateString('fr-FR') : "Non payé";
        }
    },
    {
        accessorKey: "arrivedAt",
        header: "Arrivée",
        cell: ({ row }) => {
            const arrivedAt = row.getValue("arrivedAt") as Date;
            return arrivedAt ? arrivedAt.toLocaleDateString('fr-FR') : "Non arrivé";
        }
    },
    {
        accessorKey: "tickets",
        header: "Billets",
        cell: ({ row }) => {
            const tickets = row.getValue("tickets") as any[];
            return (
                <div className="flex flex-col gap-1">
                    {tickets.map((ticket, index) => (
                        <div key={index} className="text-xs">
                            {ticket.quantity}x {ticket.type} ({ticket.price}€)
                        </div>
                    ))}
                </div>
            );
        }
    },
    {
        accessorKey: "createdAt",
        header: "Date d'inscription",
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt") as Date;
            return createdAt.toLocaleDateString('fr-FR');
        }
    },
    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: () => {
            return (
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                        Voir
                    </Button>
                    <Button variant="ghost" size="sm">
                        Éditer
                    </Button>
                </div>
            );
        }
    }
];