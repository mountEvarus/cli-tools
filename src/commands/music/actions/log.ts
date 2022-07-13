import { MusicFile } from "@src/commands/music"

import { Log } from "@src/utils"

export function log(musicFiles: MusicFile[]): void {
  if (musicFiles.length) {
    Log.info("Logging information")
    Log.table(musicFiles.map((file) => file.truncateData()))
    Log.divider()
  } else Log.info("No music files found to log")
}
