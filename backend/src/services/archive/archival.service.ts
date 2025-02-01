import archiver, { create } from "archiver";
import { createReadStream, createWriteStream } from "node:fs";

import { join } from "path";

export async function archiveFolder(folderPath: string) {
  const output = createWriteStream(join(folderPath, "crawl-results.zip"));
  const archive = create("zip", { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(folderPath, false);
  await archive.finalize();
}

export function downloadArchive(outputFile: string) {
  return createReadStream(outputFile);
}
