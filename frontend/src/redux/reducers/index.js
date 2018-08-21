const initialState = {
    initialSavingsAmount: 1000,
    monthlySavingsAmount: 10,
    interestRate: 3.5,
    forecastLengthInMonths: 5,
    interestDepositFrequency: 'monthly',
    forecastResult: null
}

// Normally we should use Immutable.js here to avoid unnecessary re-renderings caused by changed object references.
// Omitted for the sake of reducing scope.
export default (state = initialState , action) => {
  let newState = {...state};
  switch (action.type) {
    case 'INITIAL_SAVINGS_AMOUNT_CHANGED':
      newState.initialSavingsAmount = action.newAmount;
      return newState;
    case 'MONTHLY_SAVINGS_AMOUNT_CHANGED':
      newState.monthlySavingsAmount = action.newAmount;
      return newState;
    case 'INTEREST_RATE_CHANGED':
      newState.interestRate = action.newInterestRate;
      return newState;
    case 'FORECAST_LENGTH_IN_MONTHS_CHANGED':
      newState.forecastLengthInMonths = action.newForecastLengthInMonths;
      return newState;
    case 'INTEREST_DEPOSIT_FREQUENCY_CHANGED':
      newState.interestDepositFrequency = action.newFrequency;
      return newState;
    case 'FORECAST_RESULT_CHANGED':
      newState.forecastResult = action.newForecastResult;
      return newState;
    default:
      return state
  }
}