import fs from 'node:fs';
import path from 'path';
import { describe, expect, test } from 'vitest';
import main from '../src/index';

describe('Running the main application', () => {
  test('An error is thrown if no arguments are provided', () => {
    const filepath = '../patters/block.rle';

    //@ts-expect-error
    expect(() => main()).toThrowError('Two arguments should be supplied');
  });

  test('An error is thrown if no generations are specified', () => {
    const filepath = '../patters/block.rle';

    //@ts-expect-error
    expect(() => main(filepath)).toThrowError('Two arguments should be supplied');
  });

  test('A Block RLE file is read and returned', () => {
    const filepath = '../patterns/block.rle';
    const generations = 1;

    const rlePath = path.join(__dirname, filepath);
    const fileString = fs.readFileSync(rlePath, 'utf-8');

    expect(main(filepath, generations)).toEqual(fileString);
  });

  test('A Blinker RLE file is read and returned', () => {
    const filepath = '../patterns/blinker.rle';
    const generations = 0;

    const rlePath = path.join(__dirname, filepath);
    const fileString = fs.readFileSync(rlePath, 'utf-8');

    expect(main(filepath, generations)).toEqual(fileString);
  });

  test('A Glider RLE file is read and returned', () => {
    const filepath = '../patterns/glider.rle';
    const generations = 0;

    const rlePath = path.join(__dirname, filepath);
    const fileString = fs.readFileSync(rlePath, 'utf-8');

    expect(main(filepath, generations)).toEqual(fileString);
  });
});
