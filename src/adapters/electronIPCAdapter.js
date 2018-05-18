const ipcRenderer = require('electron').ipcRenderer;

const errorNotDefined = 'Electron ipcRenderer is not defined.';

const UUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const createSQL = (table, attrs) => new Promise((resolve) => {
  const uuid = UUID();
  ipcRenderer.send('insert_sql', table, attrs, uuid);
  ipcRenderer.once(`insert_sql${uuid}`, (event, result) => resolve(result));
});

const updateSQL = (table, id, attrs) => new Promise((resolve) => {
  const uuid = UUID();
  ipcRenderer.send('update_sql', table, id, attrs, uuid);
  ipcRenderer.once(`update_sql${uuid}`, (event, result) => resolve(result));
});

const deleteSQL = (table, id) => new Promise((resolve) => {
  const uuid = UUID();
  ipcRenderer.send('delete_sql', table, id, uuid);
  ipcRenderer.once(`delete_sql${uuid}`, (event, result) => resolve(result));
});

const runSQL = (code) => new Promise((resolve) => {
  const uuid = UUID();
  ipcRenderer.send('sql', code, uuid);
  ipcRenderer.once(`sql${uuid}`, (event, result) => resolve(result));
});

const adapter = (context) => {
  if (ipcRenderer) {
    context.createSQL = createSQL;
    context.updateSQL = updateSQL;
    context.deleteSQL = deleteSQL;
    context.sql = runSQL;
  } else {
    throw(new Error(errorNotDefined));
  }
  return context;
};

export default adapter;