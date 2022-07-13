export function allTrue(...values: unknown[]): boolean {
  return trueCounter(...values) === values.length
}

export function atLeastOneFalse(...values: unknown[]): boolean {
  return trueCounter(...values) < values.length
}

export function atLeastOneTrue(...values: unknown[]): boolean {
  return trueCounter(...values) >= 1
}

function trueCounter(...values: unknown[]): number {
  return values.reduce((a: number, b: unknown) => (b ? a + 1 : a), 0)
}

export function runIfPredicate(functionToRun: () => unknown, predicate: unknown): void {
  if (predicate) {
    functionToRun()
  }
}
