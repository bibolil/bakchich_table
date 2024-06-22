"use client";
import { Button } from "@/components/ui/button";
import { Person } from "@/people";
import { ColumnDef } from "@tanstack/react-table";
import React, { useRef, useState } from "react";
import { ArrowUpDown, Trash2, Pencil, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { deletePeople, updatePerson } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    cell: ({ table, row }) => {
      const dateOfBirthRef = useRef<HTMLInputElement>(null);
      const firstnameRef = useRef<HTMLInputElement>(null);
      const lastnameRef = useRef<HTMLInputElement>(null);
      const genderRef = useRef<HTMLInputElement>(null);
      const [editOpen, setEditOpen] = useState(false);
      return (
        <div className="flex gap-1">
          <Popover open={editOpen} onOpenChange={setEditOpen}>
            <PopoverTrigger asChild>
              <Button onClick={() => console.log(row.getValue("id"))}>
                <Pencil />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Person props</h4>
                  <p className="text-sm text-muted-foreground">
                    Update person props.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="firstname">firstname</Label>
                    <Input
                      id="firstname"
                      defaultValue={row.getValue("firstname")}
                      className="col-span-2 h-8"
                      ref={firstnameRef}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="lastname">lastname</Label>
                    <Input
                      id="lastname"
                      defaultValue={row.getValue("lastname")}
                      className="col-span-2 h-8"
                      ref={lastnameRef}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="gender">gender</Label>
                    <Input
                      id="gender"
                      defaultValue={row.getValue("gender")}
                      className="col-span-2 h-8"
                      ref={genderRef}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="dateofbirth">dateofbirth</Label>
                    <Input
                      id="dateofbirth"
                      defaultValue={row.getValue("dateofbirth")}
                      className="col-span-2 h-8"
                      ref={dateOfBirthRef}
                    />
                  </div>
                  <div className="flex justify-center pt-5">
                    <Button
                      onClick={async () => {
                        console.log("input values");

                        const updatedata: string[] = [
                          row.getValue("id"),
                          firstnameRef.current?.value || "",
                          lastnameRef.current?.value || "",
                          genderRef.current?.value || "",
                          dateOfBirthRef.current?.value || "",
                        ];
                        /*test if not empty*/
                        await updatePerson(updatedata);
                        setEditOpen(false);
                      }}
                    >
                      save
                    </Button>
                    <Button
                      className="ml-2"
                      onClick={() => {
                        setEditOpen(false);
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            onClick={async () => {
              console.log("deleting");
              let selectedRows = table.getSelectedRowModel().rows;
              let idx: string[] = [];
              if (selectedRows.length) {
                selectedRows.map((row) => idx.push(row.getValue("id")));
              }
              if (idx.length) {
                console.log("deleting", idx);
                let deletedPeople = await deletePeople(idx);
                if (deletedPeople) {
                  /*update UI*/
                }
              }
            }}
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
