import { Router } from "express";
import {
  addNewDirector,
  addNewGenre,
  addNewMovie,
  getDirectors,
  getGenres,
} from "../controllers/movieController.mjs";
export const router = Router();

// route for getting all directors
router.get("/directors", getDirectors);

// route for getting all genres
router.get("/genres", getGenres);

// route for adding new movie
router.post("/addMovie", addNewMovie);

// route for adding new director
router.post("/addDirector", addNewDirector);

// route for adding new genre
router.post("/addGenre", addNewGenre);
