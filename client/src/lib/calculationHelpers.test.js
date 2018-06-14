import {
  convertNumber,
  calculateTerm,
  rateAsDecimal,
  chartCalc
} from './calculationHelpers';
import { mockChartData, mockChartCalc } from '../testing/utils';

test('converts string to a number', () => {
  const actual = convertNumber('1');
  const expected = 1;
  expect(actual).toBe(expected);
});

test('returns term length', () => {
  const actual = calculateTerm(5);
  const expected = 4;
  expect(actual).toBe(expected);
});

test('converts rate to decimal', () => {
  const actual = rateAsDecimal(5);
  const expected = 0.05;
  expect(actual).toBe(expected);
});

describe('chartCalc', () => {
  test('5 contributors, $1000, 5%', () => {
    const data = mockChartCalc;
    const actual = chartCalc(data);
    const expected = mockChartData;

    expect(actual).toEqual(expected);
  });
});
