import { query } from "../../app.js";
import bcrypt from "bcrypt";

export default async function signin(username, password) {
  const queryString = "SELECT password, user_id FROM Users WHERE username = ?";

  // fetching hash stored in db
  let result = await query(queryString, [username]);

  console.dir(result);
  // let hash = result.output.password;
  // let user_id = result.output.user_id;
  let hash = result?.recordset[0]?.password;
  let user_id = result?.recordset[0]?.user_id;

  // comparing password and hash
  let passwordMatch = await bcrypt.compare(password, hash);
  console.log(passwordMatch);

  return { passwordMatch, user_id };
}
