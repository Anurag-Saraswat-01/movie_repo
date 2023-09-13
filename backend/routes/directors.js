import { Router } from "express";
import {
  addNewDirector,
  getDirectors,
} from "../controllers/directorController.mjs";

export const router = Router();

// route for getting all directors
router.get("/", getDirectors);

// route for adding new director
router.post("/", addNewDirector);
