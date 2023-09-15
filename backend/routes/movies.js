import { Router } from "express";
import multer from "multer";
import {
  addNewMovie,
  getAllMovieData,
  getSingleMovieData,
} from "../controllers/movieController.mjs";

export const router = Router();
const upload = multer();

// route for getting all movie data
router.get("/", getAllMovieData);

// route for getting single movie data
router.get("/:movie_id", getSingleMovieData);

// route for adding new movie
router.post("/", upload.single("poster"), addNewMovie);
