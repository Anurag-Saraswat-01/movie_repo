import { addNewMovieGenre } from "./addNewMovieGenre.mjs";
import { deleteMovieGenre } from "./deleteMovieGenre.mjs";

export default async function updateGenre(movie_id, value) {
  for (let genre_id of value.del_genre_id_list) {
    await deleteMovieGenre(req, movie_id, genre_id);
  }

  for (let genre_id of value.add_genre_id_list) {
    await addNewMovieGenre(req, movie_id, genre_id);
  }
}
