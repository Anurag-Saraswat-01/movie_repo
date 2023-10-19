// USAGE: npx tap tests\users\signup.spec.js

import tap from "tap";
import signup from "../../services/users/signup.mjs";
import query from "../../query.mjs";
import bcrypt from "bcrypt";

const dummyUsername = "dummy";
const dummyPassword = "dummy";

const deleteQuery = "DELETE FROM Users WHERE user_id = ?";

const fetchQuery = "SELECT * FROM Users WHERE user_id = ?";

tap.test("Module Test", async (t) => {
  t.ok(signup, "Function exists");
  t.end();
});

tap.test("Inserting user", async (t) => {
  const user_id = await signup(dummyUsername, dummyPassword);

  const result = await query(fetchQuery, [user_id]);

  t.ok(user_id, "User inserted successfully");
  t.equal(dummyUsername, result.recordset[0].username, "Username matches");

  let passwordMatch = await bcrypt.compare(
    dummyPassword,
    result.recordset[0].password
  );

  t.ok(passwordMatch, "Password matches");

  await query(deleteQuery, [user_id]);
  t.end();
});

tap.test("Inserting null values", async (t) => {
  t.rejects(
    () => signup(null, dummyPassword),
    Error(
      "Cannot insert the value NULL into column 'username', table 'movie_repo.dbo.Users'; column does not allow nulls. INSERT fails."
    ),
    "Expected to fail cause inserting null username"
  );

  t.rejects(
    () => signup(dummyUsername, null),
    Error("data and salt arguments required"),
    "Expected to fail cause inserting null password"
  );

  t.end();
});
