import fs from 'node:fs';
import path from 'path';
import parseRLE from './parseRLE';
import encodeRLE from './encodeRLE';

export default function main(filepath: string, generations: number) {
  if (filepath === undefined || generations === undefined) {
    throw new Error('Two arguments should be supplied');
  }

  const file = fs.readFileSync(path.join(__dirname, filepath), 'utf-8');

  const parsed = parseRLE(file);

  const encoded = encodeRLE(parsed);

  return encoded;
}
