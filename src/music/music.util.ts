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

export async function getMusicFilesFromPlaylist(playlistPath: string): Promise<MusicFile[]> {
  const rawData = await Bun.file(playlistPath).text();
  const data = rawData.split('\r\n').filter(Boolean);

  const musicFiles: MusicFile[] = [];

  for (const dataset of data) {
    const musicFile = await MusicFile.create(dataset).init();

    if (musicFile) {
      musicFiles.push(musicFile);
    }
  }

  return musicFiles;
}

export function copyMusic(musicFiles: MusicFile[], copy: string): void {
  if (!musicFiles.length) {
    console.info(`No music files found to copy to ${copy}`);
    return;
  }

  console.info(`Copying over music files to ${copy}`);
  musicFiles.forEach(file => file.copyToDestination(copy));
}

export function logMusic(musicFiles: MusicFile[]): void {
  if (musicFiles.length) {
    console.info('Logging information');
    console.table(musicFiles.map(file => file.truncateData()));
  } else console.info('No music files found to log');
}
