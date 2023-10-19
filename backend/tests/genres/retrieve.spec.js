// USAGE: npx tap tests\genres\retrieve.spec.js

import tap from "tap";
import path from "path";
import retrieve from "../../services/genres/retrieve.mjs";

tap.test("Module Test", async (t) => {
  t.ok(retrieve, "Function exists");
  t.end();
});

tap.test("Genres data against snapshot", async (t) => {
  const result = await retrieve();

  t.snapshotFile = path.join(
    "tests",
    "genres",
    "tap-snapshot",
    "retrieve.spec.js"
  );

  t.matchSnapshot(result, "retrieve");
});
