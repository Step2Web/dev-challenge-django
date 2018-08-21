export const changeInitialAmount = newAmount => ({
  type: 'INITIAL_SAVINGS_AMOUNT_CHANGED',
  newAmount
})

export const changeMonthlyAmount = newAmount => ({
  type: 'MONTHLY_SAVINGS_AMOUNT_CHANGED',
  newAmount
})

export const changeInterestRate = newInterestRate => ({
  type: 'INTEREST_RATE_CHANGED',
  newInterestRate
})

export const changeForecastLengthInMonths = newForecastLengthInMonths => ({
  type: 'FORECAST_LENGTH_IN_MONTHS_CHANGED',
  newForecastLengthInMonths
})

export const interestDepositFrequencyChanged = newFrequency => ({
  type: 'FORECAST_LENGTH_IN_MONTHS_CHANGED',
  newFrequency
})

export const forecastResultChanged = newForecastResult => ({
  type: 'FORECAST_RESULT_CHANGED',
  newForecastResult
})

export const ActionTypes = {
  INITIAL_SAVINGS_AMOUNT_CHANGED: 'INITIAL_SAVINGS_AMOUNT_CHANGED',
  MONTHLY_SAVINGS_AMOUNT_CHANGED: 'MONTHLY_SAVINGS_AMOUNT_CHANGED',
  INTEREST_RATE_CHANGED: 'INTEREST_RATE_CHANGED',
  FORECAST_LENGTH_IN_MONTHS_CHANGED: 'FORECAST_LENGTH_IN_MONTHS_CHANGED',
  INTEREST_DEPOSIT_FREQUENCY_CHANGED: 'INTEREST_DEPOSIT_FREQUENCY_CHANGED',
  FORECAST_RESULT_CHANGED: 'FORECAST_RESULT_CHANGED'
}