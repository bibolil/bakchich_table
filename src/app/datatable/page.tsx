import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { fetchPeople } from "@/lib/data";

type Props = {};

const BakchichDataTable = async (props: Props) => {
  const people = (await fetchPeople()) ?? [];
  return (
    <div className="container py-10 mx-auto">
      <DataTable columns={columns} data={people}></DataTable>
    </div>
  );
};

export default BakchichDataTable;
