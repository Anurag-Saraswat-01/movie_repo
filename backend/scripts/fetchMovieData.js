import axios from "axios";
import fs from "fs/promises";
import { addNewMovie } from "./addMovieData.mjs";

const fetchData = async (movie_name) => {
  try {
    const result = await axios.get(
      `http://www.omdbapi.com/?t=${movie_name}&apikey=69c77d68`
    );
    // console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

// fs.readFile("movies.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data.split("\r\n"));
// });

const insertData = async () => {
  try {
    const movies = await fs.readFile("movies_all.txt", "utf-8");
    const movieList = movies.split("\r\n");
    // console.log(movieList);

    for (let movie of movieList) {
      const movie_name = movie.split(" (")[0];
      // console.log(movie_name);
      const movie_obj = await fetchData(movie_name);
      console.log({ movie_obj });
      await addNewMovie(movie_obj);
    }
  } catch (error) {
    console.log(error);
  }
};

await insertData();
