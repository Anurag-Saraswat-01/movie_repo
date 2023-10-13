import {
  add,
  retrieve,
  retrieveSingle,
  update,
  updateGenre,
} from "../services/movies.mjs";

// insert new movie into db
export async function addNewMovie(req, res) {
  const {
    movie_name,
    release_date,
    rated,
    runtime,
    director_id,
    genre_id_list,
    user_id,
  } = JSON.parse(req.body.movie_data);
  // console.log(req.file, JSON.parse(req.body.movie_data));
  const { status, message } = await add(
    movie_name,
    release_date,
    rated,
    runtime,
    director_id,
    genre_id_list,
    user_id
  );

  return res.status(status).json({ message });
}

// get all movie data from db
export async function getAllMovieData(req, res) {
  try {
    let movies = await retrieve();
    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// get single movie data from db
export async function getSingleMovieData(req, res) {
  const { movie_id } = req.params;
  try {
    let movie = await retrieveSingle(movie_id);

    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// update movie details
export async function updateMovie(req, res) {
  const { movie_id, column } = req.params;
  const { value } = req.body;

  const { status, message } = await update(movie_id, column, value);

  return res.status(status).json({ message });
}

// update movie genre
export async function updateMovieGenre(req, res) {
  const { movie_id } = req.params;
  const { value } = req.body;

  const { status, message } = await updateGenre(movie_id, value);

  return res.status(status).json({ message });
}
