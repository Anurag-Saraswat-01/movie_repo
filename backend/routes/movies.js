import { Router } from "express";
import multer from "multer";
import {
  addNewMovie,
  getAllMovieData,
  getSingleMovieData,
  updateMovieDirector,
  updateMovieGenre,
  updateMovieReleaseDate,
  updateMovieRuntime,
  updateMovieTitle,
  updatedMovieRated,
} from "../controllers/movieController.mjs";

export const router = Router();
const upload = multer();

// route for getting all movie data
router.get("/", getAllMovieData);

// route for getting single movie data
router.get("/:movie_id", getSingleMovieData);

// route for adding new movie
router.post("/", upload.single("poster"), addNewMovie);

// route for updating movie title
router.put("/title", updateMovieTitle);

// route for updating movie director
router.put("/director", updateMovieDirector);

// route for updating movie release date
router.put("/release_date", updateMovieReleaseDate);

// route for updating movie mpa film rating
router.put("/mpa_film_rating", updatedMovieRated);

// route for updating movie runtime
router.put("/runtime", updateMovieRuntime);

// route for updating movie genres
router.put("/genre", updateMovieGenre);
