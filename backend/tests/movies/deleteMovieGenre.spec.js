// USAGE: npx tap tests\movies\deleteMovieGenre.spec.js

import tap from "tap";
import { deleteMovieGenre } from "../../services/movies/deleteMovieGenre.mjs";
import query from "../../query.mjs";

const fetchTestMovieGenreQuery =
  "SELECT TOP 1 * FROM Movie_Genre ORDER BY movie_genre_id DESC";

const insertMovieGenreQuery =
  "INSERT INTO Movie_Genre(movie_id, genre_id) VALUES(?, ?)";

const fetchMovieGenreQuery =
  "SELECT * FROM Movie_Genre WHERE movie_id = ? AND genre_id = ?";

tap.test("Module Test", async (t) => {
  t.ok(deleteMovieGenre, "Function exists");
  t.end();
});

tap.test("Deleting data", async (t) => {
  const result = await query(fetchTestMovieGenreQuery);
  const { movie_genre_id, movie_id, genre_id } = result.recordset[0];
  //   console.log({ movie_genre_id, movie_id, genre_id });

  await deleteMovieGenre(movie_id, genre_id);

  const deleteResult = await query(fetchMovieGenreQuery, [movie_id, genre_id]);

  t.match(deleteResult.recordset, [], "Data Deleted successfully");

  //   console.log(deleteResult);

  await query(insertMovieGenreQuery, [movie_id, genre_id]);
});
