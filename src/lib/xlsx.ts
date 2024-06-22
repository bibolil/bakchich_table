import xlsx, { IJsonSheet } from "json-as-xlsx";
import { people } from "@/people";
export function downloadToExcel() {
  let columns: IJsonSheet[] = [
    {
      sheet: "Persons",
      columns: [
        { label: "id", value: "id" },
        { label: "firstname", value: "firstname" },
        { label: "lastname", value: "lastname" },
        { label: "email", value: "email" },
        { label: "gender", value: "gender" },
        { label: "dateofbirth", value: "dateofbirth" },
      ],
      content: people,
    },
  ];

  let settings = {
    fileName: "Excel",
  };

  xlsx(columns, settings);
}
