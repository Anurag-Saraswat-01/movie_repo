// USAGE: npx tap tests\movies\addNewMovieGenre.spec.js

import tap from "tap";
import { addNewMovieGenre } from "../../services/movies/addNewMovieGenre.mjs";
import query from "../../query.mjs";

const fetchGenreQuery = "SELECT TOP 1 genre_id FROM Genre";

const fetchMovieQuery = "SELECT TOP 1 movie_id FROM Movies";

const fetchMovieGenreQuery =
  "SELECT movie_genre_id FROM Movie_Genre WHERE movie_id = ? AND genre_id = ?";

const deleteMovieQuery = "DELETE FROM Movie_Genre WHERE movie_genre_id = ?";

const genre_result = await query(fetchGenreQuery);
const genre_id = genre_result.recordset[0].genre_id;
const movie_result = await query(fetchMovieQuery);
const movie_id = movie_result.recordset[0].movie_id;

tap.test("Module Test", async (t) => {
  t.ok(addNewMovieGenre, "Function exists");
  t.end();
});

tap.test("Inserting new Movie Genre", async (t) => {
  const movie_genre_id = await addNewMovieGenre(movie_id, genre_id);

  const result = await query(fetchMovieGenreQuery, [movie_id, genre_id]);

  t.ok(result, "Result received");
  t.equal(
    movie_genre_id,
    result.recordset.slice(-1)[0].movie_genre_id,
    "Movie Genre Id matches"
  );

  await query(deleteMovieQuery, [movie_genre_id]);
});

tap.test("Inserting null values", async (t) => {
  t.rejects(
    () => addNewMovieGenre(null, genre_id),
    Error(
      "Cannot insert the value NULL into column 'movie_id', table 'movie_repo.dbo.Movie_Genre'; column does not allow nulls. INSERT fails."
    ),
    "Expected to fail cause inserting null movie id"
  );

  t.rejects(
    () => addNewMovieGenre(movie_id, null),
    Error(
      "Cannot insert the value NULL into column 'genre_id', table 'movie_repo.dbo.Movie_Genre'; column does not allow nulls. INSERT fails."
    ),
    "Expected to fail cause inserting null genre id"
  );

  t.end();
});
