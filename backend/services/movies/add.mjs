import { query } from "../../app.js";
import downloadPoster from "../../utils/DownloadPoster.mjs";
import generateFilePath from "../../utils/GenerateFilePath.mjs";
import { addNewMovieGenre } from "./addNewMovieGenre.mjs";

export default async function add(
  movie_name,
  release_date,
  rated,
  runtime,
  director_id,
  genre_id_list,
  user_id
) {
  const filePath = req.file ? generateFilePath(movie_name) : null;

  const queryString = `INSERT INTO Movies(movie_name, release_date, rated, runtime,
                                director_id, file_path, user_id) 
                                OUTPUT Inserted.movie_id
                                VALUES(?, ?, ?, ?, ?, ?, ?)`;

  let result = await query(queryString, [
    movie_name,
    release_date,
    rated,
    runtime,
    director_id,
    filePath,
    user_id,
  ]);

  // console.log(result);
  const movie_id = result?.recordset[0]?.movie_id;

  for (let genre_id of genre_id_list) {
    await addNewMovieGenre(req, movie_id, genre_id);
  }

  if (req.file) await downloadPoster(req.file, filePath);

  console.log("Inserted movie", { movie_name });
  return movie_id;
}
