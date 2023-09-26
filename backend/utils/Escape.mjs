export default function _escape(term) {
  if (term === null) {
    return "NULL";
  }

  if (typeof term === "number") {
    return `${term}`;
  }

  if (typeof term === "string") {
    return `'${term}'`;
  }
}
