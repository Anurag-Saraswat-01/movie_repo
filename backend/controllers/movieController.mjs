import sql from "mssql";

// get all directors from db
export async function getDirectors(req, res) {
  try {
    let result = await req.app.locals.db.request().execute("usp_get_directors");
    console.log(result.recordset);
    let directors = result.recordset.map((res) => ({
      value: res.director_id,
      label: res.director_name,
    }));
    console.log({ directors });
    res.status(200).json(directors);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// get all genres from db
export async function getGenres(req, res) {
  try {
    let result = await req.app.locals.db.request().execute("usp_get_genres");
    console.log(result.recordset);
    let genres = result.recordset.map((res) => ({
      value: res.genre_id,
      label: res.genre_name,
    }));
    console.log({ genres });
    res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// insert new movie into db
export async function addNewMovie(req, res) {
  const {
    movie_name,
    release_date,
    rated,
    runtime,
    director_id,
    genre_id_list,
  } = req.body.movieData;
  try {
    let result = await req.app.locals.db
      .request()
      .input("movie_name", sql.NVarChar(50), movie_name)
      .input("release_date", sql.NVarChar(12), release_date)
      .input("rated", sql.NVarChar(5), rated)
      .input("runtime", sql.Int, parseInt(runtime.split(" ")[0]))
      .input("director_id", sql.Int, director_id)
      .execute("usp_insert_movie");

    console.log("Inserted movie", { movie_name });
    return res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// insert new director into db
export async function addNewDirector(req, res) {
  const { director_name } = req.body;
  try {
    let result = await req.app.locals.db
      .request()
      .input("director_name", sql.NVarChar(30), director_name)
      .execute("usp_insert_director");
    res.status(201).json(result.recordset[0].director_id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
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
