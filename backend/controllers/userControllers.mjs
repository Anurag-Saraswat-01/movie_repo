import { retrieve, signin, signup } from "../services/users.mjs";

// to register new user
export async function register(req, res) {
  const { username, password } = req.body;
  const { status, message } = await signup(username, password);
  return res.status(status).json({ message });
}

// to login
export async function login(req, res) {
  const { username, password } = req.body;
  const { status, message, user_id } = await signin(username, password);
  return res.status(status).json({ message, user_id });
}

// get all movie data by user from db
export async function getAllMovieDataByUser(req, res) {
  const { id } = req.params;
  try {
    let movies = await retrieve(id);

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
