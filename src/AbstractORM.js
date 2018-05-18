import validateOptions from './utils/validateOptions';
import TableBuilder from './TableBuilder';
import electronIPCAdapter from './adapters/electronIPCAdapter';
import webSQLAdapter from './adapters/webSQLAdapter';
import dummyAdapter from './adapters/dummyAdapter';

const errorAdapterNotDefined = 'Adapter is not defined';

class AbstractORM {
  constructor(options) {
    validateOptions(options, this);
    this.models = [];
  }
  // Pass models as import combined object
  loadModels(models) {
    this.models = models;
    return this;
  }
  // Pass tables as array
  loadTables(tables) {
    const models = this.models; // link
    const signal = this.adapter;
    if (Array.isArray(tables)){
      tables.map((table) => {
        let instance = new TableBuilder(table, signal);
        models[table] = instance;
        return instance;
      });
    } else {
      throw(new Error(`Tables argument should be array, example: [\'notes\',\'comments\']. Given: ${tables}`));
    }
    return this;
  }
  // Pass JSON-schema 
  loadSchema(schema) {

  }
  // Inject into target
  inject(target) {
    Object.assign(target, this.models);
    return this;
  }
  // Set adapter as model's call site
  setAdapter(adapter) {
    switch (adapter) {
      case "electronIPC":
        electronIPCAdapter(this);
        break;
      case "websql":
        webSQLAdapter(this);
        break;
      case "dummy":
        dummyAdapter(this);
        break;
      default:
        throw(new Error(errorAdapterNotDefined));
        break;
    }
    return this;
  }
}

export default AbstractORM;