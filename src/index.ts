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
    dimensions: { x: simulated[0].length, y: simulated.length },
    matrix: simulated,
  });

  return encoded;
}
