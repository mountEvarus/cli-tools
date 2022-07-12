import { exec } from "shelljs"

export function cp(sourceDir: string, destinationDir: string): void {
  exec(`cp -r "${sourceDir}" "${destinationDir}"`)
}

export function mkdir(directory: string): void {
  exec(`mkdir -p "${directory}"`)
}
