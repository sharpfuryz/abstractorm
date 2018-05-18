// NOTICE: It should be implemented on adapter level
// Adapter -> Process JS to SQL Where valid condition
const errorCast = (given) => `Don\'t know how to process ${given}, please cast ${given} to string or function. Key: `;
const errorCastObject = errorCast('object');
const errorCastUndefined = errorCast('undefined');
const errorCatched = 'Passed function throwed an error. Key: ';

const processAttrs = (attrs) => {
  const result = [];
  Object.keys(attrs).forEach((key) => {
    const value = attrs[key];
    const valueType = (typeof value);
    switch (valueType) {
      case 'function':
        try {
          const string = value();
          result.push(` ${key} ${value} `);
        } catch (e) {
          throws(new Error(`${errorCatched} \'${key}\' ${e}`));
        }
        break;
      case 'string':
        result.push(` ${key} = '${value}' `);
        break;
      case 'boolean':
        let bool = null;
        if (value) {
          bool = 1;
        } else {
          bool = 0;
        }
        result.push(` ${key} = ${bool} `);
        break;
      case 'number':
        result.push(` ${key} = ${value} `);
        break;
      case 'object':
        throw(new Error(`${errorCastObject} \'${key}\'`));
        break;
      case 'undefined':
        throw(new Error(`${errorCastUndefined} \'${key}\'`));
        break;
      default:
        break;
    }
  });

  return result.join(' and ');
};

export default processAttrs;