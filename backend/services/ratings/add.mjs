import { query } from "../../app.js";

export default async function add(movie_id, user_id, rating) {
  const queryString =
    "INSERT INTO Ratings(movie_id, user_id, rating) OUTPUT Inserted.rating_id VALUES(?, ?, ?)";

  let result = await query(queryString, [movie_id, user_id, rating]);

  const rating_id = result?.recordset[0]?.rating_id;

  return rating_id;
}
