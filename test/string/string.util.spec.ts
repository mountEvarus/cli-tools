import { describe, expect, it } from 'bun:test';

import { replaceForbiddenChar, truncateString } from '@/src/string';

describe('replaceForbiddenChar function tests', () => {
  it('Should handle empty values"', () => {
    const value = undefined;

    const result = replaceForbiddenChar(value);

    expect(result).toBeUndefined();
  });

  it('Should replace "<" with "less than"', () => {
    const value = 'less than';

    const result = replaceForbiddenChar(value);

    expect(result).toBe('less than');
  });

  it('Should replace ">" with "greater than"', () => {
    const value = '>';

    const result = replaceForbiddenChar(value);

    expect(result).toBe('greater than');
  });

  it('Should replace ":" with " -"', () => {
    const value = ':';

    const result = replaceForbiddenChar(value);

    expect(result).toBe(' -');
  });

  it('Should remove ","', () => {
    const value = ',';

    const result = replaceForbiddenChar(value);

    expect(result).toBe('');
  });

  it('Should replace "/" with a space', () => {
    const value = '/';

    const result = replaceForbiddenChar(value);

    expect(result).toBe(' ');
  });

  it('Should remove "?"', () => {
    const value = '?';

    const result = replaceForbiddenChar(value);

    expect(result).toBe('');
  });

  it('Should remove "*"', () => {
    const value = '*';

    const result = replaceForbiddenChar(value);

    expect(result).toBe('');
  });

  it('Should remove "."', () => {
    const value = '.';

    const result = replaceForbiddenChar(value);

    expect(result).toBe('');
  });

  it('Should remove `"`', () => {
    const value = '"';

    const result = replaceForbiddenChar(value);

    expect(result).toBe('');
  });

  it('Should handle multiple replacements in a single string', () => {
    const value = '< Hello: World >/';

    const result = replaceForbiddenChar(value);

    expect(result).toBe('less than Hello - World greater than ');
  });
});

describe('truncateString function tests', () => {
  it('Should handle undefined values', () => {
    const value = undefined;

    const result = truncateString(value);

    expect(result).toBeUndefined();
  });

  it('Should return the string unchanged if it is shorter than the specified length', () => {
    const value = 'Hello';
    const length = 10;

    const result = truncateString(value, length);

    expect(result).toBe('Hello');
  });

  it('Should return the string unchanged if it is equal to the specified length', () => {
    const value = 'Hello';
    const length = 8;

    const result = truncateString(value, length);

    expect(result).toBe('Hello');
  });

  it('Should truncate the string and add "..." if it exceeds the specified length', () => {
    const value = 'Hello, world!';
    const length = 10;

    const result = truncateString(value, length);

    expect(result).toBe('Hello, ...');
  });

  it('Should handle an empty string correctly', () => {
    const value = '';

    const result = truncateString(value);

    expect(result).toBe('');
  });
});
