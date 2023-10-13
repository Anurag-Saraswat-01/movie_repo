import { query } from "../app.js";

export async function retrieve() {
  const queryString = "SELECT * FROM Genre ORDER BY genre_name";

  let result = await query(queryString);

  // console.log(result.recordset);

  let genres = result.recordset.map((res) => ({
    value: res.genre_id,
    label: res.genre_name,
  }));

  return genres;
}

export async function add(genre_name) {
  const queryString =
    "INSERT INTO Genre(genre_name) OUTPUT Inserted.genre_id VALUES(?)";

  let result = await query(queryString, [genre_name]);

  return result?.recordset[0]?.genre_id;
}
