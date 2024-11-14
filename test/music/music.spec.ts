import { beforeAll, describe, expect, it, spyOn } from 'bun:test';
import * as mm from 'music-metadata';

import { MusicFile } from '@/src/music/music';

describe('MusicFile class tests', () => {
  const mockPath = 'foo';
  const mockFileMetadata = {
    common: {
      album: 'Album 1',
      albumartist: 'Album Artist 1',
      artist: 'Artist 1',
      picture: [{ data: 'image data' }],
      title: 'Title 1',
      year: 2020,
    },
    format: {
      lossless: false,
    },
  };

  let parseFileSpy;
  beforeAll(() => {
    parseFileSpy = spyOn(mm, 'parseFile');
    parseFileSpy.mockResolvedValue(mockFileMetadata as any);
  });

  describe('create method tests', () => {
    it('Should create a new MusicFile instance, with the provided path as the path var', () => {
      const result = MusicFile.create(mockPath);

      expect(result).toBeInstanceOf(MusicFile);
      expect(result.path).toBe(mockPath);
    });
  });

  describe('init method tests', () => {
    it('Should parse the data from the file', async () => {
      const musicFile = MusicFile.create(mockPath);

      const result = await musicFile.init();

      expect(result).toBeInstanceOf(MusicFile);
    });

    it('Should set the album, albumArtist, artist, coverArt, lossless, title & year after initialization', async () => {
      const musicFile = MusicFile.create(mockPath);

      const result = (await musicFile.init()) as MusicFile;

      expect(result.album).toBe(mockFileMetadata.common.album);
      expect(result.albumArtist).toBe(mockFileMetadata.common.albumartist);
      expect(result.artist).toBe(mockFileMetadata.common.artist);
      expect(result.coverArt).toBe(true);
      expect(result.lossless).toBe(mockFileMetadata.format.lossless);
      expect(result.title).toBe(mockFileMetadata.common.title);
      expect(result.year).toBe(mockFileMetadata.common.year);
    });
  });

  describe('isMissingMetadata method tests', () => {
    it('Should return true if the music file has not been initialized', async () => {
      const musicFile = MusicFile.create(mockPath);

      const result = musicFile.isMissingMetadata();

      expect(result).toBe(true);
    });

    it('Should return true if any of the metadata fields are missing', async () => {
      parseFileSpy.mockResolvedValueOnce({
        ...mockFileMetadata,
        common: {
          ...mockFileMetadata.common,
          year: undefined,
        },
      } as any);
      const musicFile = MusicFile.create(mockPath);

      (await musicFile.init()) as MusicFile;
      const result = musicFile.isMissingMetadata();

      expect(result).toBe(true);
    });

    it('Should return false if all of the metadata fields are present', async () => {
      const musicFile = MusicFile.create(mockPath);

      (await musicFile.init()) as MusicFile;
      const result = musicFile.isMissingMetadata();

      expect(result).toBe(false);
    });
  });
});
