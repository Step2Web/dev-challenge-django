import axios from 'axios'
import moxios from 'moxios'
import sinon from 'sinon'
import { calculate } from './API'
import assert from 'assert'

describe('API calls to', function() {

    beforeEach(function () {
      // import and pass your custom axios instance to this method
      moxios.install()
    })

    afterEach(function () {
      // import and pass your custom axios instance to this method
      moxios.uninstall()
    })

    it('calculate succeeds', function(done) {
      const expectedResponse = {
        result: {
            savedAmount: 100
        }
      };

      moxios.stubRequest('/calculate/',
        {
            code: 200,
            responseText: expectedResponse
        })

      let onFulfilled = sinon.spy()
      calculate(1, 1.5, 2).then(onFulfilled);

      moxios.wait(function() {
        assert.equal('post', onFulfilled.lastCall.args[0].config.method)
        assert.deepEqual(expectedResponse, onFulfilled.lastCall.args[0].data);
        assert.equal(1, onFulfilled.callCount)
        done()
      })
    })
});
