from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

MONTHS_BETWEEN_INTEREST_DEPOSIT_KEY = 'monthsBetweenInterestDeposit'
MONTHS_IN_YEAR = 12


@require_POST
@csrf_exempt
def calculate(request):
    interest_calculation_frequencies = {
        'monthly': {
            MONTHS_BETWEEN_INTEREST_DEPOSIT_KEY: 1},
        'quarterly': {
            MONTHS_BETWEEN_INTEREST_DEPOSIT_KEY: 3},
        'annually': {
            MONTHS_BETWEEN_INTEREST_DEPOSIT_KEY: 12}
    }

    params = json.loads(request.body.decode("utf-8"))
    initial_savings_amount = params.get('initialSavingsAmount', None)
    interest_rate = params.get('interestRate', None)
    monthly_savings_amount = params.get('monthlySavingsAmount', 0)
    forecast_length_in_months = params.get('forecastLengthInMonths', None)
    interest_deposit_frequency = params.get('interestDepositFrequency', None)

    if initial_savings_amount is None \
            or interest_rate is None \
            or forecast_length_in_months is None \
            or interest_deposit_frequency is None:
        return HttpResponseBadRequest('Required parameters are not provided')

    if monthly_savings_amount < 0 \
            or initial_savings_amount < 0 \
            or forecast_length_in_months < 0 \
            or interest_rate < 0:
        return HttpResponseBadRequest('Invalid request parameters')

    if interest_deposit_frequency not in interest_calculation_frequencies:
        return HttpResponseBadRequest('Allowed values for interestDepositFrequency: ' +
                                      ', '.join(list(interest_calculation_frequencies.keys())))

    if forecast_length_in_months > 600:
        return HttpResponseBadRequest('Forecasting is only support for up to 50 years or 600 months')

    if type(forecast_length_in_months) is not int:
        return HttpResponseBadRequest('Only integer numbers are allowed for forecastLengthInMonths.')

    interest_rate_coefficient = interest_rate / 100
    current_savings = initial_savings_amount
    savings_per_month = [{'month': 0, 'amount': current_savings}]
    months_between_interest_deposit = \
        interest_calculation_frequencies[interest_deposit_frequency][MONTHS_BETWEEN_INTEREST_DEPOSIT_KEY];

    # We need to calculate the interest rate based on how often it is paid out
    # For example:
    # Annually: It is paid out once. E.g. 0.015 / (12 / 12) = 0.015
    # Quarterly: Paid out 4 times, every time a fourth of the amount: 0.015 / (12 / 4) = 0.015 / 3 = 0,00375
    # Monthly: Paid out every month, 12 times a year: 0.015 / (12 / 1) = 0.015 / 12 = 0,00125
    actual_interest_rate = interest_rate_coefficient / (MONTHS_IN_YEAR / months_between_interest_deposit)

    # The algorithm always works on the first of every month.
    # First, if applicable, the interest is calculated for the previous month
    # Second, the monthly contributions are added
    for month in range(1, forecast_length_in_months + 1):
        if month % months_between_interest_deposit == 0:
            current_savings *= (1 + actual_interest_rate)
        # First we deposit the monthly contribution
        current_savings += monthly_savings_amount
        # Last we add the value to the result list
        savings_per_month.append(monthly_datapoint(month, current_savings))

    return JsonResponse({'forecastResult': savings_per_month})


def monthly_datapoint(month, amount):
    return {
        'month': month,
        'amount': amount
    }
