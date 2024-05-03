import { describe, expect, test } from 'vitest';
import { ALIVE_CELL } from '../src/constants';
import runSimulations from '../src/runSimulations';

describe('Simulate generations passing in the pattern', () => {
  test('A pattern if left unchanged if no generations pass', () => {
    const testMatrix = [[ALIVE_CELL]];

    const result = runSimulations(testMatrix, 0);

    expect(result).toEqual(testMatrix);
  });
});
