export const csvToArray = (value: string): string[] => {
  return value.split(',').map(s => s.trim());
};
