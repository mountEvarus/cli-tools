import { describe, expect, it } from 'bun:test';

import { File } from '@/src/file';

describe('File class tests', () => {
  const mockFilePath = 'foo';

  describe('create method tests', () => {
    it('Should create a new File instance, with the provided file filePath as the value', () => {
      const result = File.create(mockFilePath);

      expect(result).toBeInstanceOf(File);
      expect(result.value).toBe(mockFilePath);
    });
  });

  describe('formatDate method tests', () => {
    it('Should return the current date as an iso string', () => {
      const file = File.create(mockFilePath);
      const result = file['formatDate']();

      expect(result).toBe(new Date().toISOString());
    });
  });

  describe('appendDate method tests', () => {
    it('Should add the current date to the filename', () => {
      const file = File.create(mockFilePath);

      const result = file.appendDate();

      expect(result.value).toBe(`${mockFilePath}-${new Date().toISOString()}`);
    });

    it('Should add the current date to the filename (with extension)', () => {
      const file = File.create(`${mockFilePath}.txt`);

      const result = file.appendDate();

      expect(result.value).toBe(`${mockFilePath}-${new Date().toISOString()}.txt`);
    });
  });
});
