import fs from 'node:fs';
import path from 'path';
import { describe, expect, test } from 'vitest';
import main from '../src/index';

describe('Running the main application', () => {
  test('An error is thrown if no arguments are provided', () => {
    const filepath = '../patters/block.rle';

    //@ts-expect-error
    expect(() => main()).toThrowError();
  });

  test('An error is thrown if no generations are specified', () => {
    const filepath = '../patters/block.rle';

    //@ts-expect-error
    expect(() => main(filepath)).toThrowError();
  });

  test('A RLE file is read and returned', () => {
    const filepath = '../patterns/block.rle';
    const generations = 1;

    const rlePath = path.join(__dirname, filepath);
    const fileString = fs.readFileSync(rlePath, 'utf-8');

    expect(main(filepath, generations)).toEqual(fileString);
  });
});
