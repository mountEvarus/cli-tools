export function assert(predicate: boolean, message: string): void {
  if (predicate.not()) throw Error(message)
}
