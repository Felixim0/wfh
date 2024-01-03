import { getLostTime } from '../../js/timeCalculations.js';

// EXPECTED NUMBER OF WORKING DAYS
const totalWorkingDaysMinusHoliday = 226;
const workingDays = totalWorkingDaysMinusHoliday;

// Check getCommuteTime
describe('Test the Lost Time Maths', () => {

  test('Time Difference of 0H 0M', () => {
    const workedTimeIncludingCommute = {
      hours: 0,
      minutes: 0,
      totalMinutesPerDay: 0,
      totalHoursPerDay: 0,
    };

    const workedTime = {
      hours: 0,
      minutes: 0,
      totalMinutesPerDay: 0,
      totalHoursPerDay: 0,
    };

    const r = getLostTime(workedTimeIncludingCommute, workedTime, 0);
    const expected = {
          hours: 0, 
          minutes: 0, 
          totalHoursPerDay: 0,
          totalMinutesPerDay: 0,
          totalHoursPerYear: 0,
          totalMinutesPerYear: 0,
    }
    expect(r).toStrictEqual(expected);
  });

  test('Time Difference of 1H 30M commutePositive', () => {
    const workedTimeIncludingCommute = {
      hours: 1,
      minutes: 30,
      totalHoursPerDay: 1,
      totalMinutesPerDay: 30,
    };

    const workedTime = {
      hours: 0,
      minutes: 0,
      totalHoursPerDay: 0,
      totalMinutesPerDay: 0,
    };

    const r = getLostTime(workedTimeIncludingCommute, workedTime, 10);
    const expected = {
          hours: 1, 
          minutes: 30, 
          totalHoursPerDay: 1,
          totalMinutesPerDay: 30,
          totalHoursPerYear: 15,
          totalMinutesPerYear: 0,
    }
    expect(r).toStrictEqual(expected);
  });

  test('Time Difference of 8H 31M commutePositive', () => {
    const workedTimeIncludingCommute = {
      hours: 9,
      minutes: 21,
      totalHoursPerDay: 9,
      totalMinutesPerDay: 21,
    };

    const workedTime = {
      hours: 1,
      minutes: 10,
      totalHoursPerDay: 1,
      totalMinutesPerDay: 10,
    };

    const r = getLostTime(workedTimeIncludingCommute, workedTime, 226);
    const expected = {
          hours: 8, 
          minutes: 11, 
          totalHoursPerDay: 8,
          totalMinutesPerDay: 11,
          totalHoursPerYear: 1849,
          totalMinutesPerYear: 26,
    }
    expect(r).toStrictEqual(expected);
  });

  test('Time Difference of 1H 30M commuteNegative', () => {
    const workedTimeIncludingCommute = {
      hours: 0,
      minutes: 0,
      totalHoursPerDay: 0,
      totalMinutesPerDay: 0,
    };

    const workedTime = {
      hours: 1,
      minutes: 30,
      totalHoursPerDay: 1,
      totalMinutesPerDay: 30,
    };

    const r = getLostTime(workedTimeIncludingCommute, workedTime, 10);
    const expected = {
          hours: 1, 
          minutes: 30, 
          totalHoursPerDay: 1,
          totalMinutesPerDay: 30,
          totalHoursPerYear: 15,
          totalMinutesPerYear: 0,
    }
    expect(r).toStrictEqual(expected);
  });

  test('Time Difference of 8H 31M commuteNegative', () => {
    const workedTimeIncludingCommute = {
      hours: 1,
      minutes: 10,
      totalHoursPerDay: 1,
      totalMinutesPerDay: 10,
    };

    const workedTime = {
      hours: 9,
      minutes: 21,
      totalHoursPerDay: 9,
      totalMinutesPerDay: 21,
    };

    const r = getLostTime(workedTimeIncludingCommute, workedTime, 226);
    const expected = {
          hours: 8, 
          minutes: 11, 
          totalHoursPerDay: 8,
          totalMinutesPerDay: 11,
          totalHoursPerYear: 1849,
          totalMinutesPerYear: 26,
    }
    expect(r).toStrictEqual(expected);
  });


});

