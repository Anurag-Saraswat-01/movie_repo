import { query } from "../app.js";
import downloadPoster from "../utils/DownloadPoster.mjs";
import generateFilePath from "../utils/GenerateFilePath.mjs";

export async function add(
  movie_name,
  release_date,
  rated,
  runtime,
  director_id,
  genre_id_list,
  user_id
) {
  const filePath = req.file ? generateFilePath(movie_name) : null;

  const queryString = `INSERT INTO Movies(movie_name, release_date, rated, runtime,
                              director_id, file_path, user_id) 
                              OUTPUT Inserted.movie_id
                              VALUES(?, ?, ?, ?, ?, ?, ?)`;

  let result = await query(queryString, [
    movie_name,
    release_date,
    rated,
    runtime,
    director_id,
    filePath,
    user_id,
  ]);

  // console.log(result);
  const movie_id = result?.recordset[0]?.movie_id;

  for (let genre_id of genre_id_list) {
    await addNewMovieGenre(req, movie_id, genre_id);
  }

  if (req.file) await downloadPoster(req.file, filePath);

  console.log("Inserted movie", { movie_name });
  return movie_id;
}

export async function retrieve() {
  const queryString = `SELECT m.movie_id, m.movie_name, m.rated, 
                        CAST(m.release_date AS nvarchar) AS release_date,
		                    m.runtime, m.file_path, d.director_name,
		                    (SELECT ROUND(AVG(ISNULL(CAST(r.rating AS float), 0)), 2)
		                    FROM Ratings r
		                    WHERE r.movie_id = m.movie_id) AS avg_rating,
		                    STRING_AGG(g.genre_name, ', ') AS genres
                        FROM Movies m
                        INNER JOIN Directors d ON m.director_id = d.director_id
                        INNER JOIN Movie_Genre mg ON m.movie_id = mg.movie_id
                        INNER JOIN Genre g ON g.genre_id = mg.genre_id
                        GROUP BY m.movie_id, m.movie_name, m.rated, m.runtime, m.release_date, 
                        d.director_name, m.file_path`;

  let result = await query(queryString);

  return result?.recordset;
}

export async function retrieveSingle(movie_id) {
  const queryString = `SELECT m.movie_id, m.movie_name, m.rated, 
                        CAST(m.release_date AS nvarchar) AS release_date,
		                    m.runtime, m.file_path, d.director_name,
		                    (SELECT ROUND(AVG(ISNULL(CAST(r.rating AS float), 0)), 2)
		                    FROM Ratings r
		                    WHERE r.movie_id = m.movie_id) AS avg_rating,
		                    STRING_AGG(g.genre_name, ', ') AS genres
                        FROM Movies m
                        INNER JOIN Directors d ON m.director_id = d.director_id
                        INNER JOIN Movie_Genre mg ON m.movie_id = mg.movie_id
                        INNER JOIN Genre g ON g.genre_id = mg.genre_id
                        WHERE m.movie_id = ?
                        GROUP BY m.movie_id, m.movie_name, m.rated, m.runtime, m.release_date, 
                        d.director_name, m.file_path`;

  let result = await query(queryString, [movie_id]);

  return result?.recordset;
}

// insert new movie genre pair into db
async function addNewMovieGenre(movie_id, genre_id) {
  try {
    const queryString =
      "INSERT INTO Movie_Genre(movie_id, genre_id) VALUES(?, ?)";

    let result = await query(queryString, [movie_id, genre_id]);

    console.log("Movie-genre added", { movie_id, genre_id });
  } catch (error) {
    console.error(error);
  }
}

export async function update(movie_id, column, value) {
  const columnFieldMap = {
    movie_name: "movie_name",
    director_name: "director_id",
    release_date: "release_date",
    rated: "rated",
    runtime: "runtime",
  };

  const queryString = `UPDATE Movies SET ${columnFieldMap[column]} = ? WHERE movie_id = ?`;

  let result = await query(queryString, [value, movie_id]);

  console.log(`${column} updated successfully`);
}

// delete new movie genre pair into db
async function deleteMovieGenre(movie_id, genre_id) {
  try {
    const queryString =
      "DELETE FROM Movie_Genre WHERE movie_id = ? AND genre_id = ?";

    let result = await query(queryString, [movie_id, genre_id]);

    console.log("Movie-genre deleted", { movie_id, genre_id });
  } catch (error) {
    console.error(error);
  }
}

export async function updateGenre(movie_id, value) {
  for (let genre_id of value.del_genre_id_list) {
    await deleteMovieGenre(req, movie_id, genre_id);
  }

  for (let genre_id of value.add_genre_id_list) {
    await addNewMovieGenre(req, movie_id, genre_id);
  }
}
