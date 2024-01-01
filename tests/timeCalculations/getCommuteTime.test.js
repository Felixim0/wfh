import { getWorkedTime, getCommuteTime } from '../../js/timeCalculations.js';

// EXPECTED NUMBER OF WORKING DAYS
const totalWorkingDaysMinusHoliday = 226;
const workingDays = totalWorkingDaysMinusHoliday;

// Check getCommuteTime
describe('Test the Commute Time Maths', () => {

  test('Check For 0 commute time given no commute', () => {
    const expectedTime = {
          hours: 0, 
          minutes: 0, 
          totalMinutesPerDay: 0, 
          totalMinutesPerYear: 0,
          totalHoursPerYear: 0,
    };
    expect(getCommuteTime(0, 0, workingDays)).toStrictEqual(expectedTime);
  });

  test('Check For 226 Hours commute time given commute of 1 Hour', () => {
    const expectedTime = {
          hours: 1, 
          minutes: 0, 
          totalMinutesPerDay: 60,
          totalMinutesPerYear: 60 * 226,
          totalHoursPerYear: (60 * 226) / 60,
    };
    const r = getCommuteTime(1, 0, workingDays);
    expect(r).toStrictEqual(expectedTime);
  });

 test('Check For 113 Hours commute time given commute of 35 Minutes', () => {
    const expectedTime = {
          hours: 0, 
          minutes: 35, 
          totalMinutesPerDay: 35,
          totalMinutesPerYear: 35 * 226,
          totalHoursPerYear: (35 * 226) / 60,
    };
    const r = getCommuteTime(0, 35, workingDays);
    expect(r).toStrictEqual(expectedTime);
  });

});

