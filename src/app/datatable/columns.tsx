"use client";
import { Button } from "@/components/ui/button";
import { Person } from "@/people";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const columns: ColumnDef<Person>[] = [
  {
    header: "PersonID",
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
    cell: () => {
      return <Button>Click me</Button>;
    },
  },
];
