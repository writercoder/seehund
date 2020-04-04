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
    seeblogTitle: titleTag && titleTag.Value
  }
};

const getOutput = (stack, key) => {
  return stack.Outputs.find(output => output.OutputKey == key)
}

const getOutputValue = (stack, key) => {
  const output = getOutput(stack, key);

  if(output) {
    return output.OutputValue;
  }
}

const getOutputs = (stack) => {
  const outputs = {};
  stack.Outputs.forEach((o) => {
    outputs[o.OutputKey] = o.OutputValue;
  });
  return outputs;
}

const getSeeblogInfo = (stack) => {
  return {
    stackId: stack.StackId,
    ...getOutputs(stack),
    ...getSeeblogTags(stack)
  }
}

module.exports = {
  getTag,
  getSeeblogTags,
  getOutput,
  getOutputValue,
  getOutputs,
  getSeeblogInfo
};
