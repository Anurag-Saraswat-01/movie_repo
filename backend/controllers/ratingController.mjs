import sql from "mssql";

// insert new rating in db
export async function addRating(req, res) {
  try {
    const { movie_id, user_id, rating } = req.body;
    let result = await req.app.locals.db
      .request()
      .input("movie_id", sql.Int, movie_id)
      .input("user_id", sql.Int, user_id)
      .input("rating", sql.Int, rating)
      .execute("usp_insert_rating");

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
    let result = await req.app.locals.db
      .request()
      .input("movie_id", sql.Int, movie_id)
      .input("user_id", sql.Int, user_id)
      .output("rating", sql.Int)
      .execute("usp_get_user_rating");

    return res.status(200).json(result.output.rating);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// update user rating from db
export async function updateUserRating(req, res) {
  try {
    const { movie_id, user_id, rating } = req.body;
    let result = await req.app.locals.db
      .request()
      .input("movie_id", sql.Int, movie_id)
      .input("user_id", sql.Int, user_id)
      .input("rating", sql.Int, rating)
      .execute("usp_update_user_rating");

    console.log(result);

    return res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
