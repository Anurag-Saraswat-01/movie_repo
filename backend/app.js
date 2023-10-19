import express from "express";
import sql from "mssql";
import cors from "cors";
import { config } from "./config.js";
import { router as userRoutes } from "./routes/users.js";
import { router as movieRoutes } from "./routes/movies.js";
import { router as directorRoutes } from "./routes/directors.js";
import { router as genreRoutes } from "./routes/genres.js";
import { router as ratingRoutes } from "./routes/ratings.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:9000",
  credentials: true,
};

app.use(cors(corsOptions));

sql.on("error", (error) => {
  console.error(error);
});

const appPool = new sql.ConnectionPool(config);
export const pool = await appPool.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/user", userRoutes);
app.use("/movies", movieRoutes);
app.use("/directors", directorRoutes);
app.use("/genres", genreRoutes);
app.use("/ratings", ratingRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
