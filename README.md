# CLI Utils

- This project is designed for easier control of backups, directories and music playlists.

## Usage

- Once you have installed the dependencies via `yarn` with `yarn install`, you can run `yarn start` and then the command and it's accompyaning arguments.

For example, to copy all the music files from a m3u playlist file to the `Music` folder:

```bash
$ yarn start music -p ~/Path/to/playlist/Playlist.m3u -c ~/Music
```

## Commands

### **Backup**

- Backup files & folders.

| option      | argument    | description                                   |
|-------------|-------------|-----------------------------------------------|
| destination | directory   | the backup destination                        |
| paths       | directory[] | comma seperated list of directories to backup |

### **Directory**

- Inspect and interact with the files in a directory

| option    | argument  | description                               |
|-----------|-----------|-------------------------------------------|
| directory | directory | the directory to use                      |
| extension | extension | use only files with the given extension   |
| info      | n/a       | table of all files in the given directory |
| remove    | n/a       | removes all files in the directory        |

### **Music**

- Inspect or copy music files from a m3u playlist.

| option           | argument  | description                                                 |
|------------------|-----------|-------------------------------------------------------------|
| copy             | directory | copy the files in the playlist into the specified directory |
| info             | n/a       | table of all music files in the playlist tableinformation   |
| missing-metadata | n/a       | use onl files that are missing essential metadata           |
| playlist         | directory | the path of the playlist                                    |


TODOS:
- recreate fully w/ new knowledge (should be quick!)