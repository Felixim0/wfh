export function getCommuteTime(commuteTimeHours, commuteTimeMinutes, totalWorkingDaysMinusHoliday) {
  const hoursMinutesCommute = {
      'hours': parseInt(commuteTimeHours, 10), 
      'minutes': parseInt(commuteTimeMinutes, 10)
  };
  hoursMinutesCommute.totalMinutesPerDay = (hoursMinutesCommute.hours * 60) + hoursMinutesCommute.minutes;
  hoursMinutesCommute.totalMinutesPerYear = hoursMinutesCommute.totalMinutesPerDay * totalWorkingDaysMinusHoliday;
  hoursMinutesCommute.totalHoursPerYear = hoursMinutesCommute.totalMinutesPerYear / 60;

  return hoursMinutesCommute;
}

export function getWorkedTime(totalWorkingDaysMinusHoliday) {
  const workedTime = {'hours': 7, 'minutes': 24};
  workedTime.totalMinutesPerDay = (workedTime.hours * 60) + workedTime.minutes;
  workedTime.totalMinutesPerYear = workedTime.totalMinutesPerDay * totalWorkingDaysMinusHoliday;
  return workedTime;
}

export function getWorkedTimeIncludingCommute(hoursMinutesCommute, totalWorkingDaysMinusHoliday, workedTime) {
  // Work out daily commute minutes, daily worked hours
  const dailyCommuteMinutes = hoursMinutesCommute.minutes + (hoursMinutesCommute.hours * 60);
  const dailyWorkedMinutes = workedTime.minutes + (workedTime.hours * 60);
  const totalDailyCommuteAndWorkMinutes = dailyCommuteMinutes + dailyWorkedMinutes;

  // Create new time object with all of getWorkedTime attributes
  const workedTimeIncludingCommute = {
      hours: Math.floor(totalDailyCommuteAndWorkMinutes / 60),
      minutes: totalDailyCommuteAndWorkMinutes % 60,
  };

  workedTimeIncludingCommute.totalMinutesPerDay = workedTimeIncludingCommute.minutes;
  workedTimeIncludingCommute.totalHoursPerDay = workedTimeIncludingCommute.hours;

  // Minutes to commute and work a day, times number of working days
  const yearlyMinutes = totalDailyCommuteAndWorkMinutes * totalWorkingDaysMinusHoliday;
  workedTimeIncludingCommute.totalHoursPerYear = Math.floor(yearlyMinutes / 60)
  workedTimeIncludingCommute.totalMinutesPerYear = yearlyMinutes % 60;

  return workedTimeIncludingCommute;
}

export function getLostTime(workedTimeIncludingCommute, workedTime, totalWorkingDaysMinusHoliday) {
  const minutesDifference = Math.abs(workedTimeIncludingCommute.totalMinutesPerDay - workedTime.totalMinutesPerDay);
  const hoursDifference = Math.abs(workedTimeIncludingCommute.totalHoursPerDay - workedTime.totalHoursPerDay);

  const lostTime = {
      'hours': hoursDifference,
      'minutes': minutesDifference,
  };

  lostTime.totalMinutesPerDay = lostTime.minutes;
  lostTime.totalHoursPerDay = lostTime.hours;

  // Now calculate yearly minutes/hours lost
  const totalDiffMinsPerDay = lostTime.totalMinutesPerDay + (lostTime.totalHoursPerDay * 60);
  const totalDiffMinsPerYear = totalDiffMinsPerDay * totalWorkingDaysMinusHoliday;

  lostTime.totalHoursPerYear = Math.floor(totalDiffMinsPerYear / 60);
  lostTime.totalMinutesPerYear = totalDiffMinsPerYear % 60;

  return lostTime;
}

