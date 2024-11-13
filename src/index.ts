import { Command } from 'commander';

import packageJson from '@/root/package.json';

import { BACKUP_MODULE_METADATA, handleBackupAction } from './backup';
import { DIRECTORY_MODULE_METADATA, handleDirectoryAction } from './directory';
import { addModuleToProgram } from './module';
import { MUSIC_MODULE_METADATA, handleMusicAction } from './music';

const start = async () => {
  try {
    console.info('Starting CLI utils...');

    const program = new Command('CLI Utils');
    program.version(packageJson.version);

    addModuleToProgram(program, BACKUP_MODULE_METADATA, handleBackupAction);
    addModuleToProgram(program, DIRECTORY_MODULE_METADATA, handleDirectoryAction);
    addModuleToProgram(program, MUSIC_MODULE_METADATA, handleMusicAction);

    await program.parseAsync(Bun.argv);
  } catch (err) {
    console.error(`Unable to start CLI: ${err.message} - ${err.stack}`);
  }
};

void start();
