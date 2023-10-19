import query from "../../query.mjs";

export default async function retrieve() {
  const queryString = "SELECT * FROM Directors ORDER BY director_name";

  let result = await query(queryString);

  // console.log(result.recordset);

  let directors = result.recordset.map((res) => ({
    value: res.director_id,
    label: res.director_name,
  }));

  return directors;
}
