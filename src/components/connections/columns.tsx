import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { ArrowUpDown, Clock3, Power, Zap } from "lucide-react";
import { ElementType } from "react";
import { Button } from "../ui/button";
import { ConnectionsData } from "@/model/connections";
import { Badge } from "../ui/badge";

interface PercentCellProps {
    value?: number,
    icon: ElementType,
    threshlods?: {
        good: number,
        warn: number
    }
}

export function PercentCell({
    value,
    icon: Icon
}: PercentCellProps) {

}

export const connectionsColumns: ColumnDef<ConnectionsData>[] = [
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
        accessorKey: "action",
        header: "Status",
        cell: ({ cell }) => {
            const val = cell.getValue() as string | undefined;
            if (!val) return <span className="text-muted-foreground text-sm">-</span>;

            const isConnected = val.toLowerCase() === "connected";
            const Icon = isConnected ? Zap : Power;
            const label = isConnected ? "Online" : "Offline";
            const bgColor = isConnected ? "bg-green-100" : "bg-red-100";
            const textColor = isConnected ? "text-green-800" : "text-red-800";

            return (
                <Badge className={`inline-flex items-center gap-1 px-3 py-1 ${bgColor} ${textColor}`}>
                    <Icon className="h-4 w-4" />
                    {label}
                </Badge>
            );
        },
    },
    {
        accessorKey: "connected_at_ms",
        enableSorting: true,
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Connected At
                    <ArrowUpDown></ArrowUpDown>
                </Button>
            )
        },
        cell: ({ cell }) => {
            const val = cell.getValue() as number;
            if (!val) return <span className="text-muted-foreground">-</span>;

            const date = new Date(val);
            const formattedDate = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
            const formattedTime = date.toLocaleTimeString(undefined, { hour12: false });

            const isConnected = cell.column.id === "connected_at_ms";
            const iconColor = isConnected ? "text-green-500" : "text-red-500";

            return (
                <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 transition">
                    <Clock3 className={`h-4 w-4 ${iconColor}`} />
                    <span className="font-medium text-sm">{formattedDate} · {formattedTime}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "disconnected_at_ms",
        enableSorting: true,
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Disconnected At
                    <ArrowUpDown></ArrowUpDown>
                </Button>
            )
        },
        cell: ({ cell }) => {
            const val = cell.getValue() as number;
            if (!val) return (
                <div className="flex items-center justify-center gap-2">
                    <span className="text-muted-foreground justify-center text-sm">-</span>
                </div>
            )

            const date = new Date(val);
            const formattedDate = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
            const formattedTime = date.toLocaleTimeString(undefined, { hour12: false });

            const isConnected = cell.column.id === "connected_at_ms";
            const iconColor = isConnected ? "text-green-500" : "text-red-500";

            return (
                <div className="flex items-center justify-center gap-2 px-2 py-1 rounded hover:bg-gray-50 transition">
                    <Clock3 className={`h-4 w-4 ${iconColor}`} />
                    <span className="font-medium text-sm">{formattedDate} · {formattedTime}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ cell }) => {
            const val = cell.getValue() as number; // milliseconds
            if (!val) return (
                <div className="flex items-center justify-center gap-2">
                    <span className="text-muted-foreground justify-center text-sm">-</span>
                </div>
            )

            let displayValue: string;
            if (val >= 60000) {
                // Show in minutes
                displayValue = `${(val / 60000).toFixed(1)} m`;
            } else {
                // Show in seconds
                displayValue = `${(val / 1000).toFixed(1)} s`;
            }

            return (
                <div className="flex items-center justify-center gap-2">
                    <Badge className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800">
                        <Clock3 className="h-4 w-4" />
                        {displayValue}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "reason",
        header: "Disconnect Reason",
        cell: ({ cell }) => {
            let val = cell.getValue() as string;
            if (!val) {
                return (
                    <div className="flex items-center justify-center">
                        <span className="text-muted-foreground font-medium">-</span>
                    </div>
                )
            }
            return (
                <div className="flex items-center justify-center">
                    <Badge className={`inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800`}>
                        {val.replace(/_/g, " ")}
                    </Badge>
                </div>
            )
        }
    },
    {
        accessorKey: "sent",
        header: "Sent Data",
        cell: ({ cell }) => {
            let val = cell.getValue() as number;
            if (val === 0) {
                return (
                    <div className="flex items-center justify-center gap-2">
                        <span className="font-medium"> - </span>
                    </div>
                )
            }
            return (
                <div className="flex items-center justify-center gap-2">
                    <span className="font-medium"> {val} </span>
                </div>
            )
        }
    },
    {
        accessorKey: "recv",
        header: "Received Data",
        cell: ({ cell }) => {
            const val = cell.getValue() as number;
            if (!val) return (
                <div className="flex items-center justify-center gap-2">
                    <span className="text-muted-foreground justify-center text-sm">-</span>
                </div>
            )
            let displayValue: string;
            if (val >= 1024 * 1024) {
                // Show in MB
                displayValue = `${(val / (1024 * 1024)).toFixed(2)} MB`;
            } else {
                // Show in KB
                displayValue = `${(val / 1024).toFixed(1)} KB`;
            }

            return (
                <div className="flex items-center justify-center gap-2">
                    <Badge className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800">
                        {displayValue}
                    </Badge>
                </div>
            );
        },
    }

];
