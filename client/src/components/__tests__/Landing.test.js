import React from 'react';
import { mount, shallow } from 'enzyme';
import Landing from '../Landing';
import Root from '../../Root';

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root>
      <Landing />
    </Root>
  );
});
afterEach(() => {
  wrapped.unmount();
});

it('has three buttons', () => {
  expect(wrapped.find('button').length).toEqual(3);
});
