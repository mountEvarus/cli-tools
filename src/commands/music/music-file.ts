import * as fs from "fs"

import * as mm from "music-metadata"

import { Log, atLeastOneFalse, cp, mkdir } from "@src/utils"

export class MusicFile {
  public path: string
  public album?: string
  public albumArtist?: string
  public artist?: string
  public coverArt?: boolean
  public lossless?: boolean
  public title?: string
  public year?: number

  private constructor(rawData: string) {
    this.path = rawData
  }

  static create(rawData: string): MusicFile {
    return new MusicFile(rawData)
  }

  public async init(): Promise<MusicFile | undefined> {
    try {
      const parsedData = await mm.parseFile(this.path)

      const { album, albumartist, artist, picture, title, year } = parsedData.common
      const { lossless } = parsedData.format

      this.album = album
      this.albumArtist = albumartist
      this.artist = artist
      this.coverArt = picture ? Boolean(picture[0].data) : false
      this.lossless = lossless
      this.title = title
      this.year = year
    } catch (e) {
      Log.info(`${this.path} is not recognised as a valid music file.`)
      Log.error(e)
      return undefined
    }

    return this
  }

  public copyToDestination(destination: string): void {
    try {
      if (fs.existsSync(destination).not()) mkdir(destination)

      const outputPath = this.constructAndCreateOutputPath(destination)
      Log.info(`Copying ${this.path} to ${outputPath}`)
      cp(this.path, outputPath)
    } catch (e) {
      Log.error(e)
    }
  }

  private constructAndCreateOutputPath(destination: string): string {
    const baseOutputPath = `${destination}${destination.endsWith("/") ? "" : "/"}`

    const finalOutputPath = `${baseOutputPath}${
      this.albumArtist?.replaceForbiddenChar() ??
      this.artist?.replaceForbiddenChar() ??
      "Unknown"
    }/${this.album?.replaceForbiddenChar() ?? "Unknown"}/`
    if (fs.existsSync(finalOutputPath).not()) mkdir(finalOutputPath)
    return finalOutputPath
  }

  public isMissingMetadata(): boolean {
    return atLeastOneFalse(
      this.album,
      this.albumArtist,
      this.artist,
      this.coverArt,
      this.title,
      this.year,
    )
  }

  public truncateData(): MusicFile {
    const musicFile = { ...this }

    musicFile.artist = musicFile.artist?.truncate(40)
    musicFile.path = musicFile.path?.truncate(25)

    return musicFile
  }
}

export function getMusicFilesFromPlaylist(playlistPath: string): Promise<MusicFile | undefined>[] {
  return fs
    .readFileSync(playlistPath, "utf-8")
    .split("\r\n")
    .filter((e) => e)
    .map(async (data) => await MusicFile.create(data).init())
}
