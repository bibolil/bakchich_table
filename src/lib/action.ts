"use server";
import { addPeople, fetchPeople } from "./data";
import { parseCsv } from "./utils";

export async function uploadCSV(file: string) {
  const data = parseCsv(file);
  console.log("action", data[0]);
  let peopleAdded = await addPeople(data);
  console.log(peopleAdded);
  return peopleAdded ? data : null;
}
