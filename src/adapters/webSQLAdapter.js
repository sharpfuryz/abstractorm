// experimental adapter for testing purposes

const errorNotDefined = 'WebSQL is not present';

const castAttributes = (attrs) => {
  const result = [];
  Object.keys(attrs).map((key) => {
    result.push(`${key} = ${attrs[key]}`);
  });
  return result.join(',');
};

const createSQL = (table, attrs) => runSQL(`INSERT INTO ${table} VALUES (${attrs.join(',')});`);
const updateSQL = (table, id, attrs) => runSQL(`UPDATE ${table} SET ${castAttributes(attrs)} WHERE id = ${id};`);
const deleteSQL = (table, id) => runSQL(`DELETE FROM ${table} WHERE id = ${id};`);
const runSQL = (code) => new Promise((resolve, reject) => {
  if (window.openDatabase) {
    window.openDatabase("test_db", "", "Web SQL Database", 200000);
    const result = db.transaction((tx) => {
      tx.executeSql(code);
    });
    resolve(result);
  } else {
    reject(new Error(errorNotDefined));
  }
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