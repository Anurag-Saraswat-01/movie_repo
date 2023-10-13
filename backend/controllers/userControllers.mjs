import retrieve from "../services/users/retrieve.mjs";
import signin from "../services/users/signin.mjs";
import signup from "../services/users/signup.mjs";

// to register new user
export async function register(req, res) {
  const { username, password } = req.body;
  try {
    const user_id = await signup(username, password);
    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "User already exists" });
  }
}

// to login
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const { passwordMatch, user_id } = await signin(username, password);
    if (passwordMatch) {
      return res
        .status(200)
        .json({ message: "Logged in successfully", user_id });
    } else {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
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
