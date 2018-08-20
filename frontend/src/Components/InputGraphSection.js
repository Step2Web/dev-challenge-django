import React, { Component } from "react"
import CurrencyInput from "./CurrencyInput"
import SliderInput from "./SliderInput"
import DisplayGraph from "./DisplayGraph"
import "./InputGraphSection.css"
import { connect } from 'react-redux'
import { ActionTypes } from "./../redux/actions"

const mapStateToProps = state => {
    return {
        initialSavingsAmount: state.initialSavingsAmount,
        monthlySavingsAmount: state.monthlySavingsAmount,
        interestRate: state.interestRate,
        forecastLengthInMonths: state.forecastLengthInMonths
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
        })
    }
}

const MIN_INTEREST_RATE = 0
const MAX_INTEREST_RATE = 10
const INTEREST_RATE_STEPS = 0.25
const INTEREST_UNITS = '%'

const MIN_MONTHS = 3
const MAX_MONTHS = 50
const MONTHS_STEPS = 1
const MONTHS_UNITS = ' Months'

class InputGraphSection extends Component {
  render() {
    const { initialSavingsAmount, monthlySavingsAmount, interestRate } = this.props

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
          <SliderInput defaultValue={interestRate} min={MIN_INTEREST_RATE} max={MAX_INTEREST_RATE} steps={INTEREST_RATE_STEPS} units={INTEREST_UNITS} dispatch={this.props.interestRateChanged} />
          <p className="input-label">
            How long are you willing to invest?
          </p>
          <SliderInput defaultValue={this.props.forecastLengthInMonths} min={MIN_MONTHS} max={MAX_MONTHS} steps={MONTHS_STEPS} units={MONTHS_UNITS} dispatch={this.props.forecastLengthInMonthsChanged} />
        </div>
        <div className="financial-display">
          {/*We have included some sample data here, you will need to replace this
            with your own. Feel free to change the data structure if you wish.*/}
          <DisplayGraph
            data={[
              {
                month: 1,
                amount: 500
              },
              {
                month: 2,
                amount: 700
              },
              {
                month: 3,
                amount: 1000
              },
              {
                month: 4,
                amount: 1500
              },
              {
                month: 5,
                amount: 2000
              },
              {
                month: 6,
                amount: 3000
              },
              {
                month: 7,
                amount: 3100
              }
            ]}
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
