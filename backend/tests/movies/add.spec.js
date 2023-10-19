// USAGE: npx tap tests\movies\add.spec.js

import tap from "tap";
import add from "../../services/movies/add.mjs";
import query from "../../query.mjs";

const fetchQuery = "SELECT * FROM Movies WHERE movie_id = ?";

const deleteMovieQuery = "DELETE FROM Movies WHERE movie_id = ?";

const deleteMovieGenreQuery = "DELETE FROM Movie_Genre WHERE movie_id = ?";

const directorQuery = "SELECT TOP 1 director_id FROM Directors";

const genreQuery = "SELECT TOP 1 genre_id FROM Genre";

const userQuery = "SELECT TOP 1 user_id FROM Users";

const director_result = await query(directorQuery);
const director_id = director_result.recordset[0].director_id;
const genre_result = await query(genreQuery);
const genre_id_list = [genre_result.recordset[0].genre_id];
const user_result = await query(userQuery);
const user_id = user_result.recordset[0].user_id;
const movie_name = "dummy movie";
const release_date = new Date().toLocaleDateString();
const rated = "PG-13";
const runtime = 100;
const file = null;

tap.test("Module Test", async (t) => {
  t.ok(add, "Function exists");
  t.end();
});

tap.test("Insert new movie", async (t) => {
  const movie_id = await add(
    movie_name,
    release_date,
    rated,
    runtime,
    director_id,
    genre_id_list,
    user_id,
    file
  );

  const result = await query(fetchQuery, [movie_id]);

  t.ok(result, "Result received");
  t.equal(movie_name, result.recordset[0].movie_name, "Movie name matches");

  await query(deleteMovieGenreQuery, [movie_id]);
  await query(deleteMovieQuery, [movie_id]);

  t.end();
});

tap.test("Inserting null values", async (t) => {
  t.rejects(
    () =>
      add(
        null,
        release_date,
        rated,
        runtime,
        director_id,
        genre_id_list,
        user_id,
        file
      ),
    Error(
      `Cannot insert the value NULL into column 'movie_name', table 'movie_repo.dbo.Movies'; column does not allow nulls. INSERT fails.`
    ),
    "Expected to fail cause inserting null movie_name"
  );

  t.rejects(
    () =>
      add(
        movie_name,
        release_date,
        rated,
        runtime,
        null,
        genre_id_list,
        user_id
      ),
    Error(
      `Cannot insert the value NULL into column 'director_id', table 'movie_repo.dbo.Movies'; column does not allow nulls. INSERT fails.`
    ),
    "Expected to fail cause inserting null director_id"
  );

  t.end();
});

tap.test("Inserting wrong Foreign Keys", async (t) => {
  t.rejects(
    () =>
      add(movie_name, release_date, rated, runtime, 0, genre_id_list, user_id),
    Error(
      `The INSERT statement conflicted with the FOREIGN KEY constraint "FK__Movies__director__38996AB5". The conflict occurred in database "movie_repo", table "dbo.Directors", column 'director_id'.`
    ),
    "Expected to fail cause inserting absent director_id"
  );

  t.rejects(
    () =>
      add(
        movie_name,
        release_date,
        rated,
        runtime,
        director_id,
        genre_id_list,
        0
      ),
    Error(
      `The INSERT statement conflicted with the FOREIGN KEY constraint "FK__Movies__user_id__5629CD9C". The conflict occurred in database "movie_repo", table "dbo.Users", column 'user_id'.`
    ),
    "Expected to fail cause inserting absent user_id"
  );

  t.end();
});
