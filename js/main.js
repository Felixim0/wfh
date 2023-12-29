import { getPercentMultiplier } from './conversionHelpers.js';
import { calculateCarbon } from './carbonHelper.js';
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

    const totalWorkingDays = Math.round(260 * mp);
    const totalWorkingDaysMinusHoliday = totalWorkingDays - 33; // 227
    console.log(totalWorkingDays);
    console.log(totalWorkingDaysMinusHoliday );

    // Commute time
    const hoursMinutesCommute = getCommuteTime(commuteTimeHoursValue, commuteTimeMinutesValue, totalWorkingDaysMinusHoliday);

    // Calculate worked time (minus holiday)
    const workedTime = getWorkedTime(totalWorkingDaysMinusHoliday);

    // Calculate worked time including commute
    const workedTimeIncludingCommute = getWorkedTimeIncludingCommute(hoursMinutesCommute, totalWorkingDaysMinusHoliday, workedTime);

    // Calculate Sallery
    const currentSalary = parseInt(currentSalaryValue, 10);
    const currentSalaryPerDay = currentSalary / totalWorkingDaysMinusHoliday;
    const costOfFuelPerDay = parseInt(fuelCostValue, 10) / 5;

    // Calculate daily lost time in minutes
    const lostTime = getLostTime(workedTimeIncludingCommute, workedTime, totalWorkingDaysMinusHoliday );

    // Calculate Lost Money
    const fuelCostPerYear = costOfFuelPerDay * totalWorkingDaysMinusHoliday;

    // Calculate sallery per hour
    const totalWorkingHoursPerYear = workedTime.totalMinutesPerYear / 60;
    const salaryPerHour = currentSalary / totalWorkingHoursPerYear;
    // Calculate sallery minus fuel with commute hours
    const totalWorkingHoursPerYearIncludingCommute = workedTimeIncludingCommute.totalMinutesPerYear / 60;
    const salaryMinusFuel = currentSalary - fuelCostPerYear;
    const salaryPerHourIncludingCommuteFuel = salaryMinusFuel / totalWorkingHoursPerYearIncludingCommute;

    // Calculate percentage sallery decrease
    const percentageSalaryDecrease = ((salaryPerHour - salaryPerHourIncludingCommuteFuel) / salaryPerHour) * 100;

    // Calculate additional carbon (and other polutants)
    const emissionFactors = {
      'totalCommuteHoursPerYear': hoursMinutesCommute.totalHoursPerYear,
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
    const percentageSalaryDecreaseOutput = docQry('#percentageSalleryDecrease');
    const finalSalaryOutput = docQry('#finalSallery');
    const salaryPerHourOutput = docQry('#salaryPerHourOutput');
    const salaryPerHourTravelFuelOutput = docQry('#salaryPerHourTravelFuelOutput');
    const hourlyPaycutOutput = docQry('#hourlyPaycut');

    const lostTimeOutput = docQry('#lostTime');
    const lostHours = Math.floor(lostTime.totalMinutesPerYear / 60);
    const lostMinutes = lostTime.totalMinutesPerYear % 60;
    lostTimeOutput.textContent = `Hours: ${lostHours}, Minutes: ${lostMinutes}`;

    lostMoneyOutput.textContent = `${parseFloat(lostMoney).toFixed(2)}`;
    additionalCarbonOutput.textContent = `${parseFloat(additionalCarbon).toFixed(2)} Kg`;
    percentageSalaryDecreaseOutput.textContent = isNaN(parseFloat(percentageSalaryDecrease)) ? "0%" : `${parseFloat(percentageSalaryDecrease).toFixed(2)}%`;
    finalSalaryOutput.textContent = `${parseFloat(finalSalary).toFixed(2)}`;
    salaryPerHourOutput.textContent = `${parseFloat(salaryPerHour).toFixed(2)}`;
    salaryPerHourTravelFuelOutput.textContent = `${parseFloat(salaryPerHourTravelFuel).toFixed(2)}`;
    hourlyPaycutOutput.textContent = `${parseFloat(hourlyPaycut).toFixed(2)}`;
}

function docQry(elId) {
  return document.querySelector(elId);
}
