"use client"

import { getStatusConfig, type EventElementDTO, type EventStatus, type EventType } from "@/app/model/event.model";
import { eventTypeLabels } from "@/app/schema/event.schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateRangeWithTime, formatDateWithTime } from "@/lib/date";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface ColumnsProps {
  onEdit: (event: string) => void;
  onView: (event: string) => void;
  onPublish: (event: string) => void;
}

// This type is used to define the shape of our data.
export const getColumns = (): ColumnDef<EventElementDTO>[] => [
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
            return (
                <div className="p-3">
                    <Button variant="default" size="sm">
                        Éditer
                    </Button>
                    <Button variant="secondary" size="sm">
                        Publier
                    </Button>
                </div>
            );
        }
    },
    // {
    //     id: "actions",
    //     header: () => <div className="text-right">Actions</div>,
    //     cell: ({ row }) => {
    //     const event = row.original;
    //     const isPublished = event.status === 'PUBLISHED';
    //     const isDraft = event.status === 'DRAFT';

    //     return (
    //         <div className="flex justify-end space-x-2">
    //         {/* Bouton Éditer toujours visible */}
    //             <Button
    //                 variant="outline"
    //                 size="sm"
    //                 onClick={() => onEdit(event.id)}
    //                 className="h-8 w-8 p-0"
    //             >
    //                 <Edit className="h-4 w-4" />
    //                 <span className="sr-only">Éditer</span>
    //             </Button>

    //         {/* Menu déroulant pour les actions supplémentaires */}
    //         {/* <Dropdo>
    //             <DropdownMenuTrigger asChild>
    //             <Button variant="outline" size="sm" className="h-8 w-8 p-0">
    //                 <MoreHorizontal className="h-4 w-4" />
    //                 <span className="sr-only">Menu</span>
    //             </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent align="end">
    //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
                
    //             <DropdownMenuItem onClick={() => onView(event)}>
    //                 <Eye className="h-4 w-4 mr-2" />
    //                 Voir les détails
    //             </DropdownMenuItem>

    //             <DropdownMenuItem onClick={() => onDownloadQR(event)}>
    //                 <Download className="h-4 w-4 mr-2" />
    //                 Télécharger QR Code
    //             </DropdownMenuItem>

    //             <DropdownMenuSeparator />

    //             {isDraft && (
    //                 <DropdownMenuItem onClick={() => onPublish(event)}>
    //                 <Badge className="bg-green-100 text-green-800 mr-2">Publier</Badge>
    //                 Publier l'événement
    //                 </DropdownMenuItem>
    //             )}

    //             <DropdownMenuSeparator />

    //             <DropdownMenuItem 
    //                 onClick={() => onDelete(event)}
    //                 className="text-red-600 focus:text-red-600"
    //             >
    //                 <Trash2 className="h-4 w-4 mr-2" />
    //                 Supprimer
    //             </DropdownMenuItem>
    //             </DropdownMenuContent>
    //         </DropdownMenu> */}
    //         </div>
    //     );
    //     }
    //{
    //     id: "actions",
    //     header: () => <div className="text-right">Actions</div>,
    //     cell: ({ row }) => {
    //     const event = row.original;
    //     const isPublished = event.status === 'PUBLISHED';
    //     const isDraft = event.status === 'DRAFT';

    //     return (
    //         <div className="flex justify-end space-x-2">
    //         {/* Bouton Éditer toujours visible */}
    //             <Button
    //                 variant="outline"
    //                 size="sm"
    //                 onClick={() => onEdit(event.id)}
    //                 className="h-8 w-8 p-0"
    //             >
    //                 <Edit className="h-4 w-4" />
    //                 <span className="sr-only">Éditer</span>
    //             </Button>

    //         {/* Menu déroulant pour les actions supplémentaires */}
    //         {/* <Dropdo>
    //             <DropdownMenuTrigger asChild>
    //             <Button variant="outline" size="sm" className="h-8 w-8 p-0">
    //                 <MoreHorizontal className="h-4 w-4" />
    //                 <span className="sr-only">Menu</span>
    //             </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent align="end">
    //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
                
    //             <DropdownMenuItem onClick={() => onView(event)}>
    //                 <Eye className="h-4 w-4 mr-2" />
    //                 Voir les détails
    //             </DropdownMenuItem>

    //             <DropdownMenuItem onClick={() => onDownloadQR(event)}>
    //                 <Download className="h-4 w-4 mr-2" />
    //                 Télécharger QR Code
    //             </DropdownMenuItem>

    //             <DropdownMenuSeparator />

    //             {isDraft && (
    //                 <DropdownMenuItem onClick={() => onPublish(event)}>
    //                 <Badge className="bg-green-100 text-green-800 mr-2">Publier</Badge>
    //                 Publier l'événement
    //                 </DropdownMenuItem>
    //             )}

    //             <DropdownMenuSeparator />

    //             <DropdownMenuItem 
    //                 onClick={() => onDelete(event)}
    //                 className="text-red-600 focus:text-red-600"
    //             >
    //                 <Trash2 className="h-4 w-4 mr-2" />
    //                 Supprimer
    //             </DropdownMenuItem>
    //             </DropdownMenuContent>
    //         </DropdownMenu> */}
    //         </div>
    //     );
    //     }
    // } }
]