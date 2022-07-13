import { Command } from "commander"

import { Log, assert, atLeastOneTrue, runIfPredicate } from "@src/utils"

import { logFiles, removeFiles } from "./actions"
import { getFilesFromDirectory } from "./file"
import { Options } from "./options"

export function addDirectory(program: Command): void {
  program
    .command("directory")
    .description("Interact with a directory")
    .option("-d, --directory <directory>", "the directory to use", "")
    .option("-e, --extension <extension>", "filter by file extension", "")
    .option("-i, --info", "log info table")
    .option("-x, --remove", "empty selected files from directory")
    .action(doDirectory)
}

function doDirectory(options: Options): void {
  try {
    Log.module("Directory")
    const { directory, extension, info, remove } = options

    assert(Boolean(directory), "directory must be specified")
    assert(atLeastOneTrue(info, remove), "No options were selected for this module!")

    const files = getFilesFromDirectory(directory).filter((file) => {
      return extension ? file.endsWith(`.${extension}`) : true
    })

    runIfPredicate(() => {
      logFiles(files)
    }, info)
  
    runIfPredicate(() => {
      removeFiles(files)
    }, remove)

  } catch(e) {
    Log.error(e)
  }
}
