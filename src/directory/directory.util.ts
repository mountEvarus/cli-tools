import { $ } from 'bun';

import { getFilesFromDirectory } from '@/src/file';

import { DirectoryModuleOptions } from './directory.type';

export const handleDirectoryAction = (options: DirectoryModuleOptions): void => {
  const { directory, extension, info, remove } = options;

  if (!directory) {
    throw new Error('directory must be specified');
  }

  if (!info && !remove) {
    throw new Error('No options were selected for this module!');
  }

  const files = getFilesFromDirectory(directory).filter(file => {
    return extension ? file.endsWith(`.${extension}`) : true;
  });

  if (info) {
    logFiles(files);
  }

  if (remove) {
    removeFiles(files);
  }
};

const removeFiles = (files: string[]): void => {
  files.forEach(file => {
    console.info(`Removing ${file}`);
    $`rm -rf "${file}"`;
  });
};

const logFiles = (files: string[]): void => {
  if (!files.length) {
    console.info('No files found to log');
    return;
  }

  console.info('Logging information');
  console.table(files);
};
