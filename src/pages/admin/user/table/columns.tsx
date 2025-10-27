"use client"

import { getUserStatusConfig, type User } from "@/app/model/user.model";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateWithTime } from "@/lib/date";
import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue('id') as string;
            return <span className="font-mono text-xs">{ id.substring(7) + '...' }</span>;
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
        accessorKey: "contacts",
        header: "Numeros de telephone",
        cell: ({ row }) => {
            const user = row.original;
            return (<ul> {
                user.contacts.map(contact => (
                    <li> { contact } </li>
                ))
            } </ul>);
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const { variant, className, label } = getUserStatusConfig(row.original.status);
            return <Badge variant={variant} className={className}>
                {label}
            </Badge>;
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
        accessorKey: "actions",
        header: () => <div className="text-center"> Actions </div>,
        cell: () => {
            return (
                <Button variant="ghost" size="sm">
                    Éditer
                </Button>
            );
        }
    }
]