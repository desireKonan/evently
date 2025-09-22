"use client"

import type { User } from "@/app/model/user.model";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "firstname",
        header: "Prenoms",
    },
    {
        accessorKey: "lastname",
        header: "Nom",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone-number",
        header: "phoneNumber",
    },
    {
        accessorKey: "phoneNumber",
        header: "Numero de telephone",
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-right"> Actions </div>,
        cell: ({ row }) => {
            return (
                <Button variant="ghost" size="sm">
                    Éditer
                </Button>
            );
        }
    }
]