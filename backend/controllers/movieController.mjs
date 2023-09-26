import generateFilePath from "../utils/GenerateFilePath.mjs";
import downloadPoster from "../utils/DownloadPoster.mjs";

// insert new movie into db
export async function addNewMovie(req, res) {
  try {
    // console.log(req.file, JSON.parse(req.body.movie_data));
    const {
      movie_name,
      release_date,
      rated,
      runtime,
      director_id,
      genre_id_list,
      user_id,
    } = JSON.parse(req.body.movie_data);

    const filePath = req.file ? generateFilePath(movie_name) : null;

    const queryString = `INSERT INTO Movies(movie_name, release_date, rated, runtime,
                          director_id, file_path, user_id) 
                          OUTPUT Inserted.movie_id
                          VALUES(?, ?, ?, ?, ?, ?, ?)`;

    let result = await req.app.locals.query(queryString, [
      movie_name,
      release_date,
      rated,
      runtime,
      director_id,
      filePath,
      user_id,
    ]);

    // console.log(result);
    const movie_id = result.recordset[0].movie_id;

    for (let genre_id of genre_id_list) {
      await addNewMovieGenre(req, movie_id, genre_id);
    }

    if (req.file) await downloadPoster(req.file, filePath);

    console.log("Inserted movie", { movie_name });
    return res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// get all movie data from db
export async function getAllMovieData(req, res) {
  try {
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

    let result = await req.app.locals.query(queryString);

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// get single movie data from db
export async function getSingleMovieData(req, res) {
  try {
    const { movie_id } = req.params;
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

    let result = await req.app.locals.query(queryString, [movie_id]);

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// insert new movie genre pair into db
async function addNewMovieGenre(req, movie_id, genre_id) {
  try {
    const queryString =
      "INSERT INTO Movie_Genre(movie_id, genre_id) VALUES(?, ?)";

    let result = await req.app.locals.query(queryString, [movie_id, genre_id]);

    console.log("Movie-genre added", { movie_id, genre_id });
  } catch (error) {
    console.error(error);
  }
}

// update movie details
export async function updateMovie(req, res) {
  try {
    const { movie_id, column } = req.params;
    const { value } = req.body;

    const columnFieldMap = {
      movie_name: "movie_name",
      director_name: "director_id",
      release_date: "release_date",
      rated: "rated",
      runtime: "runtime",
    };

    const queryString = `UPDATE Movies SET ${columnFieldMap[column]} = ? WHERE movie_id = ?`;

    let result = await req.app.locals.query(queryString, [value, movie_id]);

    console.log(`${column} updated successfully`);
    res.status(200).json({ message: `${column} updated successfully` });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// delete new movie genre pair into db
async function deleteMovieGenre(req, movie_id, genre_id) {
  try {
    const queryString =
      "DELETE FROM Movie_Genre WHERE movie_id = ? AND genre_id = ?";

    let result = await req.app.locals.query(queryString, [movie_id, genre_id]);

    console.log("Movie-genre deleted", { movie_id, genre_id });
  } catch (error) {
    console.error(error);
  }
}

// update movie genre
export async function updateMovieGenre(req, res) {
  try {
    const { movie_id } = req.params;
    const { value } = req.body;

    for (let genre_id of value.del_genre_id_list) {
      await deleteMovieGenre(req, movie_id, genre_id);
    }

    for (let genre_id of value.add_genre_id_list) {
      await addNewMovieGenre(req, movie_id, genre_id);
    }

    return res
      .status(200)
      .json({ message: "Movie Genre updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
