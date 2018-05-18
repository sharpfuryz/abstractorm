const default_options = {
  adapter: 'electronIPC'
};

const validateOptions = (input_options = default_options, context) => {
  if (input_options.adapter) {
    context.setAdapter(input_options.adapter);
  }
};

export default validateOptions;