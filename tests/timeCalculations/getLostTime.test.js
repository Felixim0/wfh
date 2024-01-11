import { getLostTime } from '../../js/timeCalculations.js';
import { defaultTimeObj, newTimeObj } from './timeHelpers.js';

// EXPECTED NUMBER OF WORKING DAYS
const totalWorkingDaysMinusHoliday = 226;
const workingDays = totalWorkingDaysMinusHoliday;

// Check getCommuteTime
describe('Test the Lost Time Maths', () => {

  test('Time Difference of 0H 0M', () => {
    const workedTime = newTimeObj();
    const workedTimeIncludingCommute = newTimeObj();

    const r = getLostTime(workedTimeIncludingCommute, workedTime, 0);
    const expected = newTimeObj();
    expect(r).toStrictEqual(expected);
  });

  test('Time Difference of 1H 30M commutePositive', () => {
    const workedTimeIncludingCommute = newTimeObj();
    workedTimeIncludingCommute.input.hours = 1;
    workedTimeIncludingCommute.input.minutes = 30;

    workedTimeIncludingCommute.day.totalMinutes = 90;
    workedTimeIncludingCommute.day.hours = 1;
    workedTimeIncludingCommute.day.minutes = 30;

    workedTimeIncludingCommute.year.totalMinutes = 20340;
    workedTimeIncludingCommute.year.hours = 339;
    workedTimeIncludingCommute.year.minutes = 0;

    const workedTime = newTimeObj();

    const r = getLostTime(workedTimeIncludingCommute, workedTime, 226);
    const expectedTime = newTimeObj();
    expectedTime.input.hours = 1;
    expectedTime.input.minutes = 30;

    expectedTime.day.totalMinutes = 90;
    expectedTime.day.hours = 1;
    expectedTime.day.minutes = 30;

    expectedTime.year.totalMinutes = 20340;
    expectedTime.year.hours = 339;
    expectedTime.year.minutes = 0;

    expect(r).toStrictEqual(expectedTime);
  });

  test('Time Difference of 1H 30M commuteNegative', () => {
    const workedTimeIncludingCommute = newTimeObj();

    const workedTime = newTimeObj();
    workedTime.input.hours = 1;
    workedTime.input.minutes = 30;

    workedTime.day.totalMinutes = 90;
    workedTime.day.hours = 1;
    workedTime.day.minutes = 30;

    workedTime.year.totalMinutes = 20340;
    workedTime.year.hours = 339;
    workedTime.year.minutes = 0;

    const r = getLostTime(workedTimeIncludingCommute, workedTime, 226);
    const expectedTime = newTimeObj();
    expectedTime.input.hours = 1;
    expectedTime.input.minutes = 30;

    expectedTime.day.totalMinutes = 90;
    expectedTime.day.hours = 1;
    expectedTime.day.minutes = 30;

    expectedTime.year.totalMinutes = 20340;
    expectedTime.year.hours = 339;
    expectedTime.year.minutes = 0;

    expect(r).toStrictEqual(expectedTime);
  });

  test('Time Difference of 8H 31M commutePositive', () => {
    const workedTimeIncludingCommute = newTimeObj();
    workedTimeIncludingCommute.input.hours = 9;
    workedTimeIncludingCommute.input.minutes = 21;

    workedTimeIncludingCommute.day.totalMinutes = 561;
    workedTimeIncludingCommute.day.hours = 9;
    workedTimeIncludingCommute.day.minutes = 21;

    workedTimeIncludingCommute.year.totalMinutes = 126786;
    workedTimeIncludingCommute.year.hours = 2113;
    workedTimeIncludingCommute.year.minutes = 6;

    const workedTime = newTimeObj();
    workedTime.input.hours = 1;
    workedTime.input.minutes = 10;

    workedTime.day.totalMinutes = 70;
    workedTime.day.hours = 1;
    workedTime.day.minutes = 10;

    workedTime.year.totalMinutes = 15820;
    workedTime.year.hours = 263;
    workedTime.year.minutes = 40;

    const r = getLostTime(workedTimeIncludingCommute, workedTime, 226);
    const expected = newTimeObj();
    expected.input.hours = 8;
    expected.input.minutes = 11;

    expected.day.totalMinutes = 491;
    expected.day.hours = 8;
    expected.day.minutes = 11;

    expected.year.totalMinutes = 110966;
    expected.year.hours = 1849;
    expected.year.minutes = 26;
    
    expect(r).toStrictEqual(expected);
  });

  test('Time Difference of 8H 31M commuteNegative', () => {
    const workedTime = newTimeObj();
    workedTime.input.hours = 9;
    workedTime.input.minutes = 21;

    workedTime.day.totalMinutes = 561;
    workedTime.day.hours = 9;
    workedTime.day.minutes = 21;

    workedTime.year.totalMinutes = 126786;
    workedTime.year.hours = 2113;
    workedTime.year.minutes = 6;

    const workedTimeIncludingCommute = newTimeObj();
    workedTimeIncludingCommute.input.hours = 1;
    workedTimeIncludingCommute.input.minutes = 10;

    workedTimeIncludingCommute.day.totalMinutes = 70;
    workedTimeIncludingCommute.day.hours = 1;
    workedTimeIncludingCommute.day.minutes = 10;

    workedTimeIncludingCommute.year.totalMinutes = 15820;
    workedTimeIncludingCommute.year.hours = 263;
    workedTimeIncludingCommute.year.minutes = 40;

    const r = getLostTime(workedTimeIncludingCommute, workedTime, 226);
    const expected = newTimeObj();
    expected.input.hours = 8;
    expected.input.minutes = 11;

    expected.day.totalMinutes = 491;
    expected.day.hours = 8;
    expected.day.minutes = 11;

    expected.year.totalMinutes = 110966;
    expected.year.hours = 1849;
    expected.year.minutes = 26;
    
    expect(r).toStrictEqual(expected);
  });

});

