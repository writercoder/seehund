import React from 'react';
import { shallow, mount } from 'enzyme';

import App from './App';

test("We can shallow render the app", () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.exists('AppWrapper'));
});
