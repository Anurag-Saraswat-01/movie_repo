import query from "../../query.mjs";

export default async function add(genre_name) {
  const queryString =
    "INSERT INTO Genre(genre_name) OUTPUT Inserted.genre_id VALUES(?)";

  let result = await query(queryString, [genre_name]);

  return result?.recordset[0]?.genre_id;
}
