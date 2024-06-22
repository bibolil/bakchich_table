import { fetchPeople } from "@/lib/data";

export default async function test() {
  const ata = await fetchPeople();
  return (
    <div>
      <h1>Test</h1>
      <p>{JSON.stringify(ata)}</p>
    </div>
  );
}
