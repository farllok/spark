import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = dirname(fileURLToPath(import.meta.url));
const source = join(repositoryRoot, 'entry.png');
const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const destination = join(outputDirectory, 'entry.png');
const preview = process.argv.includes('--preview');

if (!existsSync(source)) {
  console.error(`Missing entry.png at ${source}. Render art/index.html before running this entry.`);
  process.exitCode = preview ? 0 : 1;
} else {
  mkdirSync(outputDirectory, { recursive: true });
  copyFileSync(source, destination);
  console.log(JSON.stringify({ entry: destination, bytes: statSync(destination).size }));
}
