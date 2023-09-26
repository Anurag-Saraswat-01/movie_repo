import sql from "mssql";
import bcrypt from "bcrypt";

const saltRounds = 10;

// to register new user
export async function register(req, res) {
  try {
    const { username, password } = req.body;
    const queryString = "INSERT INTO Users(username, password) VALUES(?, ?)";

    // hashing password set by user
    let hash = await bcrypt.hash(password, saltRounds);

    // adding user to db
    let result = await req.app.locals.query(queryString, [username, hash]);

    console.dir(result);
    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "User already exists" });
  }
}

// to login
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const queryString =
      "SELECT password, user_id FROM Users WHERE username = ?";

    // fetching hash stored in db
    let result = await req.app.locals.query(queryString, [username]);

    console.dir(result);
    // let hash = result.output.password;
    // let user_id = result.output.user_id;
    let hash = result.recordset[0].password;
    let user_id = result.recordset[0].user_id;

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

    let result = await req.app.locals.query(queryString, [id]);

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
