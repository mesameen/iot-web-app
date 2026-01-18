"use client";
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { commandsColumns } from "./columns";
import { AppTable } from "../app-table";
import { useEffect, useMemo, useState } from "react";
import { useGetCommandsQuery, useLazyGetCommandsQuery } from "@/store/api/commands.api";
import { GetCommandsRequest } from "@/model/commands";
import { ConnectionFilters } from "../connections/filters";

export const CommandsComponent = () => {
    const [getComandsQuery, { data, isFetching, error }] = useLazyGetCommandsQuery();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const safeData = useMemo(() => data ?? [], [data]);

    const table = useReactTable({
        data: safeData,
        columns: commandsColumns,
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
        const defaultRequest: GetCommandsRequest = {
            imei: "",
            tenant_group_id: "",
            from: 0,
            to: 0
        };
        getComandsQuery(defaultRequest)
    }, []);
    if (error) {
        return (
            <div className="p-4 text-red-500">
                Failed to load Commands data
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
                    <ConnectionFilters
                        loading={isFetching}
                        onSubmit={useGetCommandsQuery}
                    ></ConnectionFilters>
                    <AppTable
                        columns={commandsColumns}
                        data={data}
                        table={table}
                    ></AppTable>
                </div>
            </div>
        </div>
    )
}

