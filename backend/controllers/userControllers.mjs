import sql from "mssql";
import bcrypt from "bcrypt";

const saltRounds = 10;

// to register new user
export const register = async (req, res) => {
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
};

// to login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // fetching hash stored in db
    let result = await req.app.locals.db
      .request()
      .input("username", sql.NVarChar(20), username)
      .output("password", sql.NVarChar(60))
      .execute("usp_get_password");

    console.dir(result);
    let hash = result.output.password;

    // comparing password and hash
    let passwordMatch = await bcrypt.compare(password, hash);
    console.log(passwordMatch);

    if (passwordMatch) {
      return res.status(200).json({ message: "Logged in successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};
