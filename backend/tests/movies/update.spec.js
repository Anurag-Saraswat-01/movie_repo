// USAGE: npx tap tests\movies\update.spec.js

import tap from "tap";
import update from "../../services/movies/update.mjs";
import query from "../../query.mjs";

const directorQuery = "SELECT TOP 1 director_id FROM Directors";
const director_result = await query(directorQuery);
const director_id = director_result.recordset[0].director_id;

const movie_name = "dummy movie";
const release_date = new Date().toLocaleDateString();
const rated = "PG-13";
const runtime = 100;

const insertDummyQuery =
  "INSERT INTO Movies(movie_name, file_path, release_date, rated, runtime, director_id) OUTPUT Inserted.movie_id VALUES(?, NULL, ?, ?, ?, ?)";

const fetchDummyQuery = "SELECT * FROM Movies WHERE movie_id = ?";

const deleteDummyQuery = "DELETE FROM Movies WHERE movie_id = ?";

const updatedDirectorQuery =
  "SELECT TOP 1 director_id FROM Directors ORDER BY director_id DESC";

tap.test("Module Test", async (t) => {
  t.ok(update, "Function exists");
  t.end();
});

tap.test("Updating values", async (t) => {
  const result = await query(insertDummyQuery, [
    movie_name,
    release_date,
    rated,
    runtime,
    director_id,
  ]);
  const movie_id = result.recordset[0].movie_id;

  let updatedMovie;

  //   updated movie name
  const updated_movie_name = "updated movie";
  await update(movie_id, "movie_name", updated_movie_name);
  updatedMovie = await query(fetchDummyQuery, [movie_id]);
  t.equal(
    updated_movie_name,
    updatedMovie.recordset[0].movie_name,
    "Movie name updated"
  );

  //   updated director id
  const updated_director_result = await query(updatedDirectorQuery);
  const updated_director_id = updated_director_result.recordset[0].director_id;
  await update(movie_id, "director_name", updated_director_id);
  updatedMovie = await query(fetchDummyQuery, [movie_id]);
  t.equal(
    updated_director_id,
    updatedMovie.recordset[0].director_id,
    "Director updated"
  );

  //   updated release date
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const updated_release_date = d.toLocaleDateString();
  await update(movie_id, "release_date", updated_release_date);
  updatedMovie = await query(fetchDummyQuery, [movie_id]);

  const received_date = new Date(
    updatedMovie.recordset[0].release_date
  ).toLocaleDateString();
  t.equal(updated_release_date, received_date, "Release Date updated");

  //   updated rated
  const updated_rated = "PG";
  await update(movie_id, "rated", updated_rated);
  updatedMovie = await query(fetchDummyQuery, [movie_id]);
  t.equal(updated_rated, updatedMovie.recordset[0].rated, "Rated updated");

  //   updated runtime
  const updated_runtime = 200;
  await update(movie_id, "runtime", updated_runtime);
  updatedMovie = await query(fetchDummyQuery, [movie_id]);
  t.equal(
    updated_runtime,
    updatedMovie.recordset[0].runtime,
    "Runtime updated"
  );

  await query(deleteDummyQuery, [movie_id]);
  t.end();
});

tap.test("Updating with null values", async (t) => {
  const result = await query(insertDummyQuery, [
    movie_name,
    release_date,
    rated,
    runtime,
    director_id,
  ]);
  const movie_id = result.recordset[0].movie_id;

  t.rejects(
    () => update(movie_id, "movie_name", null),
    Error(
      `Cannot insert the value NULL into column 'movie_name', table 'movie_repo.dbo.Movies'; column does not allow nulls. UPDATE fails.`
    ),
    "Expected to fail cause inserting null movie name"
  );

  t.rejects(
    () => update(movie_id, "director_name", null),
    Error(
      `Cannot insert the value NULL into column 'director_id', table 'movie_repo.dbo.Movies'; column does not allow nulls. UPDATE fails.`
    ),
    "Expected to fail cause inserting null director id"
  );
});
