import { Command } from 'commander';

import { csvToArray } from '@/src/array';

import { ModuleMetadata } from './module.type';

export const addModuleToProgram = <T extends Record<string, string | boolean | string[]> | undefined>(
  program: Command,
  metadata: ModuleMetadata,
  action: (options: T) => Promise<void> | void,
): void => {
  program.command(metadata.name);

  if (metadata.description) {
    program.description(metadata.description);
  }

  if (metadata.options.length > 0) {
    metadata.options.forEach(option => {
      if (Array.isArray(option.defaultValue)) {
        program.option<string[]>(option.flags, option.description, csvToArray, option.defaultValue as string[]);
        return;
      }

      program.option(option.flags, option.description, option.defaultValue);
    });
  }

  program.action(async options => {
    console.info(`Running ${metadata.name} module`);
    try {
      await action(options);
    } catch (err) {
      console.error(`Unable to run ${metadata.name} module: ${err.message} - ${err.stack}`);
    }
  });
};
