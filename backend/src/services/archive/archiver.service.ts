import archiver from "archiver";
import { createWriteStream } from "fs";
import { join } from "path";

export class ArchiverService {
  async createArchive(sourceDir: string, outputFilename: string) {
    const outputPath = join(sourceDir, outputFilename);

    return new Promise<string>((resolve, reject) => {
      const output = createWriteStream(outputPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => resolve(outputPath));
      archive.on("error", (err) => reject(err));

      archive.pipe(output);
      archive.directory(sourceDir, false);
      archive.finalize();
    });
  }
}
