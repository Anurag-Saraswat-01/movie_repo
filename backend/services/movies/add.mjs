import query from "../../query.mjs";
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
  user_id,
  file
) {
  const filePath = file ? generateFilePath(movie_name) : null;

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

  if (genre_id_list)
    for (let genre_id of genre_id_list) {
      await addNewMovieGenre(movie_id, genre_id);
    }

  if (file) await downloadPoster(file, filePath);

  console.log("Inserted movie", { movie_name });
  return movie_id;
}
