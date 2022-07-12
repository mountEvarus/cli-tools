import { exec } from "shelljs"

import { Log } from "@src/utils"

export function removeFiles(files: string[]): void {
  files.forEach((file) => {
    Log.info(`Removing ${file}`)
    exec(`rm -rf "${file}"`)
  })
}
