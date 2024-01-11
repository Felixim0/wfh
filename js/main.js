import { getPercentMultiplier } from './conversionHelpers.js';
import { getKilledPeople, calculateCarbon } from './carbonHelper.js';
import { getLostTime, getWorkedTimeIncludingCommute, getCommuteTime, getWorkedTime } from './timeCalculations.js';

export function calculateFinalValues(currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes, fuelBoxes) {
    // Get the values from inputs with default to "0" if blank or null
    const currentSalaryValue = currentSalaryInput.value || "0";
    const commuteTimeHoursValue = commuteTimeHoursInput.value || "0";
    const commuteTimeMinutesValue = commuteTimeMinutesInput.value || "0";
    const fuelCostValue = fuelCostInput.value || "0";

    // Find selected percentage box
    const selectedPercentageBox = Array.from(percentageBoxes).find(box => box.classList.contains('selected'));
    const percentageBoxValue = selectedPercentageBox ? selectedPercentageBox.innerText : null;

    // Find selected fuel box
    const selectedFuelBox = Array.from(fuelBoxes).find(box => box.classList.contains('selected'));
    const selectedFuelBoxValue = selectedFuelBox ? selectedFuelBox.innerText : null;

    // Multiply by mp MULTIPLIER
    const mp = getPercentMultiplier(percentageBoxValue);

    console.log("Calculating final values with:",
        currentSalaryValue,
        `${commuteTimeHoursValue}h ${commuteTimeMinutesValue}m`,
        fuelCostValue,
        percentageBoxValue,
        mp);

    // Calculation Logic
    // 52 weeks a year * 5 = 260 working days
    // Assume 25 days of holiday  + 8 days bank holiday etc = 33

    const totalWorkingDays = 260;
    const totalWorkingDaysMinusHoliday = totalWorkingDays - 33;
    const workingDaysMinusHolidayAttendance = totalWorkingDaysMinusHoliday * mp;

    // Commute time 
    const commuteTime = getCommuteTime(commuteTimeHoursValue, commuteTimeMinutesValue, workingDaysMinusHolidayAttendance);

    // Calculate worked time (minus holiday)
    const workedTime = getWorkedTime(totalWorkingDaysMinusHoliday);

    // Calculate worked time including commute
    const workedTimeIncludingCommute = getWorkedTimeIncludingCommute(
        commuteTime, 
        workingDaysMinusHolidayAttendance,
        workedTime);

    // Calculate daily lost time in minutes
    const lostTime = getLostTime(workedTimeIncludingCommute, workedTime, workingDaysMinusHolidayAttendance);

    // Calculate Salary 
    const currentSalary = parseInt(currentSalaryValue, 10);
    const currentSalaryPerDay = currentSalary / totalWorkingDaysMinusHoliday;
    const costOfFuelPerDay = parseInt(fuelCostValue, 10) / 5;

    // Calculate cost of fuel a year
    const fuelCostPerYear = costOfFuelPerDay * workingDaysMinusHolidayAttendance;

    // Calculate salary per hour
    const salaryPerMinute = currentSalary / workedTime.year.totalMinutes;
    const salaryPerHour = salaryPerMinute * 60;

    // Calculate salary minus fuel with commute hours
    const salaryMinusFuel = currentSalary - fuelCostPerYear;
    const commuteTotalMins = commuteTime.year.totalMinutes
    const workedTimeTotalMins = workedTime.year.totalMinutes;
    const salaryPerMinuteIncludingCommuteFuel = salaryMinusFuel / (commuteTotalMins + workedTimeTotalMins);
    const salaryPerHourIncludingCommuteFuel = salaryPerMinuteIncludingCommuteFuel * 60; 

    // Calculate percentage salary decrease
    const percentageSalaryDecrease = ((salaryPerHour - salaryPerHourIncludingCommuteFuel) / salaryPerHour) * 100;

    // Calculate additional carbon (and other polutants)
    const emissionFactors = {
      'totalCommuteMinutesPerYear': commuteTime.year.totalMinutes,
      'transportMethod': selectedFuelBoxValue,
      'totalKmTravelled': null,
      'totalComuteKMPerYear': null,
    }

    const additionalCarbon = calculateCarbon(emissionFactors);
    const carbonReleased = additionalCarbon.totalCarbon;

    // calcualte hourly paycut
    const hourlyPaycut = salaryPerHour - salaryPerHourIncludingCommuteFuel;

    // Calculate
    setOutputs(lostTime, fuelCostPerYear, additionalCarbon, percentageSalaryDecrease,
         salaryMinusFuel, salaryPerHour, salaryPerHourIncludingCommuteFuel, hourlyPaycut);
}

function setOutputs(lostTime, lostMoney, additionalCarbon, percentageSalaryDecrease,
     finalSalary, salaryPerHour, salaryPerHourTravelFuel, hourlyPaycut) {
    const lostMoneyOutput = docQry('#moneyOutput');
    const additionalCarbonOutput = docQry('#additionalCarbon');
    const percentageSalaryDecreaseOutput = docQry('#percentageSalaryDecrease');
    const finalSalaryOutput = docQry('#finalSalary');
    const salaryPerHourOutput = docQry('#salaryPerHourOutput');
    const salaryPerHourTravelFuelOutput = docQry('#salaryPerHourTravelFuelOutput');
    const hourlyPaycutOutput = docQry('#hourlyPaycut');

    const lostTimeOutput = docQry('#lostTime');
    lostTimeOutput.textContent = `Hours: ${(lostTime.year.hours).toFixed(0)}, Minutes: ${(lostTime.year.minutes).toFixed(0)}`;

    lostMoneyOutput.textContent = `${parseFloat(lostMoney).toFixed(2)}`;
    additionalCarbonOutput.textContent = `${parseFloat(additionalCarbon).toFixed(2)} Kg`;
    percentageSalaryDecreaseOutput.textContent = isNaN(parseFloat(percentageSalaryDecrease)) ? "0%" : `${parseFloat(percentageSalaryDecrease).toFixed(2)}%`;
    finalSalaryOutput.textContent = `£ ${parseFloat(finalSalary).toFixed(2)}`;
    salaryPerHourOutput.textContent = `£ ${parseFloat(salaryPerHour).toFixed(2)}`;
    salaryPerHourTravelFuelOutput.textContent = `£ ${parseFloat(salaryPerHourTravelFuel).toFixed(2)}`;
    hourlyPaycutOutput.textContent = `${parseFloat(hourlyPaycut).toFixed(2)}`;

    // Human Statement
    const statementContainer = docQry('#humanStatement');
    // Remove any children
    while (statementContainer.firstChild) statementContainer.removeChild(statementContainer.firstChild);
    // Generate statement
    const statement = `You will waste ${((lostTime.year.totalMinutes / 60) / 24).toFixed(0)} days commuting.
                      Including extra time you spend and the cost of fuel, your sallery will decrease by ${percentageSalaryDecreaseOutput.textContent}`;
    const h4 = document.createElement('h3');
    h4.textContent = statement;
    statementContainer.append(h4);
    
}

function docQry(elId) {
  return document.querySelector(elId);
}
