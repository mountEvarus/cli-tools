import { Log } from "@src/utils"

export function logFiles(files: string[]): void {
  if (files.length) {
    Log.info("Logging information")
    Log.table(files)
    Log.divider()
  } else Log.info("No files found to log")
}
