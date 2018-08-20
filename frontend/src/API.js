import request from "axios"

export const calculate = (initialSavingsAmount, interestRate, monthlySavingsAmount) => {
	return request
		.post("/calculate/", {
			initialSavingsAmount,
			interestRate,
			monthlySavingsAmount
		})
}
