# CLI Tools

# Background

While setting up file backups & trying to copy over my favorite music to my phone, I designed this application that provides functionality in the following 3 categories:

- Directory: log files in a directory, delete files in a directory & filter both by a specific file extension
- Backup: copy a list of files/folders to a given destination (local or remote)
- Music: log information about music files from a given playlist, copy the files to a given directory & filter by ones that are missing metadata (year, title, artist, cover art etc.)

## Usage

_This project uses bun, to make use of high performance and intuitive APIs. To learn more about how to install bun, see https://bun.sh/docs/installation._

To run the project, simply run the `start` script:

```bash
$ bun run start
```

Like all commander projects, you can supply the help flag to see possible commands & options to run. Running the help flag with a specific command, e.g. backup:

```bash
$ bun run start backup --help
```

Gives you specifically the options for that given command.

I have setup files to play with in the `example` folder, which contains a test playlist file, as well as corresponding copyright-free music files, taken from pixabay.com

The table below shows a list of example commands setup and what they represent:

| Script                                   | Command                                           | Explanation                                                                        |
| ---------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------- |
| start:example:backup                     | backup -p ./example/music -d ./example            | Backup the example/music folder to a folder alongside it, with a timestamp         |
| start:example:directory:info             | directory -d ./example -i                         | Log a table of all the files in example folder (nested)                            |
| start:example:directory:info:extension   | directory -d ./example -i -e mp3                  | Log a table of all the files in example folder (nested - mp3 extension files only) |
| start:example:directory:remove           | directory -d ./example -x                         | Remove all files in the example folder (nested)                                    |
| start:example:directory:remove:extension | directory -d ./example -x -e mp3                  | Remove all files in the example folder (nested - mp3 extension files only)         |
| start:example:music:copy                 | music -p ./example/playlist.m3u -c ./example/test | Copy all files specified in the playlist into the example/test folder              |
| start:example:music:info                 | music -p ./example/playlist.m3u -i                | Log information for all music files specified in the playlist                      |
