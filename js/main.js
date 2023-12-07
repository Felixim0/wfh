function init() {
    // Get all the inputs
    const currentSalaryInput = document.querySelector('#currentSalary');
    const commuteTimeHoursInput = document.querySelector('#commuteTimeHours');
    const commuteTimeMinutesInput = document.querySelector('#commuteTimeMinutes');
    const fuelCostInput = document.querySelector('#fuelCost');

    // Get all the percentage boxes
    const percentageBoxes = document.querySelectorAll('.percentageBoxes div');

    // Get all fuel
    const fuelBoxes = document.querySelectorAll('.fuelSelector div');

    // Setup starting values
    setupSelectedPercentageBoxes(percentageBoxes[3]); // Assuming the last box (100%) is the default
    setupSelectedFuel(fuelBoxes[0]); 

    // Add event listeners to inputs
    [currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput].forEach(input => {
        input.addEventListener('input', () => calculateFinalValues(currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes, fuelBoxes));
    });

    // Add click event listeners to percentage boxes
    percentageBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // Mark the clicked box as selected
            percentageBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            calculateFinalValues(currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes, fuelBoxes );
        });
    });

    // Add click event listeners for fuel 
    fuelBoxes.forEach(box => {
        box.addEventListener('click', () => {
            fuelBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            calculateFinalValues(currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes, fuelBoxes);
        });
    });
}


function calculateFinalValues(currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes, fuelBoxes) {
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
    const additionalCarbon = calculateCarbon(hoursMinutesCommute.totalMinutesPerYear, selectedFuelBoxValue);

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

    lostMoneyOutput.textContent = `${parseFloat(lostMoney).toFixed(2)}`;
    additionalCarbonOutput.textContent = `${additionalCarbon} Kg`;
    percentageSalaryDecreaseOutput.textContent = `${parseFloat(percentageSalaryDecrease).toFixed(2)}%`;
    finalSalaryOutput.textContent = `${parseFloat(finalSalary).toFixed(2)}`;
    salaryPerHourOutput.textContent = `${parseFloat(salaryPerHour).toFixed(2)}`;
    salaryPerHourTravelFuelOutput.textContent = `${parseFloat(salaryPerHourTravelFuel).toFixed(2)}`;
    hourlyPaycutOutput.textContent = `${parseFloat(hourlyPaycut).toFixed(2)}`;

}
function setupSelectedFuel(fuelBox) {
    fuelBox.classList.add('selected');
}

function setupSelectedPercentageBoxes(percentageBox) {
    percentageBox.classList.add('selected');
}

function calculateCarbon(journeyMinutes, selectedFuelBoxValue) {
    const emissionRatePetrolPerKm = 120; // grams of CO2 per kilometer, example for a petrol car
    const emissionRateDeiselPerKm = 150;
    const averageSpeedKmPerHour = 40; // average speed in km/h
    const totalCommuteHoursPerYear = journeyMinutes/ 60;
    // Calculate total distance traveled per year (in kilometers)
    const totalDistanceKmPerYear = averageSpeedKmPerHour * totalCommuteHoursPerYear;
    // Calculate total carbon emissions for the year (in grams)
    const totalCarbonPetrolEmissions = totalDistanceKmPerYear * emissionRatePetrolPerKm;
    const totalCarbonDesilEmissions = totalDistanceKmPerYear * emissionRateDeiselPerKm;

    // If needed, convert total carbon emissions to kilograms or tons
    const totalCarbonEmissionsPetrolKg= totalCarbonPetrolEmissions / 1000;
    const totalCarbonEmissionsDieselKg= totalCarbonDesilEmissions / 1000;
    if (selectedFuelBoxValue === 'Petrol') {
        return totalCarbonEmissionsPetrolKg;
    } else {
        return totalCarbonEmissionsDieselKg;
    }
}
window.addEventListener('load', init);
