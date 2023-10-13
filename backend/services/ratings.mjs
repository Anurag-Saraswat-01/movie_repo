import { query } from "../app.js";

export async function add(movie_id, user_id, rating) {
  try {
    const queryString =
      "INSERT INTO Ratings(movie_id, user_id, rating) VALUES(?, ?, ?)";

    let result = await query(queryString, [movie_id, user_id, rating]);

    return { status: 201, message: "Rating added" };
  } catch (error) {
    console.error(error);
    return { status: 400, message: "Something went wrong" };
  }
}

export async function retrieve(movie_id, user_id) {
  const queryString =
    "SELECT rating FROM Ratings WHERE movie_id = ? AND user_id = ?";

  let result = await query(queryString, [movie_id, user_id]);

  return result?.recordset[0]?.rating;
}

export async function update(movie_id, user_id, rating) {
  try {
    const queryString =
      "UPDATE Ratings SET rating = ? WHERE movie_id = ? AND user_id = ?";

    let result = await query(queryString, [rating, movie_id, user_id]);

    console.log("Rating updated successfully");

    return { status: 200, message: "Rating updated successfully" };
  } catch (error) {
    console.error(error);
    return { status: 400, message: "Something went wrong" };
  }
}
