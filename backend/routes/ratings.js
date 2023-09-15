import { Router } from "express";
import {
  addRating,
  getUserRating,
  updateUserRating,
} from "../controllers/ratingController.mjs";

export const router = Router();

// route for getting user rating
router.get("/:movie_id&:user_id", getUserRating);

// route for adding new rating to a movie
router.post("/", addRating);

// route for updating user rating
router.put("/", updateUserRating);
