import "@src/extension"
import "@evan-abc/typescript-helpers"

import { Command } from "commander"

import { addBackup, addDirectory, addMusic } from "@src/commands"
import { Log } from "@src/utils"

const start = async () => {
  try {
    Log.start()

    const program = new Command("CLI Utils")
    program.version("0.3.0")

    addBackup(program)
    addDirectory(program)
    addMusic(program)

    await program.parseAsync(process.argv)
  } catch (e) {
    Log.error(e)
  }
}

void start()
