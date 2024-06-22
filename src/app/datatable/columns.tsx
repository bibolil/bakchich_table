"use client";
import { Button } from "@/components/ui/button";
import { Person } from "@/people";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: any) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => {
            row.toggleSelected(!!value);
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "id",
  },
  {
    header: "firstname",
    accessorKey: "firstname",
  },
  {
    header: "lastname",
    accessorKey: "lastname",
  },
  {
    header: "email",
    accessorKey: "email",
  },
  {
    header: "gender",
    accessorKey: "gender",
  },
  {
    header: "dateofbirth",
    accessorKey: "dateofbirth",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const person = row.original;
      return (
        <div className="flex gap-1">
          <Button>
            <Pencil />
          </Button>
          <Button>
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
