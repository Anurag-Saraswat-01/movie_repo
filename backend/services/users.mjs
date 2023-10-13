import { query } from "../app.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function signup(username, password) {
  try {
    const queryString = "INSERT INTO Users(username, password) VALUES(?, ?)";

    // hashing password set by user
    let hash = await bcrypt.hash(password, saltRounds);

    // adding user to db
    let result = await query(queryString, [username, hash]);

    console.dir(result);
    return { status: 201, message: "Registered successfully" };
  } catch (error) {
    console.error(error);
    return { status: 400, message: "User already exists" };
  }
}
export async function signin(username, password) {
  try {
    const queryString =
      "SELECT password, user_id FROM Users WHERE username = ?";

    // fetching hash stored in db
    let result = await query(queryString, [username]);

    console.dir(result);
    // let hash = result.output.password;
    // let user_id = result.output.user_id;
    let hash = result?.recordset[0]?.password;
    let user_id = result?.recordset[0]?.user_id;

    // comparing password and hash
    let passwordMatch = await bcrypt.compare(password, hash);
    console.log(passwordMatch);

    if (passwordMatch) {
      return { status: 200, message: "Logged in successfully", user_id };
    } else {
      return { status: 400, message: "Incorrect username or password" };
    }
  } catch (error) {
    console.error(error);
    return { status: 400, message: "Something went wrong" };
  }
}

export async function retrieve(id) {
  const queryString = `SELECT m.movie_id, m.movie_name, m.rated, 
    CAST(m.release_date AS nvarchar) AS release_date,
        m.runtime, m.file_path, d.director_name,
        (SELECT ROUND(AVG(ISNULL(CAST(r.rating AS float), 0)), 2)
        FROM Ratings r
        WHERE r.movie_id = m.movie_id) AS avg_rating,
        STRING_AGG(g.genre_name, ', ') AS genres
    FROM Movies m
    INNER JOIN Directors d ON m.director_id = d.director_id
    INNER JOIN Movie_Genre mg ON m.movie_id = mg.movie_id
    INNER JOIN Genre g ON g.genre_id = mg.genre_id
    WHERE m.user_id = ? 
    GROUP BY m.movie_id, m.movie_name, m.rated, m.runtime, m.release_date, 
    d.director_name, m.file_path`;

  let result = await query(queryString, [id]);
  return result?.recordset;
}
