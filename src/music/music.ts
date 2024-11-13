import * as mm from 'music-metadata';
import * as fs from 'node:fs';
import path from 'path';

import { cp, mkdir } from '@/src/shell';
import { replaceForbiddenChar, truncateString } from '@/src/string';

export class MusicFile {
  path: string;
  album?: string;
  albumArtist?: string;
  artist?: string;
  coverArt?: boolean;
  lossless?: boolean;
  title?: string;
  year?: number;

  private constructor(rawData: string) {
    this.path = rawData;
  }

  static create(rawData: string): MusicFile {
    console.info(`Creating music file for ${rawData}`);
    return new MusicFile(rawData);
  }

  init = async (): Promise<MusicFile | undefined> => {
    try {
      const parsedData = await mm.parseFile(this.path);

      const { album, albumartist, artist, picture, title, year } = parsedData.common;
      const { lossless } = parsedData.format;

      this.album = album;
      this.albumArtist = albumartist;
      this.artist = artist;
      this.coverArt = picture ? Boolean(picture[0].data) : false;
      this.lossless = lossless;
      this.title = title;
      this.year = year;

      return this;
    } catch (err) {
      console.error(`Unable to parse music file: ${err.message} - ${err.stack}`);
      return undefined;
    }
  };

  copyToDestination = (destination: string): void => {
    try {
      const destDir = path.resolve(destination);
      if (!fs.existsSync(destDir)) {
        mkdir(destDir);
      }

      const outputPath = this.createOutputPath(destDir);
      console.info(`Copying ${this.path} to ${outputPath}`);
      cp(this.path, outputPath);
    } catch (err) {
      console.error(`Unable to copy music file: ${err.message} - ${err.stack}`);
    }
  };

  private createOutputPath = (destination: string): string => {
    const outputPath = path.join(
      destination,
      replaceForbiddenChar(this.albumArtist) ?? replaceForbiddenChar(this.artist) ?? 'Unknown',
      replaceForbiddenChar(this.album) ?? 'Unknown',
      '/',
    );

    if (!fs.existsSync(outputPath)) {
      mkdir(outputPath);
    }
    return outputPath;
  };

  isMissingMetadata = (): boolean => {
    return [this.album, this.albumArtist, this.artist, this.coverArt, this.title, this.year].some(v => !v);
  };

  truncateData = (): MusicFile => {
    this.artist = truncateString(this.artist, 40);
    this.path = truncateString(this.path, 25) ?? '';

    return this;
  };
}
