import axios from "axios";

axios
  .get("http://www.omdbapi.com/?t=The Shawshank Redemption&apikey=69c77d68")
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));

// const genreStr = "Crime, Drama";
// const genreList = genreStr.split(", ").map((genre) => genre);
// console.log(genreList);

// import { downloadImage } from "./controllers/movieController.mjs";

// await downloadImage(
//   "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
// );
