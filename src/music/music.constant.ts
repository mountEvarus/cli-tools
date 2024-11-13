import { ModuleMetadata } from '@/src/module/module.type';

export const MUSIC_MODULE_METADATA: ModuleMetadata = {
  description: 'Music module',
  name: 'music',
  options: [
    {
      defaultValue: '',
      description: 'copies the music to the directory path specified',
      flags: '-c, --copy <directory>',
    },
    {
      description: 'log info table',
      flags: '-i, --info',
    },
    {
      description: 'filter out files with no missing metadata',
      flags: '-m, --missing-metadata',
    },
    {
      defaultValue: '',
      description: 'path of the playlist to perform actions on',
      flags: '-p, --playlist <playlist>',
    },
  ],
};
