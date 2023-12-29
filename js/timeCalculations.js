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
  const workedTimeIncludingCommute = {
      'hours': workedTime.hours + hoursMinutesCommute.hours, 
      'minutes': workedTime.minutes + hoursMinutesCommute.minutes
  };
  if (workedTimeIncludingCommute.minutes >= 60) {
      workedTimeIncludingCommute.hours += Math.floor(workedTimeIncludingCommute.minutes / 60);
      workedTimeIncludingCommute.minutes %= 60;
  }
  workedTimeIncludingCommute.totalMinutesPerDay = (workedTimeIncludingCommute.hours * 60) + workedTimeIncludingCommute.minutes;
  workedTimeIncludingCommute.totalMinutesPerYear = workedTimeIncludingCommute.totalMinutesPerDay * totalWorkingDaysMinusHoliday;
  return workedTimeIncludingCommute;
}

export function getLostTime(workedTimeIncludingCommute, workedTime, totalWorkingDaysMinusHoliday  ) {
  const lostTimeMinutesPerDay = (workedTimeIncludingCommute.totalMinutesPerDay) - (workedTime.totalMinutesPerDay);
  const lostTime = {
      'hours': Math.floor(lostTimeMinutesPerDay / 60),
      'minutes': lostTimeMinutesPerDay % 60
  };
  lostTime.totalMinutesPerDay = (lostTime.hours * 60) + lostTime.minutes;
  lostTime.totalMinutesPerYear = lostTime.totalMinutesPerDay * totalWorkingDaysMinusHoliday;
  return lostTime;
}

