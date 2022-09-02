import { assert } from "@evan-abc/typescript-helpers"
import { Command } from "commander"

import { Log, atLeastOneTrue, runIfPredicate } from "@src/utils"

import { copyMusic, log } from "./actions"
import { getMusicFilesFromPlaylist } from "./music-file"
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
    assert(!!playlist, new Error("You must define the playlist"))
    assert(atLeastOneTrue(copy, info), new Error("No options were selected for this module!"))

    const musicFiles = (await getMusicFilesFromPlaylist(playlist))
      .filter(file => missingMetadata ? file?.isMissingMetadata() : true)

    runIfPredicate(() => log(musicFiles), info)
    runIfPredicate(() => copyMusic(musicFiles, copy), copy)

  } catch(e) {
    Log.error(e)
  }
}
