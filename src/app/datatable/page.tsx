import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { fetchPeople } from "@/lib/data";

const BakchichDataTable = async () => {
  const people = (await fetchPeople()) ?? [];
  return (
    <div className="container py-10 mx-auto">
      <DataTable columns={columns} data={people}></DataTable>
    </div>
  );
};

export default BakchichDataTable;
