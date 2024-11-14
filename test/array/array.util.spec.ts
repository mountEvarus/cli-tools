import { describe, expect, it } from 'bun:test';

import { csvToArray } from '@/src/array';

describe('csvToArray function tests', () => {
  it('Should return a string without commas as a single value', () => {
    const value = 'Hello';

    const result = csvToArray(value);

    expect(result).toEqual([value]);
  });

  it('Should split a string with commas into an array', () => {
    const value = 'Hello,World';

    const result = csvToArray(value);

    expect(result).toEqual(['Hello', 'World']);
  });
});
