export class File {
  private file: string

  private constructor(path: string) {
    this.file = this.getFileFromPath(path)
  }

  private getFileFromPath(path: string): string {
    const splitFilePath = path.split("/")
    const fileName = splitFilePath[splitFilePath.length - 1]

    return fileName
  }

  public static create(file: string): File {
    return new File(file)
  }
  
  public appendDate(): File {
    if (this.fileHasNoExtension()) {

      const datedFileName = `${this.file}-${new Date().toISOString()}`

      this.file = datedFileName

      return this
    }

    const index = this.file.lastIndexOf(".")

    const fileName = this.file.substring(0, index)
    const extension = this.file.substring(index + 1)

    const datedFileName = `${fileName}-${new Date().toISOString()}.${extension}`

    this.file = datedFileName

    return this
  }

  private fileHasNoExtension(): boolean {
    const fileStartsWithDot = this.file[0] === "."
    const fileOnlyHasOneDot = (this.file.split(".").length - 1) === 1

    return fileStartsWithDot && fileOnlyHasOneDot
  }

  public result(): string {
    return this.file
  }
}
