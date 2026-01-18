"use client";
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { connectionsColumns } from "./columns";
import { AppTable } from "../app-table";
import { ConnectionFilters } from "./filters";
import { useEffect, useMemo, useState } from "react";
import { useLazyGetConnectionsDataQuery } from "@/store/api/connections.api";
import { ConnectionsRequest } from "@/model/connections";

export const ConnectionsComponent = () => {
    const [getConnectionsData, { data, isFetching, error }] = useLazyGetConnectionsDataQuery();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const safeData = useMemo(() => data ?? [], [data]);

    const table = useReactTable({
        data: safeData,
        columns: connectionsColumns,
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
        const defaultRequest: ConnectionsRequest = {
            imei: "",
            tenantGroupId: "",
            from: 0,
            to: 0
        };
        getConnectionsData(defaultRequest)
    }, []);
    if (error) {
        return (
            <div className="p-4 text-red-500">
                Failed to load Connections info
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
                    <ConnectionFilters
                        loading={isFetching}
                        onSubmit={getConnectionsData}
                    ></ConnectionFilters>
                    <AppTable
                        columns={connectionsColumns}
                        data={data}
                        table={table}
                    ></AppTable>
                </div>
            </div>
        </div>
    )
}

