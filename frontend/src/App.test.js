import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import moxios from 'moxios'

describe('App renders', function() {

    beforeEach(function () {
      // import and pass your custom axios instance to this method
      moxios.install()
    })

    afterEach(function () {
      // import and pass your custom axios instance to this method
      moxios.uninstall()
    })

    it('without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    })
});
