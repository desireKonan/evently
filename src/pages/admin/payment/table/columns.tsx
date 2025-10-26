"use client"

import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import type { PaymentDto } from "@/app/model/payment.model";
import { Eye, Edit, Check } from "lucide-react";
import { formatDateToLetters } from "@/lib/date";


interface ColumnsProps {
  onView: (event: string) => void;
  onValidate: (id: string) => void;
}

// This type is used to define the shape of our data.
export const getColumns = ({
    onView,
    onValidate
}: ColumnsProps): ColumnDef<PaymentDto>[] => [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return <span className="font-mono text-xs">{row.getValue("id")}</span>;
        }
    },
    {
        accessorKey: "event.name",
        header: "Nom de l'évenement"
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
        accessorKey: "contacts",
        header: "Téléphone",
    },
    {
        accessorKey: "amount",
        header: "Montant du paiement",
        cell: ({ row }) => {
            const payment = row.original;
            return `${payment.amount} ${process.env.VITE_CURRENCY}`; 
        }
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const getVariant = (status: string) => {
                switch (status) {
                    case "PAID": return "default";
                    case "UNPAID": return "destructive";
                    case "PENDING": return "secondary";
                    default: return "outline";
                }
            };
            
            const getLabel = (status: string) => {
                switch (status) {
                    case "PAID": return "Payé";
                    case "PENDING": return "En attente";
                    case "UNPAID": return "Non payé";
                    default: return status;
                }
            };
            
            return <Badge variant={getVariant(status)}>{getLabel(status)}</Badge>;
        }
    },
     {
        accessorKey: "created_at",
        header: "Date de création",
        cell: ({ row }) => {
            const createdAt = row.getValue("created_at") as Date;
            console.log('Date de création', createdAt);
            return formatDateToLetters(createdAt);
        }
    },
    {
        accessorKey: "paid_at",
        header: "Date de paiement",
        cell: ({ row }) => {
            const paidAt = row.getValue("paid_at") as Date;
            return formatDateToLetters(paidAt) ?? "Non payé";
        }
    },
    {
        accessorKey: "arrived_at",
        header: "Date d'arrivée",
        cell: ({ row }) => {
            const arrivedAt = row.getValue("arrived_at") as Date;
            return formatDateToLetters(arrivedAt) ?? "Non arrivé";
        }
    },
    {
        accessorKey: "ticket_prices",
        header: "Catégories de tickets",
        cell: ({ row }) => {
            const tickets = row.getValue("ticket_prices") as any[];
            return (
                <div className="flex flex-col gap-1">
                    {tickets.map((ticket, index) => (
                        <div key={index} className="text-xs">
                           {ticket.name} {ticket.quantity} x ({ticket.price} {process.env.VITE_CURRENCY})
                        </div>
                    ))}
                </div>
            );
        }
    },
    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const payment = row.original;
            const isNotPaid = payment.status !== 'PAID';
            const isArrivedAt = !!payment.arrived_at;
            return (
                <div className="p-3">
                    <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => onView(payment.id)}
                        className="h-8 w-8 p-0"
                    >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Voir</span>
                    </Button>
                    {
                        isNotPaid && (
                            <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => onValidate(payment.id)}
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Éditer</span>
                            </Button>
                        )
                    }

                    {
                        isArrivedAt && (
                            <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => onValidate(payment.id)}
                                className="h-8 w-8 p-0"
                            >
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Publier</span>
                            </Button>
                        )
                    }
                </div>
            );
        }
    }
];