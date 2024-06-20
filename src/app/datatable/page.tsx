import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { people } from "@/people";

type Props = {};

const BakchichDataTable = (props: Props) => {
  return <DataTable columns={columns} data={people}></DataTable>;
};

export default BakchichDataTable;
