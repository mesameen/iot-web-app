"use client";
import { useLazyGetTelematicsDataQuery } from "@/store/api/telematics.api"
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { telematicsColumns } from "./columns";
import { AppTable } from "../app-table";
import { TelematicsFilters } from "./filters";
import { useEffect, useState } from "react";
import { TelematicsDataRequest } from "@/model/telematics";

export const TelematicsComponent = () => {
    const [getTelematicsData, { data, isFetching }] = useLazyGetTelematicsDataQuery();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data: data ?? [],
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
    return (
        <div className="flex flex-1 flex-col">
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

