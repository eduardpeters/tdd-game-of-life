import { describe, expect, test } from 'vitest';
import { ALIVE_CELL, DEAD_CELL } from '../src/constants';
import runSimulations from '../src/runSimulations';

describe('Simulate generations passing in the pattern', () => {
  test('A pattern if left unchanged if no generations pass', () => {
    const testMatrix = [[ALIVE_CELL]];

    const result = runSimulations(testMatrix, 0);

    expect(result).toEqual(testMatrix);
  });

  test('A pattern dies if it has no neighbors after one generation', () => {
    const testMatrix = [[ALIVE_CELL]];

    const result = runSimulations(testMatrix, 1);

    const resultingMatrix = [[DEAD_CELL]];

    expect(result).toEqual(resultingMatrix);
  });

  test('A block pattern remains unchanged after one generation', () => {
    const testMatrix = [
      [ALIVE_CELL, ALIVE_CELL],
      [ALIVE_CELL, ALIVE_CELL],
    ];

    const result = runSimulations(testMatrix, 1);

    expect(result).toEqual(testMatrix);
  });
});
