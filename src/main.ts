import { Command } from "commander"

import { Log } from "@src/utils"

const start = async () => {
  try {
    Log.start()

    const program = new Command("CLI Utils")
    program.version("0.1.0")

    await program.parseAsync(process.argv)
  } catch (e) {
    Log.error(e)
  }
}

void start()
