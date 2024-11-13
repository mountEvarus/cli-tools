import * as fs from 'node:fs';

import { Directory } from '@/src/directory';
import { File } from '@/src/file';
import { cp, replaceHomeVar, scp } from '@/src/shell';

import { BackupModuleOptions } from './backup.type';

export const handleBackupAction = (options: BackupModuleOptions): void => {
  const { destination, paths, remote } = options;
  if (!destination || !paths.length) {
    throw new Error("destination & paths must be defined, see 'backup --help' for more details");
  }

  const copyHandler = remote ? scp : cp;

  const rootDir = Directory.create(destination).addTrailingSlash().value;

  paths.forEach(path => {
    const cleanedPath = replaceHomeVar(path);

    if (fs.lstatSync(cleanedPath).isDirectory()) {
      const subDir = Directory.create(cleanedPath).addTrailingSlash().subDirectory().appendDate().value;

      console.info(`Backing up ${cleanedPath}`);
      copyHandler(cleanedPath, rootDir + subDir);
      return;
    }

    const file = File.create(cleanedPath).appendDate().value;

    console.info(`Backing up ${cleanedPath}`);
    copyHandler(cleanedPath, rootDir + file);
  });
};
