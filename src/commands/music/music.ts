import { Command } from "commander"

import { Log, assert, atLeastOneTrue, runIfPredicate } from "@src/utils"

import { copyMusic, log } from "./actions"
import { MusicFile, getMusicFilesFromPlaylist } from "./music-file"
import { Options } from "./options"

export function addMusic(program: Command): void {
  program
    .command("music")
    .description("Interact with a playlist of music files")
    .option("-c, --copy <directory>", "copies the music to the directory path specified", "")
    .option("-i, --info", "log info table")
    .option("-m, --missing-metadata", "filter out files with no missing metadata")
    .option("-p, --playlist <playlist>", "path of the playlist to perform actions on", "")
    .action(doMusic)
}

async function doMusic(options: Options): Promise<void> {
  Log.module("Music")
  const { copy, info, missingMetadata, playlist } = options

  try {
    assert(!!playlist, "You must define the playlist")
    assert(atLeastOneTrue(copy, info), "No options were selected for this module!")

    const musicFiles = (await Promise
      .all(getMusicFilesFromPlaylist(playlist)))
      .filter(file => file)
      .filter(file => missingMetadata ? file?.isMissingMetadata() : true) as MusicFile[]

    runIfPredicate(() => log(musicFiles), info)
    runIfPredicate(() => copyMusic(musicFiles, copy), copy)

  } catch(e) {
    Log.error(e)
  }
}
