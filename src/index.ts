import fs from 'node:fs';
import path from 'path';

export default function main(filepath: string, generations: number) {
  if (filepath === undefined || generations === undefined) {
    throw new Error('Two arguments should be supplied');
  }

  const file = fs.readFileSync(path.join(__dirname, filepath), 'utf-8');

  return file;
}
