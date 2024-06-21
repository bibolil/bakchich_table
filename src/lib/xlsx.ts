import xlsx, { IJsonSheet } from "json-as-xlsx";
import { people } from "@/people";

export function downloadToExcel() {
  let columns: IJsonSheet[] = [
    {
      sheet: "Persons",
      columns: [
        { label: "Person ID", value: "id" },
        { label: "First Name", value: "firstName" },
        { label: "Last Name", value: "lastName" },
        { label: "Email", value: "email" },
        { label: "Gender", value: "gender" },
        { label: "Date of Birth", value: "dateOfBirth" },
      ],
      content: people,
    },
  ];

  let settings = {
    fileName: "Excel",
  };

  xlsx(columns, settings);
}
