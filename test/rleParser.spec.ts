import { describe, expect, test } from 'vitest';
import parseRLE from '../src/parseRLE';
import { ALIVE_CELL, DEAD_CELL } from '../src/constants';

const BLOCK_FILE_STRING =
  '#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!';
const GLIDER_FILE_STRING =
  '#N Glider\n#O Richard K. Guy\n#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.\n#C www.conwaylife.com/wiki/index.php?title=Glider\nx = 3, y = 3, rule = B3/S23\nbob$2bo$3o!';

describe('RLE parsing', () => {
  test('It throws an error if there is nothing to parse', () => {
    const fileString = '';

    expect(() => parseRLE(fileString)).toThrowError('No file content');
  });

  test('It returns an object with headers', () => {
    const parsed = parseRLE(BLOCK_FILE_STRING);
    const headers = BLOCK_FILE_STRING.substring(0, BLOCK_FILE_STRING.indexOf('2o$2o!')).trim();

    expect(parsed).toHaveProperty('headers');
    expect(parsed.headers).toEqual(headers);
  });

  test('It returns only dimension headers if there are no comments', () => {
    const headerLessString = BLOCK_FILE_STRING.substring(BLOCK_FILE_STRING.indexOf('x ='));
    const parsed = parseRLE(headerLessString);

    expect(parsed).toHaveProperty('headers');
    expect(parsed.headers).toEqual('x = 2, y = 2, rule = B3/S23');
  });

  test('It returns an object with dimensions', () => {
    const parsed = parseRLE(BLOCK_FILE_STRING);

    const dimensions = { x: 2, y: 2 };

    expect(parsed).toHaveProperty('dimensions');
    expect(parsed.dimensions).toEqual(dimensions);
  });

  test('It throws an error if no dimensions line is present', () => {
    const dimensionLessFile = BLOCK_FILE_STRING.split('\n')
      .filter((line) => !line.startsWith('x ='))
      .join('\n');

    expect(() => parseRLE(dimensionLessFile)).toThrowError('No valid dimensions found');
  });

  test('It throws an error if no y dimension is provided', () => {
    const invalidDimensions = 'x = 2\n2o$2o!';

    expect(() => parseRLE(invalidDimensions)).toThrowError('No valid dimensions found');
  });

  test('Dimensions should be at least 1 in magnitude', () => {
    const invalidDimensions = 'x = 2, y = -2\n2o$2o!';

    expect(() => parseRLE(invalidDimensions)).toThrowError('No valid dimensions found');
  });

  test('Whitespace is not relevant when extracting dimensions', () => {
    const irregularWhitespace = 'x  =  2, y= 2\n2o$2o!';
    const parsed = parseRLE(irregularWhitespace);

    const dimensions = { x: 2, y: 2 };

    expect(parsed).toHaveProperty('dimensions');
    expect(parsed.dimensions).toEqual(dimensions);
  });

  test('Pattern matrix is returned in the object', () => {
    const parsed = parseRLE(BLOCK_FILE_STRING);

    expect(parsed).toHaveProperty('matrix');
    expect(parsed.matrix).toBeInstanceOf(Array);
  });

  test('Pattern matrix has the correct dimensions', () => {
    const parsed = parseRLE(BLOCK_FILE_STRING);

    const resultMatrix = parsed.matrix;

    expect(resultMatrix).toHaveLength(2);
    expect(resultMatrix[0]).toHaveLength(2);
  });

  test('Pattern matrix has the correct cells when all are alive', () => {
    const parsed = parseRLE(BLOCK_FILE_STRING);

    const blockPattern = [
      [ALIVE_CELL, ALIVE_CELL],
      [ALIVE_CELL, ALIVE_CELL],
    ];
    expect(parsed.matrix).toEqual(blockPattern);
  });

  test('Pattern matrix has the correct cells there is a mixture of cells', () => {
    const parsed = parseRLE(GLIDER_FILE_STRING);

    const blockPattern = [
      [DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, ALIVE_CELL],
      [ALIVE_CELL, ALIVE_CELL, ALIVE_CELL],
    ];
    expect(parsed.matrix).toEqual(blockPattern);
  });

  test('Dead cells are filled in the patterns', () => {
    const inferredDeadCellsPattern = 'x = 4, y = 4\n2bo$o$4b$2o!';
    const parsed = parseRLE(inferredDeadCellsPattern);

    const blockPattern = [
      [DEAD_CELL, DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      [ALIVE_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [ALIVE_CELL, ALIVE_CELL, DEAD_CELL, DEAD_CELL],
    ];

    expect(parsed.matrix).toEqual(blockPattern);
  });

  test('Everything after the ! end tag is ignored', () => {
    const inferredDeadCellsPattern = 'x = 4, y = 4\n2bo$o$4b$2o!2bo$o$4b$2o';
    const parsed = parseRLE(inferredDeadCellsPattern);

    const blockPattern = [
      [DEAD_CELL, DEAD_CELL, ALIVE_CELL, DEAD_CELL],
      [ALIVE_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [ALIVE_CELL, ALIVE_CELL, DEAD_CELL, DEAD_CELL],
    ];

    expect(parsed.matrix).toEqual(blockPattern);
  });
});
