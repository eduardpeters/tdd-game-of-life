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

  test('A cell with one neighbor dies after one generation', () => {
    const testMatrix = [[ALIVE_CELL, ALIVE_CELL]];

    const result = runSimulations(testMatrix, 1);

    const afterOneGeneration = [[DEAD_CELL, DEAD_CELL]];

    expect(result).toEqual(afterOneGeneration);
  });

  test('A cell with four neighbors dies after one generation', () => {
    const testMatrix = [
      [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
      [ALIVE_CELL, DEAD_CELL, ALIVE_CELL],
    ];

    const result = runSimulations(testMatrix, 1);

    const afterOneGeneration = [
      [ALIVE_CELL, DEAD_CELL, ALIVE_CELL],
      [ALIVE_CELL, DEAD_CELL, ALIVE_CELL],
    ];

    expect(result).toEqual(afterOneGeneration);
  });

  test('A dead cell with one neighbor stays dead after one generation', () => {
    const testMatrix = [[DEAD_CELL, ALIVE_CELL]];

    const result = runSimulations(testMatrix, 1);

    const afterOneGeneration = [[DEAD_CELL, DEAD_CELL]];

    expect(result).toEqual(afterOneGeneration);
  });

  test('A dead cell with two neighbors stays dead after one generation', () => {
    const testMatrix = [[ALIVE_CELL, DEAD_CELL, ALIVE_CELL]];

    const result = runSimulations(testMatrix, 1);

    const afterOneGeneration = [[DEAD_CELL, DEAD_CELL, DEAD_CELL]];

    expect(result).toEqual(afterOneGeneration);
  });

  test('A dead cell with four neighbors stays dead after one generation', () => {
    const testMatrix = [
      [ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
      [ALIVE_CELL, DEAD_CELL, ALIVE_CELL],
    ];

    const result = runSimulations(testMatrix, 1);

    const afterOneGeneration = [
      [ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
      [ALIVE_CELL, DEAD_CELL, DEAD_CELL],
    ];

    expect(result).toEqual(afterOneGeneration);
  });

  test('A dead cell with three neighbors comes alive after one generation', () => {
    const testMatrix = [
      [ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
      [ALIVE_CELL, DEAD_CELL, DEAD_CELL],
    ];

    const result = runSimulations(testMatrix, 1);

    const afterOneGeneration = [
      [ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
      [ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
    ];

    expect(result).toEqual(afterOneGeneration);
  });

  test.skip('A blinker pattern changes after one generation', () => {
    const testMatrix = [[ALIVE_CELL, ALIVE_CELL, ALIVE_CELL]];

    const result = runSimulations(testMatrix, 1);

    const afterOneGeneration = [
      [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
    ];

    expect(result).toEqual(afterOneGeneration);
  });
});
