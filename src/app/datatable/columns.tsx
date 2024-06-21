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
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
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
          Person ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "id",
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Date of Birth",
    accessorKey: "dateOfBirth",
    cell: ({ row }) => {
      const date_of_birth = row.getValue("dateOfBirth");
      const formatted = new Date(date_of_birth as string).toLocaleDateString();
      return React.createElement(
        "div",
        { className: "font-medium" },
        formatted
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const person = row.original;
      const personId = person.id;
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
