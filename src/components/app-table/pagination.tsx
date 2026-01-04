import { Table } from "@tanstack/react-table";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface AppTablePaginationProps<TRow> {
    table: Table<TRow>
}

export function AppTablePagination<TRow>({ table }: AppTablePaginationProps<TRow>) {
    return (
        <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                {table.getFilteredSelectedRowModel().rows.length} of {" "}
                {table.getFilteredRowModel().rows.length} row(s) selected
            </div>
            <div className="flex w-full items-center lg:w-fit gap-8">
                <div className="items-center lg:flex gap-2">
                    <Label className=" text-sm font-medium">
                        Rows per page
                    </Label>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => +
                            table.setPageSize(Number(value))
                        }
                    >
                        <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                            <SelectValue
                                placeholder={table.getState().pagination.pageSize}
                            ></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-fit items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of {" "}
                    {table.getPageCount()}
                </div>
                <div className="flex gap-2 ml-auto items-center lg:ml-0">
                    <Button
                        variant={"outline"}
                        className="hidden h-8 w-8 p-0 lg:flex"
                        size={"icon"}
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeft></ChevronsLeft>
                    </Button>
                    <Button
                        variant={"outline"}
                        className="h-8 w-8 p-0 lg:flex"
                        size={"icon"}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft></ChevronLeft>
                    </Button>
                    <Button
                        variant={"outline"}
                        className="h-8 w-8 p-0 lg:flex"
                        size={"icon"}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight></ChevronRight>
                    </Button>
                    <Button
                        variant={"outline"}
                        className="hidden h-8 w-8 p-0 lg:flex"
                        size={"icon"}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRight></ChevronsRight>
                    </Button>
                </div>
            </div>
        </div>
    );
}