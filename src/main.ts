import "@src/extension"

import { Command } from "commander"

import { addBackup, addDirectory } from "@src/commands"
import { Log } from "@src/utils"

const start = async () => {
  try {
    Log.start()

    const program = new Command("CLI Utils")
    program.version("0.2.0")

    addBackup(program)
    addDirectory(program)

    await program.parseAsync(process.argv)
  } catch (e) {
    Log.error(e)
  }
}

void start()
