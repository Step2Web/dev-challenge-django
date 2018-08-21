import rootReducer from './index'
import assert from 'assert'

describe('testing reducers', function() {

    const initialState = {
        initialSavingsAmount: 1000,
        monthlySavingsAmount: 10,
        interestRate: 3.5,
        forecastLengthInMonths: 5,
        interestDepositFrequency: 'Monthly'
    }

    it('initializes the state is correct', function() {
        const actualInitialState = rootReducer(undefined, {type: 'INIT'})
        assert.deepEqual(initialState, actualInitialState)
    })

    it('changes the initialSavingsAmount correctly', function() {
        const newAmount = 150;
        const newState = rootReducer(initialState, {type: 'INITIAL_SAVINGS_AMOUNT_CHANGED', newAmount})
        let expectedNewState = {...initialState}
        expectedNewState.initialSavingsAmount = 150
        assert.deepEqual(expectedNewState, newState)
    })
})

//TODO: Test other reducers in a similar way