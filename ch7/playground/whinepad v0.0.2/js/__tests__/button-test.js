jest
    .dontMock('../source/components/Button')
    .dontMock('classnames')
;

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Button = require('../source/components/Button');


describe('Render Button components', () => {
    it('renders <a> vs <button>', () => {
        /* ... rendering and expect()ing ... */
        const button = TestUtils.renderIntoDocument(
          <div>
            <Button>
              Hello
            </Button>
          </div>
        );
const a = TestUtils.renderIntoDocument(
  <div>
    <Button href="#">
      Hello
    </Button>
  </div>
);
        expect(ReactDOM.findDOMNode(button).children[0].nodeName).toEqual('BUTTON');
expect(ReactDOM.findDOMNode(a).children[0].nodeName).toEqual('A');
    });

});









