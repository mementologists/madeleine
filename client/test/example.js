import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { describe, it } from 'mocha';

const Foo = () => (
  <div className="foo" />
);

describe('A suite', () => {
  it('contains spec with an expectation', () => {
    expect(shallow(<Foo />).contains(<div className="foo" />)).to.equal(true);
  });

  it('contains spec with an expectation', () => {
    expect(shallow(<Foo />).is('.foo')).to.equal(true);
  });

  it('contains spec with an expectation', () => {
    expect(mount(<Foo />).find('.foo').length).to.equal(1);
  });
});
