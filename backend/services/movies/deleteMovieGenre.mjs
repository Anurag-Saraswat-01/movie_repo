import { query } from "../../app.js";

// delete new movie genre pair into db
export async function deleteMovieGenre(movie_id, genre_id) {
  try {
    const queryString =
      "DELETE FROM Movie_Genre WHERE movie_id = ? AND genre_id = ?";

    let result = await query(queryString, [movie_id, genre_id]);

    console.log("Movie-genre deleted", { movie_id, genre_id });
  } catch (error) {
    console.error(error);
  }
}
