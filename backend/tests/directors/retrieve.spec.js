// USAGE: npx tap tests\directors\retrieve.spec.js

import tap from "tap";
import path from "path";
import retrieve from "../../services/directors/retrieve.mjs";

tap.test("Module Test", async (t) => {
  t.ok(retrieve, "Function exists");
  t.end();
});

tap.test("Directors data against snapshot", async (t) => {
  const result = await retrieve();

  t.snapshotFile = path.join(
    "tests",
    "directors",
    "tap-snapshot",
    "retrieve.spec.js"
  );

  t.matchSnapshot(result, "retrieve");
});
