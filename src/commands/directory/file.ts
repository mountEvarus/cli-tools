import * as fs from "fs"
import * as path from "path"

export function getFilesFromDirectory(directoryPath: string): string[] {
  const paths: string[] = []
  
  fs.readdirSync(directoryPath, "utf-8").forEach((file) => {
    const absolutePath = path.join(directoryPath, file)
  
    fs.statSync(absolutePath).isDirectory()
      ? paths.push(...getFilesFromDirectory(absolutePath))
      : paths.push(absolutePath)
  })
  
  return paths
}
