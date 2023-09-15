import { Router } from "express";
import {
  register,
  login,
  getAllMovieDataByUser,
} from "../controllers/userControllers.mjs";
export const router = Router();

// route for registering new user
router.post("/register", register);

// route for loggin in existing user
router.post("/login", login);

// route for getting movies by user
router.get("/movies/:id", getAllMovieDataByUser);
