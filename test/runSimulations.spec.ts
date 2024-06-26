import { describe, expect, test } from 'vitest';
import { ALIVE_CELL, DEAD_CELL } from '../src/constants';
import runSimulations from '../src/runSimulations';

describe('Simulate generations passing in the pattern', () => {
  test('A pattern if left unchanged if no generations pass', () => {
    const testMatrix = [[ALIVE_CELL]];

    const result = runSimulations(testMatrix, 0);

    expect(result).toEqual(testMatrix);
  });

  describe('Pattern evolution after a single generation', () => {
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
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, DEAD_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
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
  });

  describe('Pattern expansions after a single generation', () => {
    test('The pattern expands one row above when a dead cell comes alive outside the edge', () => {
      const testMatrix = [
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
        [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });

    test('The pattern expands one row below when a dead cell comes alive outside the edge', () => {
      const testMatrix = [
        [DEAD_CELL, DEAD_CELL, DEAD_CELL],
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });

    test('The pattern expands one row above and below when dead cells come alive outside the edge', () => {
      const testMatrix = [
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [ALIVE_CELL, DEAD_CELL, ALIVE_CELL],
        [ALIVE_CELL, DEAD_CELL, ALIVE_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });

    test('The pattern expands one row left when a dead cell comes alive outside the edge', () => {
      const testMatrix = [
        [ALIVE_CELL, DEAD_CELL],
        [ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, DEAD_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
        [DEAD_CELL, ALIVE_CELL, ALIVE_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });

    test('The pattern expands one row above and left when dead cells come alive outside the edge', () => {
      const testMatrix = [
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, DEAD_CELL, DEAD_CELL],
        [ALIVE_CELL, DEAD_CELL, DEAD_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
        [ALIVE_CELL, ALIVE_CELL, DEAD_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });

    test('The pattern expands one row below and left when dead cells come alive outside the edge', () => {
      const testMatrix = [
        [ALIVE_CELL, DEAD_CELL, DEAD_CELL],
        [ALIVE_CELL, DEAD_CELL, DEAD_CELL],
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
        [ALIVE_CELL, ALIVE_CELL, DEAD_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });

    test('The pattern expands one row right when a dead cell comes alive outside the edge', () => {
      const testMatrix = [
        [DEAD_CELL, ALIVE_CELL],
        [DEAD_CELL, ALIVE_CELL],
        [DEAD_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, DEAD_CELL, DEAD_CELL],
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
        [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });

    test('The pattern expands one row left and right when dead cells come alive outside the edge', () => {
      const testMatrix = [
        [ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
        [ALIVE_CELL, DEAD_CELL, DEAD_CELL, ALIVE_CELL],
        [DEAD_CELL, ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });

    test('The pattern expands one row above and right when dead cells come alive outside the edge', () => {
      const testMatrix = [
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL],
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL, ALIVE_CELL],
        [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });

    test('The pattern expands one row below and right when dead cells come alive outside the edge', () => {
      const testMatrix = [
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL],
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL],
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL, ALIVE_CELL],
        [DEAD_CELL, ALIVE_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });

    test('The pattern expands in all four directions when dead cells come alive outside the edge', () => {
      const testMatrix = [
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 1);

      const afterOneGeneration = [
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL, DEAD_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [ALIVE_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL, ALIVE_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL, DEAD_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterOneGeneration);
    });
  });

  describe('Multiple generation simulations', () => {
    test('The blinker pattern returns to its original pattern after two generations', () => {
      const testMatrix = [
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      ];

      const result = runSimulations(testMatrix, 2);

      const afterTwoGenerations = [
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      ];

      expect(result).toEqual(afterTwoGenerations);
    });

    test('The block pattern does not change after multiple generations', () => {
      const testMatrix = [
        [ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 10);

      const afterNGenerations = [
        [ALIVE_CELL, ALIVE_CELL],
        [ALIVE_CELL, ALIVE_CELL],
      ];

      expect(result).toEqual(afterNGenerations);
    });

    test('The glider pattern returns to its original state after four generations, but traveled expanding the boundaries', () => {
      //bo$2bo$3o!
      const testMatrix = [
        [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL],
        [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
      ];

      const result = runSimulations(testMatrix, 4);

      const afterFourGenerations = [
        [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, ALIVE_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, DEAD_CELL, ALIVE_CELL],
        [DEAD_CELL, ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
      ];

      expect(result).toEqual(afterFourGenerations);
    });
  });
});
