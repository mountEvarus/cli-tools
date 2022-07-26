import { homedir } from "os"

export function replaceHomeVar(path: string): string {
  return path.startsWith("~") ? path.replace("~", homedir()) : path
}
