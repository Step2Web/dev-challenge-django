import { changeInitialAmount } from './index'
import assert from 'assert'

describe('testing action', function() {

    it('changeInitialAmount to have the correct format', function() {
        const amount = 100;
        assert.deepEqual({
                type: 'INITIAL_SAVINGS_AMOUNT_CHANGED',
                newAmount: amount
            },
            changeInitialAmount(100)
        );
    })
})

//TODO: Test other actions in a similar way