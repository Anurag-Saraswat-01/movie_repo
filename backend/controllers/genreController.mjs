import sql from "mssql";

// get all genres from db
export async function getGenres(req, res) {
  try {
    let result = await req.app.locals.db.request().execute("usp_get_genres");
    // console.log(result.recordset);
    let genres = result.recordset.map((res) => ({
      value: res.genre_id,
      label: res.genre_name,
    }));
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
    let result = await req.app.locals.db
      .request()
      .input("genre_name", sql.NVarChar(30), genre_name)
      .execute("usp_insert_genre");
    res.status(201).json(result.recordset[0].genre_id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
