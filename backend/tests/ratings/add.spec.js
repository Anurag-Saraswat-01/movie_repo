// USAGE: npx tap tests\ratings\add.spec.js

import tap from "tap";
import add from "../../services/ratings/add.mjs";
import query from "../../query.mjs";

const directorQuery = "SELECT TOP 1 director_id FROM Directors";
const director_result = await query(directorQuery);
const director_id = director_result.recordset[0].director_id;

const movie_name = "dummy movie";
const release_date = new Date().toLocaleDateString();
const rated = "PG-13";
const runtime = 100;
const dummyRating = 5;

const insertDummyMovieQuery =
  "INSERT INTO Movies(movie_name, file_path, release_date, rated, runtime, director_id) OUTPUT Inserted.movie_id VALUES(?, NULL, ?, ?, ?, ?)";

const insertDummyUserQuery =
  "INSERT INTO Users(username, password) OUTPUT Inserted.user_id VALUES('dummy', 'dummy')";

const deleteDummyMovieQuery = "DELETE FROM Movies WHERE movie_id = ?";

const deleteDummyUserQuery = "DELETE FROM Users WHERE user_id = ?";

const fetchRating = "SELECT * FROM Ratings WHERE rating_id = ?";

const deleteRating = "DELETE FROM Ratings WHERE rating_id = ?";

tap.test("Module Test", async (t) => {
  t.ok(add, "Function exists");
  t.end();
});

tap.test("Inserting rating", async (t) => {
  const userResult = await query(insertDummyUserQuery);
  const user_id = userResult.recordset[0].user_id;

  const movieResult = await query(insertDummyMovieQuery, [
    movie_name,
    release_date,
    rated,
    runtime,
    director_id,
  ]);
  const movie_id = movieResult.recordset[0].movie_id;

  const rating_id = await add(movie_id, user_id, dummyRating);

  t.ok(rating_id, "Rating Inserted");

  const result = await query(fetchRating, [rating_id]);

  t.equal(movie_id, result.recordset[0].movie_id, "Movie ID matches");
  t.equal(user_id, result.recordset[0].user_id, "User ID matches");
  t.equal(dummyRating, result.recordset[0].rating, "Rating matches");

  await query(deleteRating, [rating_id]);
  await query(deleteDummyMovieQuery, [movie_id]);
  await query(deleteDummyUserQuery, [user_id]);

  t.end();
});

tap.test("Inserting null values", async (t) => {
  const userResult = await query(insertDummyUserQuery);
  const user_id = userResult.recordset[0].user_id;

  t.rejects(
    () => add(null, user_id, dummyRating),
    Error(
      "Cannot insert the value NULL into column 'movie_id', table 'movie_repo.dbo.Ratings'; column does not allow nulls. INSERT fails."
    ),
    "Expected to fail cause inserting null movie_id"
  );

  await query(deleteDummyUserQuery, [user_id]);

  const movieResult = await query(insertDummyMovieQuery, [
    movie_name,
    release_date,
    rated,
    runtime,
    director_id,
  ]);
  const movie_id = movieResult.recordset[0].movie_id;

  t.rejects(
    () => add(movie_id, null, dummyRating),
    Error(
      "Cannot insert the value NULL into column 'user_id', table 'movie_repo.dbo.Ratings'; column does not allow nulls. INSERT fails."
    ),
    "Expected to fail cause inserting null user_id"
  );
  await query(deleteDummyMovieQuery, [movie_id]);

  t.end();
});
