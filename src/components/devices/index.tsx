"use client";
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { registeredDevicesColumns } from "./columns";
import { AppTable } from "../app-table";
import { useEffect, useMemo, useState } from "react";
import { useLazyGetRegisteredDevicesQuery } from "@/store/api/devices.api";
import { RegisteredDevicesRequest } from "@/model/registered_devices";
import { RegisteredDevicesFilters } from "./filters";

export const RegisteredDevicesComponent = () => {
    const [getRegisteredDevices, { data, isFetching, error }] = useLazyGetRegisteredDevicesQuery();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const safeData = useMemo(()=>data ?? [], [data]);
    const table = useReactTable({
        data: safeData,
        columns: registeredDevicesColumns,
        state: {
            sorting,
            columnFilters
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
    })
    // Fetch default data on mount
    useEffect(() => {
        const defaultRequest: RegisteredDevicesRequest = {
            imei: "",
            tenant_group_id: "",
            from: 0,
            to: 0
        };
        getRegisteredDevices(defaultRequest)
    }, []);
    if (error) {
        return (
            <div className="p-4 text-red-500">
                Failed to load registered devices
            </div>
        )
    }
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
                    <RegisteredDevicesFilters
                        loading={isFetching}
                        onSubmit={getRegisteredDevices}
                    ></RegisteredDevicesFilters>
                    <AppTable
                        columns={registeredDevicesColumns}
                        data={data}
                        table={table}
                    ></AppTable>
                </div>
            </div>
        </div>
    )
}

