import sql from "mssql";

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

async function query(queryString, params) {
  params.forEach((param) => {
    queryString = queryString.replace("?", param);
  });
  console.log({ queryString });
  try {
    const result = await pool.request().query(queryString);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function registerUser(username, password) {
  const queryString = "INSERT INTO Users(username, password) VALUES('?', '?')";
  const result = await query(queryString, [username, password]);
  console.log(result);
}

async function getPassword(username) {
  const queryString =
    "SELECT password, user_id FROM Users WHERE username = '?';";
  const result = await query(queryString, [username]);
  console.log(result);
}

// await registerUser("a", "aa");

await getPassword("a");
