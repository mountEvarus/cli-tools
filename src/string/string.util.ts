import { isNil } from 'lodash';

export const replaceForbiddenChar = (value?: string): string | undefined => {
  if (isNil(value)) {
    return undefined;
  }

  const replacements = {
    '<': 'less than',
    '>': 'greater than',
    ':': ' -',
    '/': ' ',
  };

  const charsToRemove = /[?,*.""]/g;

  return value.replace(/[<>:/]/g, char => replacements[char] || '').replace(charsToRemove, '');
};

export const truncateString = (value?: string, length: number = 10): string | undefined => {
  if (isNil(value)) {
    return undefined;
  }

  if (value.length <= length - 3) {
    return value;
  }

  return value.slice(0, length - 3) + '...';
};
