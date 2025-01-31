import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import * as archiver from 'archiver';

export function createArchive(outputDir: string, outputFile: string) {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputFile);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });

    output.on('close', () => {
      console.log(archive.pointer() + ' total bytes');
      console.log('Archiver has been finalized and the output file descriptor has closed.');
      resolve(outputFile);
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    archive.directory(outputDir, false);

    archive.finalize();
  });
}

export function downloadArchive(outputFile: string) {
  return createReadStream(outputFile);
}