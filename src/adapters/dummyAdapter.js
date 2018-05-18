const voidFn = () => console.log(args);

const adapter = (given) => {
  context.createSQL = voidFn;
  context.updateSQL = voidFn;
  context.deleteSQL = voidFn;
  context.sql = voidFn;
};

export default adapter;