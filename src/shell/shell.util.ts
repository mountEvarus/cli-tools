import { homedir } from 'os';
import { exec } from 'shelljs';

export const cp = (sourceDir: string, destinationDir: string): void => {
  exec(`cp -r "${sourceDir}" "${destinationDir}"`);
};

export const mkdir = (directory: string): void => {
  exec(`mkdir -p "${directory}"`);
};

export const scp = (sourceDir: string, destinationDir: string): void => {
  exec(`scp -r "${sourceDir}" "${destinationDir}"`);
};

export const replaceHomeVar = (path: string): string => {
  return path.startsWith('~') ? path.replace('~', homedir()) : path;
};
