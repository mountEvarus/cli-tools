export {}

declare global {
  interface Boolean {
    not(): boolean
  }
  interface String {
    replaceForbiddenChar(): string
    truncate(length?: number): string
  }
}
