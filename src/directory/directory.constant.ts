import { ModuleMetadata } from '@/src/module/module.type';

export const DIRECTORY_MODULE_METADATA: ModuleMetadata = {
  description: 'Interact with a directory',
  name: 'directory',
  options: [
    {
      defaultValue: '',
      description: 'the directory to use',
      flags: '-d, --directory <directory>',
    },
    {
      defaultValue: '',
      description: 'filter by file extension',
      flags: '-e, --extension <extension>',
    },
    {
      description: 'log info table',
      flags: '-i, --info',
    },
    {
      description: 'empty selected files from directory',
      flags: '-x, --remove',
    },
  ],
};
