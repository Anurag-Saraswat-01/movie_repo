import sql from "mssql";
import bcrypt from "bcrypt";

const saltRounds = 10;

// to register new user
export async function register(req, res) {
  const { username, password } = req.body;

  try {
    // hashing password set by user
    let hash = await bcrypt.hash(password, saltRounds);

    // adding user to db
    let result = await req.app.locals.db
      .request()
      .input("username", sql.NVarChar(20), username)
      .input("password", sql.NVarChar(60), hash)
      .execute("usp_insert_user");

    console.dir(result);
    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// to login
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    // fetching hash stored in db
    let result = await req.app.locals.db
      .request()
      .input("username", sql.NVarChar(20), username)
      .output("password", sql.NVarChar(60))
      .output("user_id", sql.Int)
      .execute("usp_get_password");

    console.dir(result);
    let hash = result.output.password;
    let user_id = result.output.user_id;

    // comparing password and hash
    let passwordMatch = await bcrypt.compare(password, hash);
    console.log(passwordMatch);

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
  try {
    const { id } = req.params;
    let result = await req.app.locals.db
      .request()
      .input("user_id", sql.Int, id)
      .execute("usp_get_all_movie_data_by_user");
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
