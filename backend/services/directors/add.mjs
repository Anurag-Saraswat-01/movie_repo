import query from "../../query.mjs";

export default async function add(director_name) {
  const queryString =
    "INSERT INTO Directors(director_name) OUTPUT Inserted.director_id VALUES(?)";

  let result = await query(queryString, [director_name]);

  return result?.recordset[0]?.director_id;
}
