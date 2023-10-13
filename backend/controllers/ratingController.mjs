import add from "../services/ratings/add.mjs";
import retrieve from "../services/ratings/retrieve.mjs";
import update from "../services/ratings/update.mjs";

// insert new rating in db
export async function addRating(req, res) {
  const { movie_id, user_id, rating } = req.body;
  try {
    let rating_id = await add(movie_id, user_id, rating);
    return res.status(201).json({ message: "Rating added" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
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
  try {
    await update(movie_id, user_id, rating);
    return res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
