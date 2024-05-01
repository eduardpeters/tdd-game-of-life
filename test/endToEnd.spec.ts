import { describe, expect, test } from 'vitest';
import main from '../src/index';

describe('Running the main application', () => {
  test('An error is thrown if no arguments are provided', () => {
    const filepath = '../patters/block.rle';

    expect(() => main()).toThrowError();
  });

  test('An error is thrown if no generations are specified', () => {
    const filepath = '../patters/block.rle';

    expect(() => main(filepath)).toThrowError();
  });

  test.skip('An error is thrown if no arguments are provided', () => {
    const filepath = '../patters/block.rle';

    expect(() => main()).toThrowError();
  });
});
