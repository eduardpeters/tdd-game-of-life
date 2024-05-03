import { describe, expect, test } from 'vitest';
import encodeRLE from '../src/encodeRLE';
import { ALIVE_CELL, DEAD_CELL } from '../src/constants';

describe('RLE encoding', () => {
  test('Header lines are correctly placed at beginning of string', () => {
    const toEncode = {
      headers: '# This is a test\nx = 1, y = 1',
      dimensions: { x: 1, y: 1 },
      matrix: [['o']],
    };
    const encoded = encodeRLE(toEncode);

    expect(encoded.startsWith(toEncode.headers)).toBe(true);
  });

  test('Dimensions are correctly updated if they changed during runs', () => {
    const toEncode = {
      headers: '# This is a test\nx = 1, y = 1',
      dimensions: { x: 2, y: 2 },
      matrix: [
        ['o', 'o'],
        ['b', 'b'],
      ],
    };
    const encoded = encodeRLE(toEncode);

    const updatedDimensions = '# This is a test\nx = 2, y = 2';

    expect(encoded.startsWith(updatedDimensions)).toBe(true);
  });

  test('Dimensions are correctly updated and retain ruleset', () => {
    const toEncode = {
      headers: '# This is a test\nx = 1, y = 1, rule = B3/S23',
      dimensions: { x: 2, y: 2 },
      matrix: [
        ['o', 'o'],
        ['b', 'b'],
      ],
    };
    const encoded = encodeRLE(toEncode);

    const updatedDimensions = '# This is a test\nx = 2, y = 2, rule = B3/S23';

    expect(encoded.startsWith(updatedDimensions)).toBe(true);
  });

  test('A complete pattern in RLE is returned', () => {
    const toEncode = {
      headers: '# This is a test\nx = 1, y = 1',
      dimensions: { x: 1, y: 1 },
      matrix: [['o']],
    };
    const encoded = encodeRLE(toEncode);

    const rleEncodedReference = '# This is a test\nx = 1, y = 1\no!';

    expect(encoded).toEqual(rleEncodedReference);
  });

  test('A single row pattern with multiple live cells is correctly returned', () => {
    const toEncode = {
      headers: '# This is a test\nx = 3, y = 1',
      dimensions: { x: 3, y: 1 },
      matrix: [['o', 'o', 'o']],
    };
    const encoded = encodeRLE(toEncode);

    const rleEncodedReference = '# This is a test\nx = 3, y = 1\n3o!';

    expect(encoded).toEqual(rleEncodedReference);
  });

  test('A single row pattern with alternating cell states is correctly returned', () => {
    const toEncode = {
      headers: '# This is a test\nx = 3, y = 1',
      dimensions: { x: 3, y: 1 },
      matrix: [['o', 'b', 'o']],
    };
    const encoded = encodeRLE(toEncode);

    const rleEncodedReference = '# This is a test\nx = 3, y = 1\nobo!';

    expect(encoded).toEqual(rleEncodedReference);
  });

  test('A single row pattern with a single alive cell correctly skips final dead cells', () => {
    const toEncode = {
      headers: '# This is a test\nx = 3, y = 1',
      dimensions: { x: 3, y: 1 },
      matrix: [['o', 'b', 'b']],
    };
    const encoded = encodeRLE(toEncode);

    const rleEncodedReference = '# This is a test\nx = 3, y = 1\no!';

    expect(encoded).toEqual(rleEncodedReference);
  });
});
