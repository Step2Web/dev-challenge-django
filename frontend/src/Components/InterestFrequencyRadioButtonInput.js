import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class InterestFrequencyRadioButtonInput extends Component {

	constructor(props) {
		super(props)

		this.state = {
			value: props.selectedValue
		}
	}

	handleChange(e) {
		const value = e.target.value
		this.setState({value})
		this.props.dispatch(value)
	}

	render() {
		return (
			<div className="fmz-radiobuttoninput">
				<input type="radio"
					value="monthly"
					id="monthly"
					checked={this.state.value === "monthly"}
					onChange={this.handleChange.bind(this)} />
				<label>Monthly</label>
				<input type="radio"
					value="quarterly"
					id="quarterly"
					checked={this.state.value === "quarterly"}
					onChange={this.handleChange.bind(this)}/>
				<label>Quarterly</label>
				<input type="radio"
					value="annually"
					id="annually"
					checked={this.state.value === "annually"}
					onChange={this.handleChange.bind(this)}/>
				<label>Annually</label>
			</div>
		)
	}
}

InterestFrequencyRadioButtonInput.propTypes = {
	selectedValue: PropTypes.string,
}