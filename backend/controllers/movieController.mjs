import sql from "mssql";
import fs from "fs/promises";

// function to generate image file path
function generateFilePath(movie_name) {
  const filePath = movie_name
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
  return `images/${filePath}.jpg`;
}

// download movie poster image
async function downloadPoster(file, filePath) {
  try {
    console.log(file);
    await fs.writeFile(`./public/${filePath}`, file.buffer);
  } catch (error) {
    console.error(error);
  }
}

// insert new movie into db
export async function addNewMovie(req, res) {
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
  try {
    const filePath = req.file ? generateFilePath(movie_name) : null;
    let result = await req.app.locals.db
      .request()
      .input("movie_name", sql.NVarChar(100), movie_name)
      .input("release_date", sql.Date, release_date)
      .input("rated", sql.NVarChar(5), rated)
      .input("runtime", sql.Int, runtime)
      .input("director_id", sql.Int, director_id)
      .input("file_path", sql.NVarChar(100), filePath)
      .input("user_id", sql.Int, user_id)
      .execute("usp_insert_movie");

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
    let result = await req.app.locals.db
      .request()
      .execute("usp_get_all_movie_data");
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
    let result = await req.app.locals.db
      .request()
      .input("movie_id", sql.Int, movie_id)
      .execute("usp_get_single_movie_data");
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// insert new movie genre pair into db
async function addNewMovieGenre(req, movie_id, genre_id) {
  try {
    let result = await req.app.locals.db
      .request()
      .input("movie_id", sql.Int, movie_id)
      .input("genre_id", sql.Int, genre_id)
      .execute("usp_insert_movie_genre");

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
      movie_name: { col_name: "movie_name", data_type: sql.NVarChar(100) },
      director_name: { col_name: "director_id", data_type: sql.Int },
      release_date: { col_name: "release_date", data_type: sql.Date },
      rated: { col_name: "rated", data_type: sql.NVarChar(5) },
      runtime: { col_name: "runtime", data_type: sql.Int },
    };

    let result = await req.app.locals.db
      .request()
      .input("movie_id", sql.Int, movie_id)
      .input("value", columnFieldMap[column].data_type, value)
      .query(
        `UPDATE Movies SET ${columnFieldMap[column].col_name} = @value WHERE movie_id = @movie_id`
      );
    console.log(result);
    res.status(200).json({ message: `${column} updated successfully` });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// delete new movie genre pair into db
async function deleteMovieGenre(req, movie_id, genre_id) {
  try {
    let result = await req.app.locals.db
      .request()
      .input("movie_id", sql.Int, movie_id)
      .input("genre_id", sql.Int, genre_id)
      .execute("usp_delete_movie_genre");

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
