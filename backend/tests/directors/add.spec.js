// USAGE: npx tap tests\directors\add.spec.js

import tap from "tap";
import add from "../../services/directors/add.mjs";
import query from "../../query.mjs";

const fetchQuery = "SELECT * FROM Directors WHERE director_name = ?";

const deleteQuery = "DELETE FROM Directors WHERE director_id = ?";

tap.test("Module Test", async (t) => {
  t.ok(add, "Function exists");
  t.end();
});

tap.test("Insert new director", async (t) => {
  const director_name = "dummy director";

  const director_id = await add(director_name);

  const result = await query(fetchQuery, [director_name]);

  t.ok(result, "Result received");
  t.equal(director_id, result.recordset[0].director_id, "Director ID matches");

  await query(deleteQuery, [director_id]);

  t.end();
});

tap.test("Insert null", async (t) => {
  const director_name = null;

  t.rejects(
    () => add(director_name),
    Error(
      `Cannot insert the value NULL into column 'director_name', table 'movie_repo.dbo.Directors'; column does not allow nulls. INSERT fails.`
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
