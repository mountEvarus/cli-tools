export class Directory {
  private dir: string

  private constructor(dir: string) {
    this.dir = dir
  }

  public static create(dir: string): Directory {
    return new Directory(dir)
  }

  public addTrailingSlash(): Directory {
    this.dir = `${this.dir}${this.dir.endsWith("/") ? "" : "/"}`

    return this
  }

  public subDirectory(): Directory {
    const deconsturctedDir = this.dir.split("/")

    this.dir = deconsturctedDir[deconsturctedDir.length - 2]

    return this
  }

  public appendDate(): Directory {
    this.dir = `${this.dir}-${new Date().toISOString()}`

    return this
  }

  public result(): string {
    return this.dir
  }
}
