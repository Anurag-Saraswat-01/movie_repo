import _escape from "./Escape.mjs";

export default function paramInjector(queryString, params) {
  params.forEach((param) => {
    queryString = queryString.replace("?", _escape(param));
  });
  return queryString;
}
