export function allTrue(...values: unknown[]): boolean {
  return (
    values.reduce((a: number, b: unknown) => (b ? a + 1 : a), 0) ===
    values.length
  )
}

export function runIfPredicate(functionToRun: () => unknown, predicate: unknown): void {
  if (predicate) {
    functionToRun()
  }
}
