import { writeFile } from "fs/promises";
import path from "path";

export async function saveJsonToTxt<T>(data: T) {
  const json = JSON.stringify(data, null, 2);

  // Save to /public/output/listing.txt
  const filePath = path.join(process.cwd(), "public", "output", "listing.txt");

  await writeFile(filePath, json, "utf8");

  return filePath;
}
