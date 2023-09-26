// get all genres from db
export async function getGenres(req, res) {
  try {
    const queryString = "SELECT * FROM Genre ORDER BY genre_name";

    let result = await req.app.locals.query(queryString);

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
  try {
    const { genre_name } = req.body;
    const queryString =
      "INSERT INTO Genre(genre_name) OUTPUT Inserted.genre_id VALUES(?)";

    let result = await req.app.locals.query(queryString, [genre_name]);

    res.status(201).json(result.recordset[0].genre_id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
