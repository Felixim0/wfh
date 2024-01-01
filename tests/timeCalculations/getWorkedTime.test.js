import { getWorkedTime, getCommuteTime } from '../../js/timeCalculations.js';

// EXPECTED NUMBER OF WORKING DAYS
const totalWorkingDaysMinusHoliday = 226;
const workingDays = totalWorkingDaysMinusHoliday;

// Check getWorkedTime
describe('Test the Worked Time Maths', () => {

 test('Check worked time minutes for 0 days', () => {
    const expectedTime = {
          hours: 7, 
          minutes: 24, 
          totalMinutesPerDay: 444,
          totalMinutesPerYear: 0,
    };
    const r = getWorkedTime(0);
    expect(r).toStrictEqual(expectedTime);
  });

 test('Check worked time for 100 days', () => {
    const expectedTime = {
          hours: 7, 
          minutes: 24, 
          totalMinutesPerDay: 444,
          totalMinutesPerYear: 444 * 100,
    };
    const r = getWorkedTime(100);
    expect(r).toStrictEqual(expectedTime);
  });

 test('Check worked time for 226 days', () => {
    const expectedTime = {
          hours: 7, 
          minutes: 24, 
          totalMinutesPerDay: 444,
          totalMinutesPerYear: 444 * 226,
    };
    const r = getWorkedTime(226);
    expect(r).toStrictEqual(expectedTime);
  });

});
