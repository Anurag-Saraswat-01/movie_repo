import { query } from "../app.js";

export async function add(movie_id, user_id, rating) {
  const queryString =
    "INSERT INTO Ratings(movie_id, user_id, rating) OUTPUT Inserted.rating_id VALUES(?, ?, ?)";

  let result = await query(queryString, [movie_id, user_id, rating]);

  const rating_id = result?.recordset[0]?.rating_id;

  return rating_id;
}

export async function retrieve(movie_id, user_id) {
  const queryString =
    "SELECT rating FROM Ratings WHERE movie_id = ? AND user_id = ?";

  let result = await query(queryString, [movie_id, user_id]);

  return result?.recordset[0]?.rating;
}

export async function update(movie_id, user_id, rating) {
  const queryString =
    "UPDATE Ratings SET rating = ? WHERE movie_id = ? AND user_id = ?";

  let result = await query(queryString, [rating, movie_id, user_id]);

  console.log("Rating updated successfully");
}
