import fs from "fs/promises";

export default async function downloadPoster(file, filePath) {
  try {
    console.log(file);
    await fs.writeFile(`./public/${filePath}`, file.buffer);
  } catch (error) {
    console.error(error);
  }
}
