import {
  convertNumber,
  calculateTerm,
  rateAsDecimal,
  chartCalc
} from './calculationHelpers';

test('converts string to a number', () => {
	const actual = convertNumber("1");
	const expected = 1
	expect(actual).toBe(expected);
})

test('returns term length', () => {
	const actual = calculateTerm(5);
	const expected = 4;
  expect(actual).toBe(expected);
});

test('converts rate to decimal', () => {
	const actual = rateAsDecimal(5);
	const expected = .05;
	expect(actual).toBe(expected);
})

describe("chartCalc", () => {
	test("5 contributors, $1000, 5%", () => {
		const data = { amount: 1000, basePayment: 250, cashInterval: 12.5, paymentInterval: 3.125, people: 5, term: 4, startDate : "2016-05-01"};
		const actual = chartCalc(data)
		const expected = [
			{amount: 1000, cashPaid: 1050, monthly: 262.5},
			{amount: 1000, cashPaid: 1050, monthly: 262.5},
			{amount: 1000, cashPaid: 1050, monthly: 262.5},
			{amount: 1000, cashPaid: 1050, monthly: 262.5},
			{amount: 1000, cashPaid: 1050, monthly: 262.5},
			{amount: 1000, cashPaid: 1050, monthly: 262.5},
		]

		expect(actual).toBe(expected)
	})
})