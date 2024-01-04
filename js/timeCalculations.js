// Given 65 mins return "1" hour (ignore minutes)
function getHoursFromMinutes(mins) {
  return Math.floor(mins/60);
}

// Given 65 mins return "5" mins (ignore hours)
function getLeftOverMinutes(mins) {
  return mins % 60;
}

function getTotalMinutesFromHourMinuteObj(hourMinuteObj) {
  return hourMinuteObj.minutes + (hourMinuteObj.hours * 60);
}

// Given an object with attribute "totalMinutesPerDay" add "hoursPerDay" and "minutesPerDay"
function addHoursMinsPerDay(timeObj) {
  if (!timeObj.day) { timeObj.day = {}; };
  timeObj.day.totalMinutes = getTotalMinutesFromHourMinuteObj(timeObj.input);
  timeObj.day.hours = getHoursFromMinutes(timeObj.day.totalMinutes);
  timeObj.day.minutes = getLeftOverMinutes(timeObj.day.totalMinutes);
}

// Given an object with totalMinutesPerDay and WorkedDays add hours/mins a year
function addHoursMinsPerYear(timeObj, totalWorkingDaysMinusHoliday) {
  if (!timeObj.year) { timeObj.year = {}; };
  timeObj.year.totalMinutes = timeObj.day.totalMinutes * totalWorkingDaysMinusHoliday;
  timeObj.year.hours = getHoursFromMinutes(timeObj.year.totalMinutes);
  timeObj.year.minutes = getLeftOverMinutes(timeObj.year.totalMinutes);
}

// Given Hours and Mins a commute takes, calculate daily, yearly minutes and hours
export function getCommuteTime(commuteTimeHours, commuteTimeMinutes, totalWorkingDaysMinusHoliday) {
  const hoursMinutesCommute = {
    input: {
      hours: parseInt(commuteTimeHours, 10), 
      minutes: parseInt(commuteTimeMinutes, 10)
    },
  };

  addHoursMinsPerDay(hoursMinutesCommute);
  addHoursMinsPerYear(hoursMinutesCommute, totalWorkingDaysMinusHoliday);

  return hoursMinutesCommute;
}

// Given number of days and Hours and Minutes worked calculate daily, yearly minutes and hours
export function getWorkedTime(totalWorkingDaysMinusHoliday) {
  const workedTime = {
    input: {
      'hours': 7,
      'minutes': 24,
    },
  };

  addHoursMinsPerDay(workedTime);
  addHoursMinsPerYear(workedTime, totalWorkingDaysMinusHoliday);

  return workedTime;
}

export function getWorkedTimeIncludingCommute(commuteTime, totalWorkingDaysMinusHoliday, workedTime) {
  // Work out daily commute minutes, daily worked hours
  const totalDayCommuteAndWorkMins = commuteTime.day.totalMinutes + workedTime.day.totalMinutes;

  // Create new time object with all of getWorkedTime attributes
  const workedTimeIncludingCommute = {
    input: {
      hours: getHoursFromMinutes(totalDayCommuteAndWorkMins),
      minutes: getLeftOverMinutes(totalDayCommuteAndWorkMins),
    }
  };

  addHoursMinsPerDay(workedTimeIncludingCommute);
  addHoursMinsPerYear(workedTimeIncludingCommute, totalWorkingDaysMinusHoliday);

  return workedTimeIncludingCommute;
}

export function getLostTime(workedTimeIncludingCommute, workedTime, totalWorkingDaysMinusHoliday) {
  const dayMinDiff = Math.abs(workedTimeIncludingCommute.day.totalMinutes - workedTime.day.totalMinutes);
  const lostTime = {
    input: {
      hours: getHoursFromMinutes(dayMinDiff),
      minutes: getLeftOverMinutes(dayMinDiff),
    },
  };

  addHoursMinsPerDay(lostTime);
  addHoursMinsPerYear(lostTime, totalWorkingDaysMinusHoliday);

  return lostTime;
}

