import { getWorkedTimeIncludingCommute } from '../../js/timeCalculations.js';
import { defaultTimeObj, newTimeObj } from './timeHelpers.js';

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
    
    const workedTime = newTimeObj();
    const hoursMinutesCommute = newTimeObj()

    const r = getWorkedTimeIncludingCommute(hoursMinutesCommute, 0, workedTime);
    
    const expectedTime = newTimeObj();
    expect(r).toStrictEqual(expectedTime);
  });

  test('Check 1 hour working, no commute, with 226 working days', () => {
    const workedTime = newTimeObj();
    workedTime.input.hours = 1;

    workedTime.day.totalMinutes = 60;
    workedTime.day.hours = 1;

    workedTime.year.totalMinutes = 15960;
    workedTime.year.hours = 266;

    const hoursMinutesCommute = newTimeObj();

    const r = getWorkedTimeIncludingCommute(hoursMinutesCommute, 226, workedTime);
    const expectedTime = newTimeObj();
    expectedTime.input.hours = 1;

    expectedTime.day.totalMinutes = 60;
    expectedTime.day.hours = 1;

    expectedTime.year.totalMinutes = 13560;
    expectedTime.year.hours = 226;

    expect(r).toStrictEqual(expectedTime);
  });

  test('Check 1 hour working, 30 Min commute, with 226 working days', () => {
    const workedTime = newTimeObj();
    workedTime.input.hours = 1;

    workedTime.day.totalMinutes = 60;
    workedTime.day.hours = 1;

    const hoursMinutesCommute = newTimeObj();
    hoursMinutesCommute.input.minutes = 30;

    hoursMinutesCommute.day.totalMinutes = 30;
    hoursMinutesCommute.day.minutes = 30;

    hoursMinutesCommute.year.totalMinutes = workedTime.day.totalMinutes * 226;
    hoursMinutesCommute.year.hours = 113;

    const r = getWorkedTimeIncludingCommute(hoursMinutesCommute, 226, workedTime);
    const expectedTime = newTimeObj();
    expectedTime.input.hours = 1;
    expectedTime.input.minutes = 30;

    expectedTime.day.totalMinutes = 90;
    expectedTime.day.hours = 1;
    expectedTime.day.minutes= 30;

    expectedTime.year.totalMinutes = 20340;
    expectedTime.year.hours = 339;
    expectedTime.year.minutes = 0;
    expect(r).toStrictEqual(expectedTime);
  });

  test('Check 7 hour 26 working, 2 hour 33 Min commute, with 226 working days', () => {
    const workedTime = newTimeObj();
    workedTime.input.hours = 7;
    workedTime.input.minutes = 26;

    workedTime.day.totalMinutes = 446;
    workedTime.day.hours = 7;
    workedTime.day.minutes = 26;

    workedTime.year.totalMinutes = 100796;
    workedTime.year.hours = 1679;
    workedTime.year.minutes = 56;

    const hoursMinutesCommute = newTimeObj();
    hoursMinutesCommute.input.hours = 2;
    hoursMinutesCommute.input.minutes = 33;

    hoursMinutesCommute.day.totalMinutes = 153;
    hoursMinutesCommute.day.hours = 2;
    hoursMinutesCommute.day.minutes= 33;

    hoursMinutesCommute.year.totalMinutes = 34578;
    hoursMinutesCommute.year.hours = 576;
    hoursMinutesCommute.year.minutes = 18;

    const r = getWorkedTimeIncludingCommute(hoursMinutesCommute, 226, workedTime);
    const expectedTime = newTimeObj();
    expectedTime.input.hours = 9;
    expectedTime.input.minutes = 59;

    expectedTime.day.totalMinutes = 599;
    expectedTime.day.hours = 9;
    expectedTime.day.minutes = 59;

    expectedTime.year.totalMinutes = 135374;
    expectedTime.year.hours = 2256;
    expectedTime.year.minutes = 14;
 
    expect(r).toStrictEqual(expectedTime);
  });

  test('Check 7 hour 26 working, 2 hour 33 Min commute, with 113 working days', () => {
    const workedTime = newTimeObj();
    workedTime.input.hours = 7;
    workedTime.input.minutes = 26;

    workedTime.day.totalMinutes = 446;
    workedTime.day.hours = 7;
    workedTime.day.minutes = 26;

    workedTime.year.totalMinutes = 100796;
    workedTime.year.hours = 1679;
    workedTime.year.minutes = 56;

    const hoursMinutesCommute = newTimeObj();
    hoursMinutesCommute.input.hours = 2;
    hoursMinutesCommute.input.minutes = 33;

    hoursMinutesCommute.day.totalMinutes = 153;
    hoursMinutesCommute.day.hours = 2;
    hoursMinutesCommute.day.minutes= 33;

    hoursMinutesCommute.year.totalMinutes = 34578;
    hoursMinutesCommute.year.hours = 576;
    hoursMinutesCommute.year.minutes = 18;

    const r = getWorkedTimeIncludingCommute(hoursMinutesCommute, 113, workedTime);
    const expectedTime = newTimeObj();
    expectedTime.input.hours = 9;
    expectedTime.input.minutes = 59;

    expectedTime.day.totalMinutes = 599;
    expectedTime.day.hours = 9;
    expectedTime.day.minutes = 59;

    expectedTime.year.totalMinutes = 67687;
    expectedTime.year.hours = 1128;
    expectedTime.year.minutes = 7;
 
    expect(r).toStrictEqual(expectedTime);
  });

});
