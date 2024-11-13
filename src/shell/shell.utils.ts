import { $ } from 'bun';
import { homedir } from 'os';

export const cp = (sourceDir: string, destinationDir: string): void => {
  $`cp -r "${sourceDir}" "${destinationDir}"`;
};

export const mkdir = (directory: string): void => {
  $`mkdir -p "${directory}"`;
};

export const scp = (sourceDir: string, destinationDir: string): void => {
  $`scp -r "${sourceDir}" "${destinationDir}"`;
};

export const replaceHomeVar = (path: string): string => {
  return path.startsWith('~') ? path.replace('~', homedir()) : path;
};
