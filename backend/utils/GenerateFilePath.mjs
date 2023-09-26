export default function generateFilePath(movie_name) {
  const filePath = movie_name
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
  return `images/${filePath}.jpg`;
}
