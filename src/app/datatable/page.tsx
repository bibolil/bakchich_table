import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { people } from "@/people";

type Props = {};

const BakchichDataTable = (props: Props) => {
  return (
    <div className="container py-10 mx-auto">
      <DataTable columns={columns} data={people}></DataTable>
    </div>
  );
};

export default BakchichDataTable;
