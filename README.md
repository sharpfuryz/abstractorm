## Why?
I've developed bunch of projects on ActiveRecord and few apps on ElectronJS/NodeJS, so I decided to implement something like ActiveRecord to avoid writing a lot of spaghetti-code and sql things but for Electron. Core concept is that ORM consists of two parts:
* Client/Render-process, which sends signals via IPC to Main process. At this point we should have comfortable promise-bases syntax. You can implement your own adapter and make calls via websocket.
* Main-process which handles SQL-calls to knexjs layer, or you can implement your own adapter if you have super rare sql database.
All thats code was partially implemented in my apps and I decided to exclude it into the small suitable library, which is fully abstract. Basically 'abstract' means that library has nothing to do with all that JS<->SQL stuff.

## Usage
```
import AORM from 'abstractorm';

// Initialize backend in the main thread
AORM.electronMainIPC(mainIPC, knexjs)

// Client-side code
AORM().loadTables(['notes','comments']).inject(window)
const notes = await Notes.find_all();
```
## Models?
Model - is class with custom methods.
Will be implemented in next release.