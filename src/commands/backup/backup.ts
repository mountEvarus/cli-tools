import * as fs from "fs"

import { assert } from "@evan-abc/typescript-helpers"
import { Command } from "commander"

import { Log, allTrue, csvToArray, replaceHomeVar, scp } from "@src/utils"

import { Directory } from "./directory"
import { File } from "./file"
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
      new Error("destination & paths must be defined, see 'backup --help' for more details"),
    )

    const rootDir = Directory
      .create(destination)
      .addTrailingSlash()
      .result()

    paths
      .map((path) => replaceHomeVar(path))
      .forEach((path) => {
        if (fs.lstatSync(path).isDirectory()) {
          const subDir = Directory.create(path)
            .addTrailingSlash()
            .subDirectory()
            .appendDate()
            .result()

          Log.info(`Backing up ${path}`)
          scp(path, rootDir + subDir)
        } else {
          const file = File.create(path)
            .appendDate()
            .result()

          Log.info(`Backing up ${path}`)
          scp(path, rootDir + file)
        }

      })
  } catch (e) {
    Log.error(e)
  }
}
