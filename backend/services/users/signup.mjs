import { query } from "../../app.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default async function signup(username, password) {
  const queryString =
    "INSERT INTO Users(username, password) OUTPUR Inserted.user_id VALUES(?, ?)";

  // hashing password set by user
  let hash = await bcrypt.hash(password, saltRounds);

  // adding user to db
  let result = await query(queryString, [username, hash]);

  const user_id = result?.recordset[0]?.user_id;
  return user_id;
}
