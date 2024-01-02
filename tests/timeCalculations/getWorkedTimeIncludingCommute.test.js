import { getWorkedTimeIncludingCommute } from '../../js/timeCalculations.js';

// EXPECTED NUMBER OF WORKING DAYS
const totalWorkingDaysMinusHoliday = 226;
const workingDays = totalWorkingDaysMinusHoliday;

// Check getWorkedTime
describe('Test the Worked Time Including Commute Maths', () => {

 test('Given 0 working days check epected "0" hours outcome', () => {
    // getworkedtimeincludingcommute(
    //       hoursminutescommute, 
    //       totalworkingdaysminusholiday, 
    //       workedtime)
    
    const workedTime = {
      hours: 0,
      minutes: 0,
    };

    const hoursMinutesCommute = {
      hours: 0,
      minutes: 0,
    };

    const r = getWorkedTimeIncludingCommute(hoursMinutesCommute, 0, workedTime);
    
    const expectedTime = {
          hours: 0, 
          minutes: 0, 
          totalHoursPerDay: 0,
          totalMinutesPerDay: 0,
          totalHoursPerYear: 0,
          totalMinutesPerYear: 0,
    }
    expect(r).toStrictEqual(expectedTime);
  });

  test('Check 1 hour working, no commute, with 226 working days', () => {
    const workedTime = {
      hours: 1,
      minutes: 0,
    };

    const hoursMinutesCommute = {
      hours: 0,
      minutes: 0,
    };

    const r = getWorkedTimeIncludingCommute(hoursMinutesCommute, 226, workedTime);
    const expectedTime = {
          hours: 1, 
          minutes: 0, 
          totalHoursPerDay: 1,
          totalMinutesPerDay: 0,
          totalHoursPerYear: 226,
          totalMinutesPerYear: 0,
    }
    expect(r).toStrictEqual(expectedTime);
  });

  test('Check 1 hour working, 30 Min commute, with 226 working days', () => {
    const workedTime = {
      hours: 1,
      minutes: 0,
    };

    const hoursMinutesCommute = {
      hours: 0,
      minutes: 30,
    };

    const r = getWorkedTimeIncludingCommute(hoursMinutesCommute, 226, workedTime);
    const expectedTime = {
          hours: 1, 
          minutes: 30, 
          totalHoursPerDay: 1,
          totalMinutesPerDay: 30,
          totalHoursPerYear: 339,
          totalMinutesPerYear: 0,
    }
    expect(r).toStrictEqual(expectedTime);
  });

  test('Check 7 hour 26 working, 2 hour 33 Min commute, with 226 working days', () => {
    const workedTime = {
      hours: 7,
      minutes: 26,
    };

    const hoursMinutesCommute = {
      hours: 2,
      minutes: 33,
    };

    const r = getWorkedTimeIncludingCommute(hoursMinutesCommute, 226, workedTime);
    const expectedTime = {
          hours: 9, 
          minutes: 59, 
          totalHoursPerDay: 9,
          totalMinutesPerDay: 59,
          totalHoursPerYear: 2256,
          totalMinutesPerYear: 14,
    }
    expect(r).toStrictEqual(expectedTime);
  });

  test('Check 7 hour 26 working, 2 hour 33 Min commute, with 113 working days', () => {
    const workedTime = {
      hours: 7,
      minutes: 26,
    };

    const hoursMinutesCommute = {
      hours: 2,
      minutes: 33,
    };

    const r = getWorkedTimeIncludingCommute(hoursMinutesCommute, 113, workedTime);
    const expectedTime = {
          hours: 9, 
          minutes: 59, 
          totalHoursPerDay: 9,
          totalMinutesPerDay: 59,
          totalHoursPerYear: 1128,
          totalMinutesPerYear: 7,
    }
    expect(r).toStrictEqual(expectedTime);
  });

});
