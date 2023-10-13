import { query } from "../../app.js";

export default async function update(movie_id, user_id, rating) {
  const queryString =
    "UPDATE Ratings SET rating = ? WHERE movie_id = ? AND user_id = ?";

  let result = await query(queryString, [rating, movie_id, user_id]);

  console.log("Rating updated successfully");
}
