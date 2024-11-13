export type ModuleMetadata = {
  description: string;
  name: string;
  options: ModuleOption[];
};

type ModuleOption = {
  defaultValue?: string | string[] | boolean;
  description: string;
  flags: string;
};
