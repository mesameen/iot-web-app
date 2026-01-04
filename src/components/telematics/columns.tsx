import { GpsData, NetworkData, TelematicsData } from "@/model/telematics";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { ArrowUpDown, BatteryFull, BatteryLow, BatteryMedium, CircleGauge, Clock3, MapPin, Power, SignalHigh, SignalLow, SignalMedium, SignalZero, Zap } from "lucide-react";
import { IconBatteryVertical, IconBatteryVertical2, IconBatteryVertical3, IconBatteryVertical4 } from "@tabler/icons-react";
import { ElementType } from "react";
import { Button } from "../ui/button";

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

// function SortableHeader({})

export const telematicsColumns: ColumnDef<TelematicsData>[] = [
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
            if (imei == null) {
                return <span className="text-muted-foreground">-</span>
            }
            return (
                <div>
                    <span className="font-mono">{imei}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "device_datetime",
        enableSorting: true,
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Device Datetime
                    <ArrowUpDown></ArrowUpDown>
                </Button>
            )
        },
        cell: ({ cell }) => {
            let val = cell.getValue() as string | number;
            const date = new Date(val);
            const formattedDate = date.toLocaleDateString(undefined, {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit"
            });
            const formattedTime = date.toLocaleTimeString(undefined, {
                hour12: false
            })
            return (
                <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-muted-foreground"></Clock3>
                    <span className="font-medium">
                        {formattedDate} · {formattedTime}
                    </span>
                </div>
            );
        }
    },
    {
        id: "location",
        header: "Location",
        accessorFn: (row) => {
            return row.gps_data
        },
        cell: ({ getValue }) => {
            const gps = getValue() as GpsData;
            if (gps?.latitude == null || gps?.latitude == null) {
                return <span className="text-muted-foreground text-sm">-</span>
            }
            return (
                <div className="flex items-center gap-2 text-sm justify-start">
                    <MapPin className="h-4 w-4 text-muted-foreground"></MapPin>
                    <span className="font-mono text-foreground">
                        {gps.latitude.toFixed(5)}, {gps.longitude.toFixed(5)}
                    </span>
                </div>
            )
        }
    },
    {
        id: "signal",
        header: "Signal",
        accessorFn: (row) => row.network_data,
        cell: ({ getValue }) => {
            const network = getValue() as NetworkData;
            let Icon = SignalZero;
            let color = "text-red-500";
            if (network.signal_per >= 75) {
                Icon = SignalHigh;
                color = "text-green-500"
            } else if (network.signal_per >= 50) {
                Icon = SignalMedium;
                color = "text-yellow-500"
            } else if (network.signal_per >= 25) {
                Icon = SignalLow;
                color = "text-red-500"
            }
            return (
                <div className="flex items-center justify-center gap-1">
                    <Icon className={`h-4 w-4 ${color}`}></Icon>
                    <span className="text-sm font-mono">{network?.signal_per}%</span>
                </div>
            )
        }
    },
    {
        id: "battery",
        header: "Battery",
        accessorFn: (row) => row.sensor_data?.battery_per,
        cell: ({ getValue }) => {
            const battery = getValue() as number | undefined;
            if (battery == null) {
                return <span className="text-muted-foreground text-sm">-</span>
            }
            let Icon = BatteryLow;
            let color = "text-red-500"
            if (battery >= 75) {
                Icon = BatteryFull;
                color = "text-green-500";
            } else if (battery >= 50) {
                Icon = BatteryMedium;
                color = "text-yellow-500"
            } else if (battery >= 25) {
                Icon = BatteryLow;
                color = "text-orange-500"
            }
            return (
                <div className="flex items-center justify-center gap-1">
                    <Icon className={`h-4 w-4 ${color}`}></Icon>
                    <span className="text-sm font-mono">{battery}%</span>
                </div>
            )
        }
    },
    {
        id: "ignition",
        header: "Ignition",
        accessorFn: (row) => row.sensor_data?.ignition,
        cell: ({ getValue }) => {
            let ign = getValue() as boolean | undefined;
            if (ign == null) {
                return <span className="text-muted-foreground text-sm">-</span>
            }
            const color = ign ? "text-green-500" : "text-muted-foreground";
            const label = ign ? "ON" : "OFF";
            return (
                <div className="flex items-center justify-center gap-1">
                    <Power className={`w-4 h-4 ${color}`}></Power>
                    <span className="text-sm font-medium">{label}</span>
                </div>
            )
        }
    },
    {
        id: "fuel",
        header: "Fuel",
        accessorFn: (row) => row.sensor_data?.fuel_level_per,
        cell: ({ getValue }) => {
            const fuel = getValue() as number | undefined;

            if (fuel == null) {
                return <span className="text-muted-foreground text-sm">-</span>;
            }

            let Icon = IconBatteryVertical;
            let color = "text-red-500";

            if (fuel >= 75) {
                Icon = IconBatteryVertical4;
                color = "text-green-500";
            } else if (fuel >= 50) {
                Icon = IconBatteryVertical3;
                color = "text-yellow-500";
            } else if (fuel >= 25) {
                Icon = IconBatteryVertical2;
                color = "text-orange-500";
            }

            return (
                <div className="flex items-center justify-center gap-2 min-w-18">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className="text-sm font-mono tabular-nums">
                        {fuel.toString().padStart(3, " ")}%
                    </span>
                </div>
            );
        },
    },
    {
        id: "speed",
        header: "Speed",
        accessorFn: (row) => row.sensor_data?.speed,
        cell: ({ getValue }) => {
            const speed = getValue() as number | undefined;
            if (speed == null) {
                return <span className="text-muted-foreground text-sm">-</span>
            }
            let speedInKm = speed / 1000;
            return (
                <div className="flex items-center gap-1">
                    <CircleGauge className="w-4 h-4 text-foreground/70"></CircleGauge>
                    <span className="text-sm font-mono">{speedInKm.toFixed(1)} km/h</span>
                </div>
            )
        }
    }
];
