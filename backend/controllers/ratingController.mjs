import { add, retrieve, update } from "../services/ratings.mjs";

// insert new rating in db
export async function addRating(req, res) {
  const { movie_id, user_id, rating } = req.body;
  const { status, message } = await add(movie_id, user_id, rating);

  return res.status(status).json({ message });
}

// get user rating from db
export async function getUserRating(req, res) {
  const { movie_id, user_id } = req.params;
  try {
    let rating = await retrieve(movie_id, user_id);
    return res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// update user rating from db
export async function updateUserRating(req, res) {
  const { movie_id, user_id, rating } = req.body;
  const { status, message } = await update(movie_id, user_id, rating);
  return res.status(status).json({ message });
}
