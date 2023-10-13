import { query } from "../../app.js";

// insert new movie genre pair into db
export async function addNewMovieGenre(movie_id, genre_id) {
  try {
    const queryString =
      "INSERT INTO Movie_Genre(movie_id, genre_id) VALUES(?, ?)";

    let result = await query(queryString, [movie_id, genre_id]);

    console.log("Movie-genre added", { movie_id, genre_id });
  } catch (error) {
    console.error(error);
  }
}
