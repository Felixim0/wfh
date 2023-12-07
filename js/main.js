function init() {
    // Get all the inputs
    const currentSalaryInput = document.querySelector('#currentSalary');
    const commuteTimeHoursInput = document.querySelector('#commuteTimeHours');
    const commuteTimeMinutesInput = document.querySelector('#commuteTimeMinutes');
    const fuelCostInput = document.querySelector('#fuelCost');

    // Get all the percentage boxes
    const percentageBoxes = document.querySelectorAll('.percentageBoxes div');

    // Setup starting values
    setupSelectedPercentageBoxes(percentageBoxes[3]); // Assuming the last box (100%) is the default

    // Add event listeners to inputs
    [currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput].forEach(input => {
        input.addEventListener('input', () => calculateFinalValues(currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes));
    });

    // Add click event listeners to percentage boxes
    percentageBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // Mark the clicked box as selected
            percentageBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            calculateFinalValues(currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes);
        });
    });
}


function calculateFinalValues(currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes) {
    // Get the values from inputs with default to "0" if blank or null
    const currentSalaryValue = currentSalaryInput.value || "0";
    const commuteTimeHoursValue = commuteTimeHoursInput.value || "0";
    const commuteTimeMinutesValue = commuteTimeMinutesInput.value || "0";
    const fuelCostValue = fuelCostInput.value || "0";

    // Find selected percentage box
    const selectedPercentageBox = Array.from(percentageBoxes).find(box => box.classList.contains('selected'));
    const percentageBoxValue = selectedPercentageBox ? selectedPercentageBox.innerText : null;

    console.log("Calculating final values with:", 
        currentSalaryValue, 
        `${commuteTimeHoursValue}h ${commuteTimeMinutesValue}m`, 
        fuelCostValue, 
        percentageBoxValue);

    // Calculation Logic
    // 52 weeks a year * 5 = 260 working days - Bank Holidays(8) - 251 Days
    // Assume 25 days of holiday used = 226 working days

    const totalWorkingDays = 260;
    const totalWorkingDaysMinusHoliday = totalWorkingDays - 33;

    // Commute time
    const hoursMinutesCommute = {
        'hours': parseInt(commuteTimeHoursValue, 10), 
        'minutes': parseInt(commuteTimeMinutesValue, 10)
    };
    hoursMinutesCommute.totalMinutesPerDay = (hoursMinutesCommute.hours * 60) + hoursMinutesCommute.minutes;
    hoursMinutesCommute.totalMinutesPerYear = hoursMinutesCommute.totalMinutesPerDay * totalWorkingDaysMinusHoliday;

    // Calculate worked time (minus holiday)
    const workedTime = {'hours': 7, 'minutes': 24}; // These are already numbers
    workedTime.totalMinutesPerDay = (workedTime.hours * 60) + workedTime.minutes;
    workedTime.totalMinutesPerYear = workedTime.totalMinutesPerDay * totalWorkingDaysMinusHoliday;

    // Calculate worked time including commute
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

    const currentSalary = parseInt(currentSalaryValue, 10);
    const currentSalaryPerDay = currentSalary / 226;
    const costOfFuelPerDay = parseInt(fuelCostValue, 10) / 5;

    // Calculate daily lost time in minutes
    const lostTimeMinutesPerDay = (workedTimeIncludingCommute.totalMinutesPerDay) - (workedTime.totalMinutesPerDay);
    const lostTime = {
        'hours': Math.floor(lostTimeMinutesPerDay / 60),
        'minutes': lostTimeMinutesPerDay % 60
    };
    lostTime.totalMinutesPerDay = (lostTime.hours * 60) + lostTime.minutes;
    lostTime.totalMinutesPerYear = lostTime.totalMinutesPerDay * totalWorkingDaysMinusHoliday;

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

    // Calculate additional carbon
    const additionalCarbon = 10;

    // calcualte hourly paycut
    const hourlyPaycut = salaryPerHour - salaryPerHourIncludingCommuteFuel;

    // Calculate
    setOutputs(lostTime, fuelCostPerYear, additionalCarbon, percentageSalaryDecrease,
         salaryMinusFuel, salaryPerHour, salaryPerHourIncludingCommuteFuel, hourlyPaycut);

}

function setOutputs(lostTime, lostMoney, additionalCarbon, percentageSalaryDecrease,
     finalSalary, salaryPerHour, salaryPerHourTravelFuel, hourlyPaycut) {
    const lostMoneyOutput = document.querySelector('#moneyOutput');
    const additionalCarbonOutput = document.querySelector('#additionalCarbon');
    const percentageSalaryDecreaseOutput = document.querySelector('#percentageSalleryDecrease');
    const finalSalaryOutput = document.querySelector('#finalSallery');
    const salaryPerHourOutput = document.querySelector('#salaryPerHourOutput');
    const salaryPerHourTravelFuelOutput = document.querySelector('#salaryPerHourTravelFuelOutput');
    const hourlyPaycutOutput = document.querySelector('#hourlyPaycut');

    const lostTimeOutput = document.querySelector('#lostTime');
    const lostHours = Math.floor(lostTime.totalMinutesPerYear / 60);
    const lostMinutes = lostTime.totalMinutesPerYear % 60;
    lostTimeOutput.textContent = `Hours: ${lostHours}, Minutes: ${lostMinutes}`;

    lostMoneyOutput.textContent = lostMoney;
    additionalCarbonOutput.textContent = additionalCarbon;
    percentageSalaryDecreaseOutput.textContent = percentageSalaryDecrease + '%';
    finalSalaryOutput.textContent = finalSalary;
    salaryPerHourOutput.textContent = salaryPerHour;
    salaryPerHourTravelFuelOutput.textContent = salaryPerHourTravelFuel;
    hourlyPaycutOutput.textContent = hourlyPaycut;
}

function setupSelectedPercentageBoxes(percentageBox) {
    percentageBox.classList.add('selected');
}

window.addEventListener('load', init);
