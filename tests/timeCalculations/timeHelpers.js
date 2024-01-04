// Helpers to set new workedTime a nd hoursMinuteCommute values
export const defaultTimeObj = 
  {
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

export function newTimeObj() {
  return JSON.parse(JSON.stringify(defaultTimeObj));
}


