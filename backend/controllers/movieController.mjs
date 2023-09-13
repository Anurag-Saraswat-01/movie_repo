import sql from "mssql";
import fs from "fs/promises";

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
  } = JSON.parse(req.body.movie_data);
  try {
    let result = await req.app.locals.db
      .request()
      .input("movie_name", sql.NVarChar(50), movie_name)
      .input("release_date", sql.NVarChar(12), release_date)
      .input("rated", sql.NVarChar(5), rated)
      .input("runtime", sql.Int, runtime)
      .input("director_id", sql.Int, director_id)
      .execute("usp_insert_movie");

    const movie_id = result.recordset[0].movie_id;

    for (let genre_id of genre_id_list) {
      await addNewMovieGenre(req, movie_id, genre_id);
    }

    await downloadPoster(req.file, movie_id);

    console.log("Inserted movie", { movie_name });
    return res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// insert new rating in db
export async function addRating(req, res) {
  try {
    const { movie_id, user_id, rating } = req.body;
    let result = await req.app.locals.db
      .request()
      .input("movie_id", sql.Int, movie_id)
      .input("user_id", sql.Int, user_id)
      .input("rating", sql.Int, rating)
      .execute("usp_insert_rating");

    return res.status(201).json({ message: "Rating added" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// get user rating from db
export async function getUserRating(req, res) {
  try {
    const { movie_id, user_id } = req.params;
    let result = await req.app.locals.db
      .request()
      .input("movie_id", sql.Int, movie_id)
      .input("user_id", sql.Int, user_id)
      .output("rating", sql.Int)
      .execute("usp_get_user_rating");

    return res.status(200).json(result.output.rating);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// update user rating from db
export async function updateUserRating(req, res) {
  try {
    const { movie_id, user_id } = req.params;
    const { rating } = req.body;
    let result = await req.app.locals.db
      .request()
      .input("movie_id", sql.Int, movie_id)
      .input("user_id", sql.Int, user_id)
      .input("rating", sql.Int, rating)
      .execute("usp_update_user_rating");

    console.log(result);

    return res.status(200).json({ message: "Rating updated successfully" });
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

// download movie poster image
async function downloadPoster(file, movie_id) {
  try {
    console.log(file);
    await fs.writeFile(`./static/images/${movie_id}.jpg`, file.buffer);
  } catch (error) {
    console.error(error);
  }
}
