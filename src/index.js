import AbstractORM from './AbstractORM';
import electronMainIPC from './utils/electronMainIPC';
// import connectModel from './connectModel';

export default function(opts) {
  return new AbstractORM(opts);
};
export { electronMainIPC };