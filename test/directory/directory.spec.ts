import { describe, expect, it } from 'bun:test';

import { Directory } from '@/src/directory';

describe('Directory class tests', () => {
  const mockValue = 'foo';

  describe('create method tests', () => {
    it('Should create a new Directory instance, with the provided dir sat as the value', () => {
      const result = Directory.create(mockValue);

      expect(result).toBeInstanceOf(Directory);
      expect(result.value).toBe(mockValue);
    });
  });

  describe('addTrailingSlash method tests', () => {
    it('Should not modifies values which already have a trailing slash', () => {
      const value = `${mockValue}/`;
      const directory = Directory.create(value);

      const result = directory.addTrailingSlash();

      expect(result.value).toBe(value);
    });

    it('Should add a trailing slash to the value when it was not already present', () => {
      const directory = Directory.create(mockValue);

      const result = directory.addTrailingSlash();

      expect(result.value).toBe(`${mockValue}/`);
    });
  });

  describe('subDirectory method tests', () => {
    it('Should return the parent directory of the current one', () => {
      const value = `${mockValue}/bar`;
      const directory = Directory.create(value);

      const result = directory.subDirectory();

      expect(result.value).toBe(mockValue);
    });
  });

  describe('appendDate method tests', () => {
    it('Should append the current date as an iso string to the value', () => {
      const value = `${mockValue}/bar`;
      const directory = Directory.create(value);

      const result = directory.appendDate();

      expect(result.value).toBe(`${value}-${new Date().toISOString()}`);
    });
  });
});
