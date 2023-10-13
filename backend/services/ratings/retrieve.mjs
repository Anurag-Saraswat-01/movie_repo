import { query } from "../../app.js";

export default async function retrieve(movie_id, user_id) {
  const queryString =
    "SELECT rating FROM Ratings WHERE movie_id = ? AND user_id = ?";

  let result = await query(queryString, [movie_id, user_id]);

  return result?.recordset[0]?.rating;
}
