import { add, retrieve } from "../services/genres.mjs";

// get all genres from db
export async function getGenres(req, res) {
  try {
    let genres = await retrieve();
    res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// insert new genre into db
export async function addNewGenre(req, res) {
  const { genre_name } = req.body;
  try {
    let genre_id = await add(genre_name);
    res.status(201).json(genre_id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
