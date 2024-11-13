import * as fs from 'node:fs';
import * as path from 'path';

export const getFilesFromDirectory = (directoryPath: string): string[] => {
  const paths: string[] = [];

  fs.readdirSync(directoryPath, 'utf-8').forEach(file => {
    const absolutePath = path.join(directoryPath, file);

    fs.statSync(absolutePath).isDirectory()
      ? paths.push(...getFilesFromDirectory(absolutePath))
      : paths.push(absolutePath);
  });

  return paths;
};
