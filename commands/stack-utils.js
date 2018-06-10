const getTag = (stack, key) => {
  return stack.Tags.find(tag => tag.Key == key);
};

const getSeeblogTags = (stack) => {
  const seeblogTag = getTag(stack, 'seeblog');
  if(!seeblogTag) {
    return null;
  }

  const titleTag = getTag(stack, 'seeblog-title');

  return {
    seeblog: seeblogTag.Value,
    seeblogTitle: titleTag.Value
  }
};

const getOutputs = (stack) => {
  const outputs = {};
  stack.Outputs.forEach((o) => {
    outputs[o.OutputKey] = o.OutputValue;
  });
  return outputs;
}

module.exports = {
  getTag,
  getSeeblogTags,
  getOutputs
};
