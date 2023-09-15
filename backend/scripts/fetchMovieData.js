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

const insertData = async () => {
  try {
    const movies = await fs.readFile("movies.txt", "utf-8");
    const movieList = movies.split("\r\n");
    // console.log(movieList);

    for (let movie of movieList) {
      const movie_name = movie.split(" (")[0];
      const movie_obj = await fetchData(movie_name);
      console.log({ movie_obj });
      await addNewMovie(movie_obj);
    }
  } catch (error) {
    console.log(error);
  }
};

await insertData();
