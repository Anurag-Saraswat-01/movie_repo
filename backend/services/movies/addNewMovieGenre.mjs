import query from "../../query.mjs";

// insert new movie genre pair into db
export async function addNewMovieGenre(movie_id, genre_id) {
  // try {
  const queryString =
    "INSERT INTO Movie_Genre(movie_id, genre_id) OUTPUT Inserted.movie_genre_id VALUES(?, ?)";

  let result = await query(queryString, [movie_id, genre_id]);
  const movie_genre_id = result?.recordset[0]?.movie_genre_id;

  console.log("Movie-genre added", { movie_id, genre_id });
  return movie_genre_id;
  // } catch (error) {
  //   console.error(error);
  // }
}
