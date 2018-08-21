import request from "axios"

export const calculate = (initialSavingsAmount, interestRate, monthlySavingsAmount, forecastLengthInMonths, interestDepositFrequency) => {
	return request
		.post("/calculate/", {
			initialSavingsAmount,
			interestRate,
			monthlySavingsAmount,
			forecastLengthInMonths,
			interestDepositFrequency
		})
}
