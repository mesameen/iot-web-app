"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export type Payment = {
    id: string,
    amount: number,
    status: "pending" | "processing" | "success" | "failed",
    email: string
};

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select All"
            ></Checkbox>
        ),
        cell: ({ row }) => (
            <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            ></Checkbox>
        )
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
                </Button>
            )
        }
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-center">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(amount);
            return <div className="text-right">{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 p-0" variant={"ghost"}>
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className=""></MoreHorizontal>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            Copy Payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        <DropdownMenuItem>View Customer</DropdownMenuItem>
                        <DropdownMenuItem>View Payment Details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]