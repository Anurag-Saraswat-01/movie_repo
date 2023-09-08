import express from "express";
import sql from "mssql";
import cors from "cors";
import { config } from "./config.js";
import { router as userRoutes } from "./routes/users.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:9000",
  credentials: true,
};

app.use(cors(corsOptions));

sql.on("error", (error) => {
  console.log(error);
});

const appPool = new sql.ConnectionPool(config);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

(async () => {
  try {
    let pool = await appPool.connect();
    app.locals.db = pool;
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error creating connection pool", error);
  }
})();
