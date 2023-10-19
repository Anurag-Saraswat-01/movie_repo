// USAGE: npx tap tests\genres\add.spec.js

import tap from "tap";
import add from "../../services/genres/add.mjs";
import query from "../../query.mjs";

const fetchQuery = "SELECT * FROM Genre WHERE genre_name = ?";

const deleteQuery = "DELETE FROM Genre WHERE genre_id = ?";

tap.test("Module Test", async (t) => {
  t.ok(add, "Function exists");
  t.end();
});

tap.test("Insert new genre", async (t) => {
  const genre_name = "dummy";

  const genre_id = await add(genre_name);

  const result = await query(fetchQuery, [genre_name]);

  t.ok(result, "Result received");
  t.equal(genre_id, result.recordset[0].genre_id, "Genre ID matches");

  await query(deleteQuery, [genre_id]);

  t.end();
});

tap.test("Insert null", async (t) => {
  const genre_name = null;

  t.rejects(
    () => add(genre_name),
    Error(
      `Cannot insert the value NULL into column 'genre_name', table 'movie_repo.dbo.Genre'; column does not allow nulls. INSERT fails.`
    ),
    "Expected fail because of null value"
  );

  t.end();
});

tap.test("Insert undefined", async (t) => {
  t.rejects(
    () => add(),
    Error(`Invalid column name 'undefined'.`),
    "Expected to fail because of no parameter"
  );

  t.end();
});
