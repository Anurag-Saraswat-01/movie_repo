import query from "../../query.mjs";

export default async function update(movie_id, column, value) {
  const columnFieldMap = {
    movie_name: "movie_name",
    director_name: "director_id",
    release_date: "release_date",
    rated: "rated",
    runtime: "runtime",
  };

  const queryString = `UPDATE Movies SET ${columnFieldMap[column]} = ? WHERE movie_id = ?`;

  let result = await query(queryString, [value, movie_id]);

  console.log(`${column} updated successfully`);
}
