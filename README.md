# CLI Utils

- This project is designed for easier control of backups, directories and music playlists.

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
| extension | extension | show only files with the given extension  |
| info      | n/a       | table of all files in the given directory |
| remove    | n/a       | removes all files in the directory        |