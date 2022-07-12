/* eslint-disable no-console */

export const Log = {
  divider: () => console.log("-----"),
  error: (...params: unknown[]) => console.error("ERROR:", ...params),
  info: (...params: unknown[]) => console.log("INFO:", ...params),
  module: (...params: unknown[]) => console.log("MODULE:", ...params, "\n"),
  start: () => console.log("Starting CLI Utils...\n"),
  table: (data: unknown) => console.table(data),
}
