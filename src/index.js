import AbstractORM from './AbstractORM';
// import connectModel from './connectModel';

export default function(opts) {
  return new AbstractORM(opts);
};
// export { connectModel };