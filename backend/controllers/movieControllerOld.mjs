import sql from "mssql";
import fs from "fs";
import axios from "axios";

const config = {
  user: "sa",
  password: "sa@12345678",
  server: "192.168.0.13",
  port: 49753,
  database: "movie_repo",
  options: {
    encrypt: false,
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
    let result = await pool
      .request()
      .input("movie_name", sql.NVarChar(50), movie_name)
      .input("release_date", sql.NVarChar(12), release_date)
      .input("rated", sql.NVarChar(5), rated)
      .input("runtime", sql.Int, parseInt(runtime.split(" ")[0]))
      .input("director_id", sql.Int, director_id)
      // .input("image_url", sql.NVarChar(200), image_url)
      .execute("usp_insert_movie");

    console.log("Inserted movie", { movie_name });
  } catch (error) {
    console.error(error);
  }
};

// const movie = {
//   Title: "The Godfather",
//   Year: "1972",
//   Rated: "R",
//   Released: "24 Mar 1972",
//   Runtime: "175 min",
//   Genre: "Crime, Drama",
//   Director: "Francis Ford Coppola",
//   Writer: "Mario Puzo, Francis Ford Coppola",
//   Actors: "Marlon Brando, Al Pacino, James Caan",
//   Plot: "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
//   Language: "English, Italian, Latin",
//   Country: "United States",
//   Awards: "Won 3 Oscars. 30 wins & 31 nominations total",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
//   Ratings: [
//     { Source: "Internet Movie Database", Value: "9.2/10" },
//     { Source: "Rotten Tomatoes", Value: "97%" },
//     { Source: "Metacritic", Value: "100/100" },
//   ],
//   Metascore: "100",
//   imdbRating: "9.2",
//   imdbVotes: "1,945,639",
//   imdbID: "tt0068646",
//   Type: "movie",
//   DVD: "01 Aug 2013",
//   BoxOffice: "$136,381,073",
//   Production: "N/A",
//   Website: "N/A",
//   Response: "True",
// };

const movie = {
  Title: "The Shawshank Redemption",
  Year: "1994",
  Rated: "R",
  Released: "14 Oct 1994",
  Runtime: "142 min",
  Genre: "Drama",
  Director: "Frank Darabont",
  Writer: "Stephen King, Frank Darabont",
  Actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
  Plot: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
  Language: "English",
  Country: "United States",
  Awards: "Nominated for 7 Oscars. 21 wins & 42 nominations total",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
  Ratings: [
    { Source: "Internet Movie Database", Value: "9.3/10" },
    { Source: "Rotten Tomatoes", Value: "91%" },
    { Source: "Metacritic", Value: "82/100" },
  ],
  Metascore: "82",
  imdbRating: "9.3",
  imdbVotes: "2,790,043",
  imdbID: "tt0111161",
  Type: "movie",
  DVD: "15 Aug 2008",
  BoxOffice: "$28,767,189",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};

// download image to static folder
export const downloadImage = async (imageUrl, movie_id) => {
  try {
    const imageRes = await axios.get(movie.Poster, { responseType: "stream" });
    // console.dir(imageRes.data.pipe);
    imageRes.data.pipe(
      fs.createWriteStream(`../public/images/${movie_id}.jpg`)
    );
    console.log("Image downloaded", { imageUrl });
  } catch (error) {
    console.error(error);
  }
};

// export default async function addNewMovie() {}

export const addNewMovie = async () => {
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

    await downloadImage(movie.Poster, movie_id);
  } catch (error) {
    console.log(error);
  }
};

await addNewMovie();
