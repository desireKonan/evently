"use client"

import { getStatusConfig, type EventElementDTO, type EventStatus, type EventType } from "@/app/model/event.model";
import { eventTypeLabels } from "@/app/schema/event.schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateRangeWithTime, formatDateWithTime } from "@/lib/date";
import type { ColumnDef } from "@tanstack/react-table";
import { BanknoteArrowDown, Check, Edit, Eye } from "lucide-react";

interface ColumnsProps {
  onEdit: (event: string) => void;
  onView: (event: string) => void;
  onGoToPayments: (id: string) => void;
  onPublish: ({ id }: {
    id: string
}) => void;
}

// This type is used to define the shape of our data.
export const getColumns = ({
    onEdit,
    onView,
    onGoToPayments,
    onPublish
}: ColumnsProps): ColumnDef<EventElementDTO>[] => [
    {
        accessorKey: "name",
        header: "Nom de l'événement",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "organizer.name",
        header: "Organisateur",
    },
    {
        accessorKey: "category",
        header: "Type d'évenement",
        cell: ({ row }) => {
            console.log('Type: ', row.getValue('category'));
            return (
                <p> { eventTypeLabels[row.getValue("category") as EventType] } </p>
            );
        }
    },
    {
        header: "Période",
        cell: ({ row }) => {
            return formatDateRangeWithTime(row.original.start_date, row.original.end_date);
        }
    },
    {
        accessorKey: "created_at",
        header: "Créé le",
        cell: ({ row }) => {
            return formatDateWithTime(row.getValue("created_at"));
        }
    },
    {
        accessorKey: "published_at",
        header: "Publié le",
        cell: ({ row }) => {
            const publishedAt = row.original.published_at;
            return publishedAt ? formatDateWithTime(publishedAt) : "-";
        }
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.getValue("status") as EventStatus;
            const { label, variant, className } = getStatusConfig(status);
            
            return (
                <Badge variant={variant} className={className}>
                    {label}
                </Badge>
            );
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-left"> Actions </div>,
        cell: ({ row }) => {
            const event = row.original;
            const isPublished = event.status === 'PUBLISHED';
            const isDraft = event.status === 'DRAFT';
            return (
                <div className="p-3">
                    <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => onView(event.id)}
                        className="h-8 w-8 p-0"
                    >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Voir</span>
                    </Button>
                    <Button 
                        variant="secondary"
                        size="sm"
                        onClick={() => onGoToPayments(event.id)}
                        className="h-8 w-8 p-0"
                    >
                        <BanknoteArrowDown className="h-4 w-4" />
                        <span className="sr-only">Voir les paiements</span>
                    </Button>
                    {
                        isDraft && (
                            <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(event.id)}
                                className="h-8 w-8 p-0"
                            >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Éditer</span>
                            </Button>
                        )
                    }

                    {
                        !isPublished && (
                            <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => onPublish({
                                    id: event.id
                                })}
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
]