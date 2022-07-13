import * as fs from "fs"

import { Command } from "commander"

import { Log, allTrue, assert, cp, csvToArray, mkdir } from "@src/utils"

import { Directory } from "./directory"
import { Options } from "./options"

export function addBackup(program: Command): void {
  program
    .command("backup")
    .description("Backup a list of directories")
    .option("-d, --destination <path>", "backup destination", "")
    .option("-p, --paths <path[]>", "comma seperated list of paths to backup", csvToArray, [])
    .action(doBackup)
}

function doBackup(options: Options): void {
  Log.module("Backup")
  const { destination, paths } = options

  try {
    assert(
      allTrue(destination, paths.length),
      "--destination & --paths must be defined, see 'backup --help' for more details",
    )

    if (fs.existsSync(destination).not()) {
      mkdir(destination)
    }

    paths.forEach((path) => {
      const source = Directory.create(path).result()

      const rootDir = Directory
        .create(destination)
        .addTrailingSlash()
        .result()

      const subDir = Directory.create(path)
        .addTrailingSlash()
        .subDirectory()
        .appendDate()
        .result()

      Log.info(`Backing up ${source}`)
      cp(source, rootDir + subDir)
    })
  } catch (e) {
    Log.error(e)
  }
}
