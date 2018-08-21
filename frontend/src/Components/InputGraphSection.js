import React, { Component } from "react"
import CurrencyInput from "./CurrencyInput"
import SliderInput from "./SliderInput"
import InterestFrequencyRadioButtonInput from "./InterestFrequencyRadioButtonInput"
import DisplayGraph from "./DisplayGraph"
import "./InputGraphSection.css"
import { connect } from 'react-redux'
import { ActionTypes } from "./../redux/actions"

const mapStateToProps = state => {
    return {
        initialSavingsAmount: state.initialSavingsAmount,
        monthlySavingsAmount: state.monthlySavingsAmount,
        interestRate: state.interestRate,
        forecastLengthInMonths: state.forecastLengthInMonths,
        interestDepositFrequency: state.interestDepositFrequency,
        forecastResult: state.forecastResult
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initialSavingsAmountChanged: (newAmount) => dispatch({
            type: ActionTypes.INITIAL_SAVINGS_AMOUNT_CHANGED,
            newAmount
        }),
        monthlySavingsAmountChanged: (newAmount) => dispatch({
            type: ActionTypes.MONTHLY_SAVINGS_AMOUNT_CHANGED,
            newAmount
        }),
        interestRateChanged: (newInterestRate) => dispatch({
            type: ActionTypes.INTEREST_RATE_CHANGED,
            newInterestRate
        }),
        forecastLengthInMonthsChanged: (newForecastLengthInMonths) => dispatch({
            type: ActionTypes.FORECAST_LENGTH_IN_MONTHS_CHANGED,
            newForecastLengthInMonths
        }),
        interestDepositFrequencyChanged: (newFrequency) => dispatch({
            type: ActionTypes.INTEREST_DEPOSIT_FREQUENCY_CHANGED,
            newFrequency
        })
    }
}

const MIN_INTEREST_RATE = 0
const MAX_INTEREST_RATE = 10
const INTEREST_RATE_STEPS = 0.25
const INTEREST_UNITS = '%'

const MIN_MONTHS = 3
const MAX_MONTHS = 600
const MONTHS_STEPS = 1
const MONTHS_UNITS = ' Months'

class InputGraphSection extends Component {
  render() {
    const { initialSavingsAmount, monthlySavingsAmount, interestRate, interestDepositFrequency } = this.props

    return (
      <div>
        <div className="financial-inputs">
          <p className="input-label">How much have you saved?</p>
          <CurrencyInput defaultValue={initialSavingsAmount} dispatch={this.props.initialSavingsAmountChanged} />

          <p className="input-label">How much will you save each month?</p>
          <CurrencyInput defaultValue={monthlySavingsAmount} dispatch={this.props.monthlySavingsAmountChanged} />

          <p className="input-label">
            How much interest will you earn per year?
          </p>
          <SliderInput defaultValue={interestRate} min={MIN_INTEREST_RATE} max={MAX_INTEREST_RATE} step={INTEREST_RATE_STEPS} units={INTEREST_UNITS} dispatch={this.props.interestRateChanged} />
          <p className="input-label">
            How long are you willing to invest?
          </p>
          <SliderInput defaultValue={this.props.forecastLengthInMonths} min={MIN_MONTHS} max={MAX_MONTHS} step={MONTHS_STEPS} units={MONTHS_UNITS} dispatch={this.props.forecastLengthInMonthsChanged} />
          <p className="input-label">
            How should your interest be deposited?
          </p>
          <InterestFrequencyRadioButtonInput selectedValue={this.props.interestDepositFrequency} dispatch={this.props.interestDepositFrequencyChanged} />
        </div>
        <div className="financial-display">
          {/*We have included some sample data here, you will need to replace this
            with your own. Feel free to change the data structure if you wish.*/}
          <DisplayGraph
            data={this.props.forecastResult}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGraphSection)
