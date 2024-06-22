"use server";

import { Person } from "./definitions";
import pool from "./postgres";

export async function addPeople(people: Person[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const insertedPeople = await Promise.all(
      people.map((person) => {
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

export async function updatePerson(updateData: string[]) {
  console.log("UPDATING", updateData);
  const client = await pool.connect();
  try {
    const query = `
      UPDATE people
      SET firstname = $1,
          lastname = $2,
          gender = $3,
          dateofbirth = TO_TIMESTAMP($4, 'YYYY-MM-DD HH24:MI:SS') 
      WHERE id = $5;
    `;
    // Make sure the `updateData` array contains elements in the correct order:
    // [firstname, lastname, email, gender, dateofbirth, id]
    const res = await client.query(query, updateData);
    console.log("updated person.", res);
    return true;
  } catch (error) {
    console.error("Failed to update person:", error);
    return false;
  } finally {
    client.release();
  }
}

export async function deletePeople(idArray: string[]) {
  const client = await pool.connect();
  try {
    const query = `DELETE FROM people WHERE id = ANY($1);`;
    const res = await client.query(query, [idArray]);
    console.log(`Deleted ${res.rowCount} people.`);
    return true;
  } catch (error) {
    console.error("Failed to delete people:", error);
    return false;
  } finally {
    client.release();
  }
}

export async function fetchPeople() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM people limit 100");
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch people:", error);
  } finally {
    client.release();
  }
}
