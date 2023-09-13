import { Router } from "express";
import multer from "multer";
import {
  addNewMovie,
  addRating,
  getAllMovieData,
  getSingleMovieData,
  getUserRating,
  updateUserRating,
} from "../controllers/movieController.mjs";

export const router = Router();
const upload = multer();

// route for getting all movie data
router.get("/", getAllMovieData);

// route for getting single movie data
router.get("/:movie_id", getSingleMovieData);

// route for adding new movie
router.post("/", upload.single("poster"), addNewMovie);

// route for getting user rating
router.get("/rating/:movie_id&:user_id", getUserRating);

// route for updating user rating
router.put("/rating/:movie_id&:user_id", updateUserRating);

// route for adding new rating to a movie
router.post("/rating", addRating);
