export {}

declare global {
  interface String {
    replaceForbiddenChar(): string
    truncate(length?: number): string
  }
}
