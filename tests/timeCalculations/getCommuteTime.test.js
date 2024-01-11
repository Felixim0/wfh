import { getCommuteTime } from '../../js/timeCalculations.js';

// EXPECTED NUMBER OF WORKING DAYS
const totalWorkingDaysMinusHoliday = 226;
const workingDays = totalWorkingDaysMinusHoliday;

// Check getCommuteTime
describe('Test the Commute Time Maths', () => {

  test('Check For 0 commute time given no commute', () => {
    const expectedTime = {
      input: {
        hours: 0, 
        minutes: 0, 
      },
      day: {
        totalMinutes: 0,
        hours: 0,
        minutes: 0, 
      },
      year: {
        totalMinutes: 0,
        hours: 0,
        minutes: 0,
      },
    };
    expect(getCommuteTime(0, 0, workingDays)).toStrictEqual(expectedTime);
  });

  test('Given 1H commute check working days 220', () => {
    const expectedTime = {
      input: {
        hours: 1, 
        minutes: 0, 
      },
      day: {
        totalMinutes: 60,
        hours: 1,
        minutes: 0,
      },
      year: {
        totalMinutes: 13200,
        hours: 220,
        minutes: 0,
      },
    };
    const r = getCommuteTime(1, 0, 220);
    expect(r).toStrictEqual(expectedTime);
  });

 test('Given 35 Minutes commute check working days 226', () => {
    const expectedTime = {
      input: {
        hours: 0, 
        minutes: 35, 
      },
      day: {
        totalMinutes: 35,
        hours: 0,
        minutes: 35,
      },
      year: {
        totalMinutes: 7910,
        hours: 131,
        minutes: 50,
      },
    };
    const r = getCommuteTime(0, 35, workingDays);
    expect(r).toStrictEqual(expectedTime);
  });

});

