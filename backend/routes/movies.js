import { Router } from "express";
import multer from "multer";
import {
  addNewMovie,
  getAllMovieData,
  getSingleMovieData,
  updateMovie,
  updateMovieGenre,
} from "../controllers/movieController.mjs";

export const router = Router();
const upload = multer();

// route for getting all movie data
router.get("/", getAllMovieData);

// route for getting single movie data
router.get("/:movie_id", getSingleMovieData);

// route for adding new movie
router.post("/", upload.single("poster"), addNewMovie);

// route for updating movie genres
router.put("/:movie_id/genres", updateMovieGenre);

// route for updating movie
router.put("/:movie_id/:column", updateMovie);
