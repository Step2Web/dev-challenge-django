import React, { Component } from "react"
import { calculate } from "./API"
import InputGraphSection from './Components/InputGraphSection'
import "./App.css"
import { connect } from 'react-redux'
import { ActionTypes } from "./redux/actions"
import debounce from 'lodash.debounce'

const mapStateToProps = state => {
    return {
        initialSavingsAmount: state.initialSavingsAmount,
        monthlySavingsAmount: state.monthlySavingsAmount,
        interestRate: state.interestRate,
        forecastLengthInMonths: state.forecastLengthInMonths,
        interestDepositFrequency: state.interestDepositFrequency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        forecastResultChanged: (newForecastResult) => dispatch({
            type: ActionTypes.FORECAST_RESULT_CHANGED,
            newForecastResult
        })
    }
}

class App extends Component {

	state = {
		loading: true
	}

    debouncedUpdateForecastResult = debounce(this.updateForecastResults, 250)

	componentDidMount() {
	    this.updateForecastResults()
	}

	componentDidUpdate() {
		this.debouncedUpdateForecastResult()
	}

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.initialSavingsAmount !== nextProps.initialSavingsAmount ||
                this.props.monthlySavingsAmount !== nextProps.monthlySavingsAmount ||
                this.props.interestRate !== nextProps.interestRate ||
                this.props.forecastLengthInMonths !== nextProps.forecastLengthInMonths ||
                this.props.interestDepositFrequency !== nextProps.interestDepositFrequency ||
                this.state.loading !== nextState.loading)
    }

	render() {
	    const {loading} = this.state

		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Finimize dev challenge</h1>
				</header>
                    {loading ?
                        'Loading...'
                    :
					 	<InputGraphSection />
                    }
			</div>
		)
	}

    updateForecastResults() {
        calculate(this.props.initialSavingsAmount, this.props.interestRate, this.props.monthlySavingsAmount,
		        this.props.forecastLengthInMonths, this.props.interestDepositFrequency)
			.then(r => {
            	this.props.forecastResultChanged(r.data.forecastResult);
			    this.setState({ loading: false });
            })
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
