import { beforeAll, describe, expect, it, spyOn } from 'bun:test';
import * as OsFunctions from 'os';

import { replaceHomeVar } from '@/src/shell';

describe('replaceHomeVar function tests', () => {
  beforeAll(() => {
    spyOn(OsFunctions, 'homedir').mockReturnValue('home');
  });

  it('Should return a string without a tilde (~) as is', () => {
    const value = 'foo/bar';

    const result = replaceHomeVar(value);

    expect(result).toBe(value);
  });

  it("Should replace the tilde (~) with the user's home directory", () => {
    const value = '~/foo/bar';

    const result = replaceHomeVar(value);

    expect(result).toBe('home/foo/bar');
  });
});
