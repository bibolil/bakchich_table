"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { downloadToExcel } from "@/lib/xlsx";
import { isValidHeaderFormat } from "@/lib/utils";
import { uploadCSV } from "@/lib/action";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TDATA, TValue>({
  columns,
  data,
}: DataTableProps<TDATA, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [people, setPeople] = useState(data);
  const table = useReactTable({
    data: people,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    let header = "";
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        const s = reader.result as string;
        header = s.split("\n")[0];
        if (!isValidHeaderFormat(header)) {
          alert("Invalid header format");
          return;
        }
        console.log("data", s);
        const dataUpload = await uploadCSV(s);
        if (dataUpload) {
          setPeople([...dataUpload, ...people]);
        }
      };
      reader.readAsText(uploadedFile);
    }
  };

  return (
    <div>
      {/* input */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter First names"
          value={
            (table.getColumn("firstname")?.getFilterValue() as string) || ""
          }
          onChange={(e) => {
            table.getColumn("firstname")?.setFilterValue(e.target.value);
          }}
          className="max-w-sm"
        />
        {/* except import */}
        <div className="ml-4">
          <Button
            onClick={() => {
              document.getElementById("csv")?.click();
            }}
          >
            Upload
          </Button>
          <Input
            id="csv"
            type="file"
            style={{ display: "none" }}
            onInput={handleFileChange}
          />
        </div>
        {/*excel export button*/}
        <Button className="ml-4" onClick={() => downloadToExcel()}>
          Export
        </Button>
        {/*toggle */}
        <ThemeToggle className="ml-auto" />
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground pl-2">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </div>
    </div>
  );
}
