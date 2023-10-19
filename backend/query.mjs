import { pool } from "./app.js";
import paramInjector from "./utils/ParamInjector.mjs";

export default async function query(queryString, params) {
  queryString = paramInjector(queryString, params);
  let result = await pool.request().query(queryString);
  return result;
}
