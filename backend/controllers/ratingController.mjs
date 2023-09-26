import sql from "mssql";

// insert new rating in db
export async function addRating(req, res) {
  try {
    const { movie_id, user_id, rating } = req.body;
    const queryString =
      "INSERT INTO Ratings(movie_id, user_id, rating) VALUES(?, ?, ?)";

    let result = await req.app.locals.query(queryString, [
      movie_id,
      user_id,
      rating,
    ]);

    return res.status(201).json({ message: "Rating added" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// get user rating from db
export async function getUserRating(req, res) {
  try {
    const { movie_id, user_id } = req.params;
    const queryString =
      "SELECT rating FROM Ratings WHERE movie_id = ? AND user_id = ?";

    let result = await req.app.locals.query(queryString, [movie_id, user_id]);

    return res.status(200).json(result.recordset[0].rating);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// update user rating from db
export async function updateUserRating(req, res) {
  try {
    const { movie_id, user_id, rating } = req.body;
    const queryString =
      "UPDATE Ratings SET rating = ? WHERE movie_id = ? AND user_id = ?";

    let result = await req.app.locals.query(queryString, [
      rating,
      movie_id,
      user_id,
    ]);

    console.log("Rating updated successfully");

    return res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
