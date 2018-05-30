export const convertNumber = str => parseInt(str, 0);
export const calculateTerm = numContributors => numContributors - 1;
export const rateAsDecimal = num => num / 100;
export const calculateCashInterval = (amount, rate, term) => amount * rate / term;
export const calculatePaymentInterval = (cashInterval, term) => cashInterval / term;
export const calculateBasePayment = (amount, term) => amount / term;

export const chartCalc = ({ amount, people, cashInterval, basePayment, paymentInterval, term, startDate }, result = []) => {
	for (let i = term; i >= 0; i--) {
		const cashReceived = amount + cashInterval * (term - i);
		const cashPaid = amount + cashInterval * i;
		const monthly = basePayment + paymentInterval * i;
		result.push({
			cashReceived,
			cashPaid,
			monthly,
			amount,
			interestRate: parseFloat(
				(cashPaid - cashReceived) / cashPaid * 100
			).toFixed(2),
			interestAmount: cashPaid - cashReceived,
			fee: parseFloat(amount * 0.01),
			tcr: cashReceived - amount * 0.01,
			startDate,
			people
		});
	}
	return result
} 