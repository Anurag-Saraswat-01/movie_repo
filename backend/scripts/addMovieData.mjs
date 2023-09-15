import sql from "mssql";
import fs from "fs";
import axios from "axios";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const config = {
  user: "sa",
  password: "root",
  server: "DESKTOP-B3TDTS7",
  database: "movie_repo",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

sql.on("error", (error) => {
  console.log(error);
});

const appPool = new sql.ConnectionPool(config);
let pool = await appPool.connect();

// get director id
export const getDirectorID = async (director_name) => {
  try {
    let result = await pool
      .request()
      .input("director_name", sql.NVarChar(30), director_name)
      .output("director_id", sql.Int)
      .execute("usp_get_director_id");

    let director_id = result.output.director_id;
    console.log({ director_id });
    return director_id;
  } catch (error) {
    console.error(error);
  }
};

export const getGenreID = async (genre_name) => {
  try {
    let result = await pool
      .request()
      .input("genre_name", sql.NVarChar(10), genre_name)
      .output("genre_id", sql.Int)
      .execute("usp_get_genre_id");

    let genre_id = result.output.genre_id;
    console.log({ genre_id });
    return genre_id;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieID = async (movie_name) => {
  try {
    let result = await pool
      .request()
      .input("movie_name", sql.NVarChar(50), movie_name)
      .output("movie_id", sql.Int)
      .execute("usp_get_movie_id");

    let movie_id = result.output.movie_id;
    console.log({ movie_id });
    return movie_id;
  } catch (error) {
    console.error(error);
  }
};

export const insertDirector = async (director_name) => {
  try {
    let result = await pool
      .request()
      .input("director_name", sql.NVarChar(30), director_name)
      .execute("usp_insert_director");

    // console.log(result);
    console.log("Inserted director", { director_name });
  } catch (error) {
    console.error(error);
  }
};

export const insertGenre = async (genre_name) => {
  try {
    let result = await pool
      .request()
      .input("genre_name", sql.NVarChar(10), genre_name)
      .execute("usp_insert_genre");

    // console.log(result);
    console.log("Inserted genre", { genre_name });
  } catch (error) {
    console.error(error);
  }
};

export const insertMovieGenre = async (movie_id, genre_id) => {
  try {
    let result = await pool
      .request()
      .input("movie_id", sql.Int, movie_id)
      .input("genre_id", sql.Int, genre_id)
      .execute("usp_insert_movie_genre");

    // console.log(result);
    console.log("Inserted movie_genre", { movie_id, genre_id });
  } catch (error) {
    console.error(error);
  }
};

export const insertMovie = async (
  movie_name,
  release_date,
  rated,
  runtime,
  director_id
) => {
  try {
    const filePath = generateFilePath(movie_name);
    let result = await pool
      .request()
      .input("movie_name", sql.NVarChar(50), movie_name)
      .input("release_date", sql.NVarChar(12), release_date)
      .input("rated", sql.NVarChar(5), rated)
      .input("runtime", sql.Int, parseInt(runtime.split(" ")[0]))
      .input("director_id", sql.Int, director_id)
      .input("file_path", sql.NVarChar(50), filePath)
      .input("user_id", sql.Int, null)
      .execute("usp_insert_movie");

    console.log("Inserted movie", { movie_name });
  } catch (error) {
    console.error(error);
  }
};

const generateFilePath = (movie_name) => {
  const filePath = movie_name
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
  return `images/${filePath}.jpg`;
};

// download image to static folder
export const downloadImage = async (imageUrl, movie_name) => {
  try {
    const imageRes = await axios.get(imageUrl, { responseType: "stream" });
    // console.dir(imageRes.data.pipe);
    imageRes.data.pipe(
      fs.createWriteStream(`../public/${generateFilePath(movie_name)}`)
    );
    console.log("Image downloaded", { imageUrl });
  } catch (error) {
    console.error(error);
  }
};

// export default async function addNewMovie() {}

export const addNewMovie = async (movie) => {
  try {
    // get director id from db
    let director_id = await getDirectorID(movie.Director);

    // if director does not exist, insert into db and then get the new id
    if (!director_id) {
      await insertDirector(movie.Director);
      director_id = await getDirectorID(movie.Director);
    }

    // insert movie into db
    await insertMovie(
      movie.Title,
      movie.Released,
      movie.Rated,
      movie.Runtime,
      director_id
    );

    // get new movie id
    let movie_id = await getMovieID(movie.Title);

    // create list of genre IDs
    const genreList = movie.Genre.split(", ");
    const genreIDList = await Promise.all(
      genreList.map(async (genre) => {
        // get genre id from db
        let genre_id = await getGenreID(genre);

        // if genre does not exist, insert into db and then get the new id
        if (!genre_id) {
          await insertGenre(genre);
          genre_id = await getGenreID(genre);
        }

        return genre_id;
      })
    );

    console.log({ genreList, genreIDList });

    // insert movie-genre pairs into db
    for (let genre_id of genreIDList) {
      await insertMovieGenre(movie_id, genre_id);
    }

    await downloadImage(movie.Poster, movie.Title);
  } catch (error) {
    console.log(error);
  }
};

// await addNewMovie();
