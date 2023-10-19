// USAGE: npx tap tests\ratings\update.spec.js

import tap from "tap";
import update from "../../services/ratings/update.mjs";
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

const insertDummyRatingQuery =
  "INSERT INTO Ratings(movie_id, user_id, rating) OUTPUT Inserted.rating_id VALUES(?, ?, ?)";

const fetchRating = "SELECT * FROM Ratings WHERE rating_id = ?";

const deleteRating = "DELETE FROM Ratings WHERE rating_id = ?";

tap.test("Module Test", async (t) => {
  t.ok(update, "Function exists");
  t.end();
});

tap.test("Updating values", async (t) => {
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

  const ratingResult = await query(insertDummyRatingQuery, [
    movie_id,
    user_id,
    dummyRating,
  ]);
  const rating_id = ratingResult.recordset[0].rating_id;

  const updatedRating = 3;

  await update(movie_id, user_id, updatedRating);

  const result = await query(fetchRating, [rating_id]);
  t.equal(updatedRating, result.recordset[0].rating, "Rating updated");

  await query(deleteRating, [rating_id]);
  await query(deleteDummyMovieQuery, [movie_id]);
  await query(deleteDummyUserQuery, [user_id]);

  t.end();
});
