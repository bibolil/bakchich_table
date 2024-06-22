import { Person } from "./definitions";
import pool from "./postgres";
import { people } from "@/people";
export async function addPeople(people: Person[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    console.log("people", people[0], [
      people[0].firstname,
      people[0].lastname,
      people[0].email,
      people[0].gender,
      people[0].dateofbirth,
    ]);
    const insertedPeople = await Promise.all(
      people.map((person) => {
        console.log("person", person);
        if (
          !person.firstname ||
          !person.lastname ||
          !person.email ||
          !person.dateofbirth ||
          !person.gender
        ) {
          return {};
        }
        return client.query(
          `
            INSERT INTO people (firstname, lastname, email, gender, dateofbirth)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO NOTHING;
          `,
          [
            person.firstname,
            person.lastname,
            person.email,
            person.gender,
            person.dateofbirth,
          ]
        );
      })
    );
    await client.query("COMMIT");
    client.release();

    console.log(`Seeded ${insertedPeople.length} people`);
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to seed people:", error);
    return false;
  }
}

export async function fetchPeople() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM people limit 100");
    console.log("Fetched people:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch people:", error);
  } finally {
    client.release();
  }
}
