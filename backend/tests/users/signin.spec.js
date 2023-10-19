// USAGE: npx tap tests\users\signin.spec.js

import tap from "tap";
import signin from "../../services/users/signin.mjs";
import query from "../../query.mjs";
import bcrypt from "bcrypt";

const saltRounds = 10;
const dummyUsername = "dummy";
const dummyPassword = "dummy";
const wrongPassword = "wrong";

const insertQuery =
  "INSERT INTO Users(username, password) OUTPUT Inserted.user_id VALUES(?, ?)";

const deleteQuery = "DELETE FROM Users WHERE user_id = ?";

tap.test("Module Test", async (t) => {
  t.ok(signin, "Function Exists");
  t.end();
});

tap.test("Signing In", async (t) => {
  const hash = await bcrypt.hash(dummyPassword, saltRounds);

  const result = await query(insertQuery, [dummyUsername, hash]);
  const result_user_id = result.recordset[0].user_id;

  const correctResult = await signin(dummyUsername, dummyPassword);

  t.ok(correctResult.passwordMatch, "Password matches");
  t.ok(correctResult.user_id, "User fetched");
  t.equal(result_user_id, correctResult.user_id, "User id matches");

  const wrongResult = await signin(dummyUsername, wrongPassword);

  t.notOk(wrongResult.passwordMatch, "Password Doesn't match");

  await query(deleteQuery, [result_user_id]);
  t.end();
});

tap.test("Signin with null values", async (t) => {
  t.rejects(
    () => signin(null, dummyPassword),
    Error("data and hash arguments required"),
    "Expected to fail cause null username"
  );

  t.rejects(
    () => signin(dummyUsername, null),
    Error("data and hash arguments required"),
    "Expected to fail cause null password"
  );
});
