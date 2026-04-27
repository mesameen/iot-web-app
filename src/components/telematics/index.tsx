"use client";
import { useLazyGetTelematicsDataQuery } from "@/store/api/telematics.api"
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { telematicsColumns } from "./columns";
import { AppTable } from "../app-table";
import { TelematicsFilters } from "./filters";
import { useEffect, useMemo, useState } from "react";
import { TelematicsDataRequest } from "@/model/telematics";
import { AlertCircle } from "lucide-react";
import { useLazyGetRecentTelematicsDataQuery } from "@/store/api/recent_telematics.api";

export const TelematicsComponent = () => {
    const [getTelematicsData, { data, isFetching, isError, error }] = useLazyGetTelematicsDataQuery();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const safeData = useMemo(() => data ?? [], [data]);
    const table = useReactTable({
        data: safeData,
        columns: telematicsColumns,
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
        const defaultRequest: TelematicsDataRequest = {
            imei: "",
            tenantGroupId: "",
            from: 0,
            to: 0
        };
        getTelematicsData(defaultRequest)
    }, []);
    if (error) {
        return (
            <div className="p-4 text-red-500">
                Failed to load telematics data
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col">
            {error && (
                <div className="flex items-center gap-2 p-4 mb-2 bg-red-100 text-red-800 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Failed to load telematics data. Showing table anyway.</span>
                </div>
            )}
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
                    <TelematicsFilters
                        loading={isFetching}
                        onSubmit={getTelematicsData}
                    ></TelematicsFilters>
                    <AppTable
                        columns={telematicsColumns}
                        data={data}
                        table={table}
                    ></AppTable>
                </div>
            </div>
        </div>
    )
}

export const RecentTelematicsComponent = () => {
    const [getRecentTelematicsData, { data, isFetching, isError, error }] = useLazyGetRecentTelematicsDataQuery();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const safeData = useMemo(() => data ?? [], [data]);
    const table = useReactTable({
        data: safeData,
        columns: telematicsColumns,
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
        const defaultRequest: TelematicsDataRequest = {
            imei: "",
            tenantGroupId: "",
            from: 0,
            to: 0
        };
        getRecentTelematicsData(defaultRequest)
    }, []);
    if (error) {
        return (
            <div className="p-4 text-red-500">
                Failed to load telematics data
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col">
            {error && (
                <div className="flex items-center gap-2 p-4 mb-2 bg-red-100 text-red-800 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Failed to load telematics data. Showing table anyway.</span>
                </div>
            )}
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
                    <TelematicsFilters
                        loading={isFetching}
                        onSubmit={getRecentTelematicsData}
                    ></TelematicsFilters>
                    <AppTable
                        columns={telematicsColumns}
                        data={data}
                        table={table}
                    ></AppTable>
                </div>
            </div>
        </div>
    )
}