import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { ArrowUpDown, Clock3, Power, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Command } from "@/model/commands";

export const commandsColumns: ColumnDef<Command>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllRowsSelected() ||
                        (table.getIsSomeRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                    aria-label="Select all"
                ></Checkbox>
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                ></Checkbox>
            </div>
        )
    },
    {
        accessorKey: "imei",
        header: "IMEI",
        filterFn: "includesString",
        cell: ({ getValue }) => {
            let imei = getValue() as string | undefined;
            if (!imei) {
                return <span className="text-muted-foreground">-</span>
            }
            return (
                <div>
                    <span
                        className="font-mono px-2 py-1 rounded bg-gray-100 text-gray-800 truncate"
                        title={imei}
                    >
                        {imei}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "data",
        header: "Command"
    },
    {
        accessorKey: "is_response_required",
        header: "Reponse Required"
    },
    {
        accessorKey: "response",
        header: "Reponse"
    },
    {
        accessorKey: "max_retries",
        header: "Retries",
    },
    {
        accessorKey: "expires_at_ms",
        header: "Expires At",
    },
];
