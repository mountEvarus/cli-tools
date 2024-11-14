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

  appendDate = (): File => {
    const extension = path.extname(this.file);
    const fileName = path.basename(this.file, extension);
    const dateSuffix = this.formatDate();

    const datedFileName = `${fileName}-${dateSuffix}${extension}`;

    this.file = datedFileName;

    return this;
  };
}
