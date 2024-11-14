import path from 'path';

import { MusicFile } from './music';
import { MusicModuleOptions } from './music.type';

export const handleMusicAction = async (options: MusicModuleOptions): Promise<void> => {
  const { copy, info, missingMetadata, playlist } = options;

  if (!playlist) {
    throw new Error('You must define the playlist');
  }

  if (!copy && !info) {
    throw new Error('No options were selected for this module!');
  }

  const musicFiles = (await getMusicFilesFromPlaylist(playlist)).filter(file =>
    missingMetadata ? file?.isMissingMetadata() : true,
  );

  if (info) {
    logMusic(musicFiles);
  }

  if (copy) {
    copyMusic(musicFiles, copy);
  }
};

export const getMusicFilesFromPlaylist = async (playlistPath: string): Promise<MusicFile[]> => {
  const rawData = await Bun.file(playlistPath).text();
  const data = rawData.split('\n').filter(Boolean);

  const musicFiles: MusicFile[] = [];

  for (const dataset of data) {
    const playlistDir = path.dirname(path.resolve(playlistPath));
    const resultingPath = path.join(playlistDir, dataset);

    const musicFile = await MusicFile.create(resultingPath).init();

    if (musicFile) {
      musicFiles.push(musicFile);
    }
  }

  return musicFiles;
};

export const copyMusic = (musicFiles: MusicFile[], copy: string): void => {
  if (!musicFiles.length) {
    console.info(`No music files found to copy to ${copy}`);
    return;
  }

  console.info(`Copying over music files to ${copy}`);
  musicFiles.forEach(file => file.copyToDestination(copy));
};

export const logMusic = (musicFiles: MusicFile[]): void => {
  if (musicFiles.length) {
    console.info('Logging information');
    console.table(musicFiles.map(file => file.value));
  } else console.info('No music files found to log');
};
