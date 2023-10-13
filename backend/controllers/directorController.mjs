import add from "../services/directors/add.mjs";
import retrieve from "../services/directors/retrieve.mjs";

// get all directors from db
export async function getDirectors(req, res) {
  try {
    let directors = await retrieve();
    res.status(200).json(directors);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// insert new director into db
export async function addNewDirector(req, res) {
  const { director_name } = req.body;
  try {
    let director_id = await add(director_name);
    res.status(201).json(director_id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
