// get all directors from db
export async function getDirectors(req, res) {
  try {
    const queryString = "SELECT * FROM Directors ORDER BY director_name";

    let result = await req.app.locals.query(queryString);

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
  try {
    const { director_name } = req.body;
    const queryString =
      "INSERT INTO Directors(director_name) OUTPUT Inserted.director_id VALUES(?)";

    let result = await req.app.locals.query(queryString, [director_name]);

    res.status(201).json(result.recordset[0].director_id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
