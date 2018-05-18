import AbstractORM from './../dist/abstractorm';
const assert = require('chai').assert;

const testTableName = 'test';

describe('AbstractORM', () => {
  describe('.loadTables', () => {
    it('should define tables', (done) => {
      const context = {};
      const testSet = [testTableName, 'test2'];
      const aorm = AbstractORM({ adapter: 'dummy' });
      aorm.loadTables(testSet);
      assert.typeOf(aorm.models.test, 'object');
      done();
    });
  });
  describe('.inject', () => {
    it('should inject into object', (done) => {
      const context = {};
      const testSet = [testTableName, 'test2'];
      let aorm = AbstractORM({ adapter: 'dummy' });
      aorm = aorm.loadTables(testSet);
      aorm = aorm.inject(context);
      assert.typeOf(context.test, 'object');
      done();
    });
  });
  describe('.setAdapter', () => {
    it('test dummy adapter', (done) => {
      const context = {};
      const testSet = [testTableName, 'test2'];
      const aorm = AbstractORM({ adapter: 'dummy' });
      aorm.setAdapter('dummy');
      done();
    });
  });
});