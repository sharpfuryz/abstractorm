export default function(ipcMain, knex, log) {
  ipcMain.on('sql', (event, code, uuid) => {
    knex.raw(code).then((result) => {
      event.sender.send(`sql${uuid}`, result);
      return result;
    }).catch((error) => {
      log.error(error);
      log.error(code);
      event.sender.send(`sql${uuid}`, []);
    });
  });

  ipcMain.on('insert_sql', (event, table, attrs, uuid) => {
    knex(table).insert(attrs).then((result) => {
      event.sender.send(`insert_sql${uuid}`, result);
      return result;
    }).catch((error) => {
      log.error(error);
      event.sender.send(`insert_sql${uuid}`, []);
    });
  });

  ipcMain.on('update_sql', (event, table, id, attrs, uuid) => {
    knex(table).where({ id }).update(attrs)
      .then((result) => {
        event.sender.send(`update_sql${uuid}`, result);
        return result;
      })
      .catch((error) => {
        log.error(error);
        event.sender.send(`update_sql${uuid}`, []);
      });
  });

  ipcMain.on('delete_sql', (event, table, id, uuid) => {
    knex(table).where({ id }).del()
      .then((result) => {
        event.sender.send(`delete_sql${uuid}`, result);
        return result;
      })
      .catch((error) => {
        log.error(error);
        event.sender.send(`delete_sql${uuid}`, []);
      });
  });
}