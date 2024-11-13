import path from 'path';

export class Directory {
  private dir: string;

  private constructor(dir: string) {
    this.dir = path.normalize(dir);
  }

  get value() {
    return this.dir;
  }

  static create = (dir: string): Directory => {
    return new Directory(dir);
  };

  addTrailingSlash = (): Directory => {
    this.dir = `${this.dir}${this.dir.endsWith('/') ? '' : '/'}`;

    return this;
  };

  subDirectory = (): Directory => {
    const splitDir = this.dir.split('/');

    this.dir = splitDir[splitDir.length - 2];

    return this;
  };

  appendDate = (): Directory => {
    this.dir = `${this.dir}-${new Date().toISOString()}`;

    return this;
  };
}
