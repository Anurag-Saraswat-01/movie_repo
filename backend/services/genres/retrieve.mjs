import { query } from "../../app.js";

export default async function retrieve() {
  const queryString = "SELECT * FROM Genre ORDER BY genre_name";

  let result = await query(queryString);

  // console.log(result.recordset);

  let genres = result.recordset.map((res) => ({
    value: res.genre_id,
    label: res.genre_name,
  }));

  return genres;
}
