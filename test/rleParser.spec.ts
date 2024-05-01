import { describe, expect, test } from 'vitest';
import parseRLE from '../src/parseRLE';

const BLOCK_FILE_STRING =
  '#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!';

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
});
