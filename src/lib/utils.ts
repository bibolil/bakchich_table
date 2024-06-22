import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidHeaderFormat(input: string): boolean {
  const expectedFormat = "id,firstname,lastname,email,gender,dateofbirth";

  const inputFields = input.split(",").map((field) => field.trim());

  const expectedFields = expectedFormat.split(",");

  if (inputFields.length !== expectedFields.length) {
    return false;
  }

  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i] !== expectedFields[i]) {
      return false;
    }
  }

  return true;
}

export function parseCsv(csvString: string) {
  const lines = csvString.split("\n");
  const headers = lines[0].split(",");
  const data = lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
  return data;
}

export function dateFormatter(date: Date) {
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}`;

  return formattedDate;
}
