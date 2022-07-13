import { MusicFile } from "@src/commands/music"

import { Log } from "@src/utils"


export function copyMusic(musicFiles: MusicFile[], copy: string): void {
  if (musicFiles.length) {
    Log.info(`Copying over music files to ${copy}`)
    musicFiles.forEach((file) => file.copyToDestination(copy))
    Log.divider()
  } else Log.info(`No music files found to copy to ${copy}`)
}
