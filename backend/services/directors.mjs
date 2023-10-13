import { query } from "../app.js";

export async function retrieve() {
  const queryString = "SELECT * FROM Directors ORDER BY director_name";

  let result = await query(queryString);

  // console.log(result.recordset);

  let directors = result.recordset.map((res) => ({
    value: res.director_id,
    label: res.director_name,
  }));

  return directors;
}

export async function add(director_name) {
  const queryString =
    "INSERT INTO Directors(director_name) OUTPUT Inserted.director_id VALUES(?)";

  let result = await query(queryString, [director_name]);

  return result?.recordset[0]?.director_id;
}
