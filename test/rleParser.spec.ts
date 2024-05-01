import { describe, expect, test } from 'vitest';
import parseRLE from '../src/parseRLE';

const BLOCK_FILE_STRING =
  '#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!';

describe('RLE parsing', () => {
  test('It throws an error if there is nothing to parse', () => {
    const fileString = '';

    expect(() => parseRLE(fileString)).toThrowError('No file content');
  });

  test('It returns an object with comment headers', () => {
    const parsed = parseRLE(BLOCK_FILE_STRING);
    const headers = BLOCK_FILE_STRING.substring(0, BLOCK_FILE_STRING.indexOf('x =')).trim();

    expect(parsed).toHaveProperty('headers');
    expect(parsed.headers).toEqual(headers);
  });

  test('It returns empty headers if there are none', () => {
    const headerLessString = BLOCK_FILE_STRING.substring(BLOCK_FILE_STRING.indexOf('x ='));
    const parsed = parseRLE(headerLessString);

    expect(parsed).toHaveProperty('headers');
    expect(parsed.headers).toEqual('');
  });
});
