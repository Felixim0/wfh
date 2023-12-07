function init() {
    // Get all the inputs
    const hoursPerWeekInput = document.querySelector('#hoursPerWeek');
    const currentSalaryInput = document.querySelector('#currentSalary');
    const commuteTimeHoursInput = document.querySelector('#commuteTimeHours');
    const commuteTimeMinutesInput = document.querySelector('#commuteTimeMinutes');
    const fuelCostInput = document.querySelector('#fuelCost');

    // Get all the percentage boxes
    const percentageBoxes = document.querySelectorAll('.percentageBoxes div');

    // Setup starting values
    setupSelectedPercentageBoxes(percentageBoxes[3]); // Assuming the last box (100%) is the default

    // Add event listeners to inputs
    [hoursPerWeekInput, currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput].forEach(input => {
        input.addEventListener('input', () => calculateFinalValues(hoursPerWeekInput, currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes));
    });

    // Add click event listeners to percentage boxes
    percentageBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // Mark the clicked box as selected
            percentageBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            calculateFinalValues(hoursPerWeekInput, currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes);
        });
    });
}


function calculateFinalValues(hoursPerWeekInput, currentSalaryInput, commuteTimeHoursInput, commuteTimeMinutesInput, fuelCostInput, percentageBoxes) {
    // Get the values from inputs
    const hoursPerWeekValue = hoursPerWeekInput.value;
    const currentSalaryValue = currentSalaryInput.value;
    const commuteTimeHoursValue = commuteTimeHoursInput.value;
    const commuteTimeMinutesValue = commuteTimeMinutesInput.value;
    const fuelCostValue = fuelCostInput.value;

    // Find selected percentage box
    const selectedPercentageBox = Array.from(percentageBoxes).find(box => box.classList.contains('selected'));
    const percentageBoxValue = selectedPercentageBox ? selectedPercentageBox.innerText : null;

    console.log("Calculating final values with:", 
        hoursPerWeekValue, 
        currentSalaryValue, 
        `${commuteTimeHoursValue}h ${commuteTimeMinutesValue}m`, 
        fuelCostValue, 
        percentageBoxValue);

    // Continue with your calculation logic
    // Update the output elements based on the calculations
    // Example: document.querySelector('#outputElementId').innerText = calculatedValue;
}


function setupSelectedPercentageBoxes(percentageBox) {
    percentageBox.classList.add('selected');
}

window.addEventListener('load', init);
