const TableBuilder = (function () {
  function TableBuilder(table, signal) {
    this.table = table;
    this.signal = signal;
    this.pre_query = '';
    this.query = '';
    this.post_query = '';
    return this;
  }

  TableBuilder.prototype.count = function (column) {
    if (column == null) {
      column = 'id';
    }
    this.pre_query = `select count(${column}) from ${this.table} `;
    return this;
  };

  TableBuilder.prototype.select = function (columns) {
    if (columns == null) {
      columns = '*';
    }
    this.pre_query = `select ${columns} from ${this.table} `;
    return this;
  };

  TableBuilder.prototype.increment = function (id, column, value) {
    if (value == null) {
      value = 1;
    }
    this.pre_query = `update ${this.table} set ${column} = ${column} + ${value} where id = ${id}`;
    return this.exec();
  };

  TableBuilder.prototype.decrement = function (id, column, value) {
    if (value == null) {
      value = 1;
    }
    this.pre_query = `update ${this.table} set ${column} = ${column} - ${value} where id = ${id}`;
    return this.exec();
  };

  TableBuilder.prototype.where = function (attrs) {
    if (this.pre_query === '') {
      this.select();
    }
    this.query = `where ${this.processAttrs(attrs)}`;
    return this;
  };

  TableBuilder.prototype.whereIn = function (column, value) {
    if (this.pre_query === '') {
      this.select();
    }
    this.query = `where ${column} IN (${value.join(',')})`;
    return this;
  };

  TableBuilder.prototype.processAttrs = function (attrs) {
    let result;
    result = [];
    Object.keys(attrs).forEach((key) => {
      let bool,
        string,
        value;
      value = attrs[key];
      if (typeof value === 'function') {
        string = value();
        result.push(` ${key} ${value} `);
      }
      if (typeof value === 'string') {
        result.push(` ${key} = '${value}' `);
      }
      if (typeof value === 'boolean') {
        if (value === true) {
          bool = 1;
        } else {
          bool = 0;
        }
        result.push(` ${key} = ${bool} `);
      }
      if (typeof value === 'number') {
        return result.push(` ${key} = ${value} `);
      }
    });
    return result.join(' and ');
  };

  TableBuilder.prototype.get = function (id) {
    this.where({
      id
    });
    return this.exec();
  };

  TableBuilder.prototype.create = function (attrs) {
    return this.signal.createSQL(this.table, attrs);
  };

  TableBuilder.prototype.update = function (id, attrs) {
    return this.signal.updateSQL(this.table, id, attrs);
  };

  TableBuilder.prototype.delete = function (id) {
    return this.signal.deleteSQL(this.table, id);
  };

  TableBuilder.prototype.delete_query = function () {
    this.pre_query = `delete from ${this.table} `;
    return this;
  };

  TableBuilder.prototype.findAll = function () {
    this.pre_query = `select * from ${this.table} `;
    return this.exec();
  };

  TableBuilder.prototype.exec = function () {
    this.sql = this.pre_query + this.query + this.post_query;
    return this.signal.sql(this.sql);
  };

  TableBuilder.prototype.toSQL = function () {
    return `${this.pre_query}${this.query}${this.post_query}`;
  };

  return TableBuilder;
}());

export default TableBuilder;
