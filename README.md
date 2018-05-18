import AbstractORM from 'abstractorm';

```
// Initialize backend in the main thread
AbstractORM.electronMainIPC(mainIPC, knexjs)
// Client-side application
AbstractORM({ adapter: 'electronIPC' }).loadTables(['notes','comments']).inject(window)

const notes = await Notes.find_all();
```