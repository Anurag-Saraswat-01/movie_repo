import { Router } from "express";
import { addNewGenre, getGenres } from "../controllers/genreController.mjs";

export const router = Router();

// route for getting all genres
router.get("/", getGenres);

// route for adding new genre
router.post("/", addNewGenre);
