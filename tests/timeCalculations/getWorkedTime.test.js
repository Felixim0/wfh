import { getWorkedTime } from '../../js/timeCalculations.js';

// EXPECTED NUMBER OF WORKING DAYS
const totalWorkingDaysMinusHoliday = 226;
const workingDays = totalWorkingDaysMinusHoliday;

// Check getWorkedTime
describe('Test the Worked Time Maths', () => {

 test('Check worked time minutes for 0 days', () => {
    const expectedTime = {
      input: {
        hours: 7, 
        minutes: 24, 
      },
      day: {
        totalMinutes: 444,
        hours: 7,
        minutes: 24, 
      },
      year: {
        totalMinutes: 0,
        hours: 0,
        minutes: 0,
      },
    };
    const r = getWorkedTime(0);
    expect(r).toStrictEqual(expectedTime);
  });

 test('Check worked time for 100 days', () => {
    const expectedTime = {
      input: {
        hours: 7, 
        minutes: 24, 
      },
      day: {
        totalMinutes: 444,
        hours: 7,
        minutes: 24,
      },
      year: {
        totalMinutes: 444 * 100,
        hours: 740,
        minutes: 0,
      },
    };
    const r = getWorkedTime(100);
    expect(r).toStrictEqual(expectedTime);
  });

 test('Check worked time for 226 days', () => {
    const expectedTime = {
      input: {
        hours: 7, 
        minutes: 24, 
      }, 
      day: {
        totalMinutes: 444,
        hours: 7, 
        minutes: 24, 
      },
      year: {
        totalMinutes: 100344,
        hours: 1672, 
        minutes: 24, 
      },
    };
    const r = getWorkedTime(226);
    expect(r).toStrictEqual(expectedTime);
  });

});
