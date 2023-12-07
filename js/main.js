console.log('test');

function setupSelectedPercentageBoxes(percentage100Box) {
    percentage100.classList.add('selected');
}

function init() {
    // Get all the inputs and outputs
    const hoursPerWeekInput = doucment.querySelector('#hoursPerWeek');
    const currentSalaryInput = document.querySelector('#currentSalary');
    const commuteTimeInput = document.querySelector('#commuteTime');
    const fuelCostInput = document.querySelector('#fuelCost');

    const percentage20Box = document.querySelector('#percentage20');
    const percentage40Box = document.querySelector('#percentage40');
    const percentage60Box = document.querySelector('#percentage60');
    const percentage100Box = document.querySelector('#percentage100');


    // Add event Listeners
    const inputs = document.querySelectorAll('#inputs input');
    inputs.forEach(function(input) {
        input.addEventListener('change', calculateFinalValues);
    });

    // Select all percentage boxes
    const percentageBoxes = document.querySelectorAll('.percentageBoxes div');
    percentageBoxes.forEach(function(box) {
        box.addEventListener('click', function() {
            calculateFinalValues();
        });
    });

}


function calculateFinalValues() {
    console.log("Calculating final values...");
}


window.addEventListener('load', init);