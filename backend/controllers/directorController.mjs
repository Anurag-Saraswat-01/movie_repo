import sql from "mssql";

// get all directors from db
export async function getDirectors(req, res) {
  try {
    let result = await req.app.locals.db.request().execute("usp_get_directors");
    // console.log(result.recordset);
    let directors = result.recordset.map((res) => ({
      value: res.director_id,
      label: res.director_name,
    }));
    res.status(200).json(directors);
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
