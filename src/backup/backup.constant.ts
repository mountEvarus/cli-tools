import { ModuleMetadata } from '@/src/module/module.type';

export const BACKUP_MODULE_METADATA: ModuleMetadata = {
  description: 'Backup a list of directories',
  name: 'backup',
  options: [
    {
      defaultValue: '',
      description: 'backup destination',
      flags: '-d, --destination <path>',
    },
    {
      defaultValue: [],
      description: 'comma seperated list of paths to backup',
      flags: '-p, --paths <path[]>',
    },
    {
      description: 'backup to remote',
      flags: '-r, --remote',
    },
  ],
};
