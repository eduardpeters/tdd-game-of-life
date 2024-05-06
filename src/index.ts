import { argv } from 'node:process';
import fs from 'node:fs';
import path from 'path';
import parseRLE from './parseRLE';
import encodeRLE from './encodeRLE';
import runSimulations from './runSimulations';

export default function main(filepath: string, generations: number) {
  if (filepath === undefined || generations === undefined) {
    throw new Error('Two arguments should be supplied');
  }

  const file = fs.readFileSync(path.join(__dirname, filepath), 'utf-8');

  const parsed = parseRLE(file);

  const simulated = runSimulations(parsed.matrix, generations);

  const encoded = encodeRLE({
    ...parsed,
    matrix: simulated,
  });

  return encoded;
}

console.log(main(argv[2], parseInt(argv[3])));
