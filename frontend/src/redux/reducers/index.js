const initialState = {
    initialSavingsAmount: 1000,
    monthlySavingsAmount: 10,
    interestRate: 3.5,
    forecastLengthInMonths: 5
}

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
    default:
      return state
  }
}