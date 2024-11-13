import path from 'path';

export class File {
  private file: string;

  private constructor(filePath: string) {
    this.file = path.basename(filePath);
  }

  get value() {
    return this.file;
  }

  static create = (file: string): File => {
    return new File(file);
  };

  private formatDate = (): string => {
    return new Date().toISOString();
  };

  private fileHasNoExtension = (): boolean => {
    const fileStartsWithDot = this.file.startsWith('.');
    const fileOnlyHasOneDot = this.file.split('.').length - 1 === 1;

    return fileStartsWithDot && fileOnlyHasOneDot;
  };

  appendDate = (): File => {
    const dateSuffix = `-${this.formatDate()}`;

    if (this.fileHasNoExtension()) {
      const datedFileName = `${this.file}-${dateSuffix}`;

      this.file = datedFileName;

      return this;
    }

    const index = this.file.lastIndexOf('.');

    const fileName = this.file.substring(0, index);
    const extension = this.file.substring(index + 1);

    const datedFileName = `${fileName}-${dateSuffix}.${extension}`;

    this.file = datedFileName;

    return this;
  };
}
