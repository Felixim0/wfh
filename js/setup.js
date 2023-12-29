import { calculateFinalValues } from './main.js';

async function initServiceWorker() {
  try {
    await navigator.serviceWorker.register('./worker.js');
  } catch (e) {
    console.warn("Service Worker failed.  Falling back to 'online only'.", e);
  }
}

async function init() {
    //Add service worker
    await initServiceWorker();

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
    setupSelectedPercentageBoxes(percentageBoxes[4]); // Assuming the last box (100%) is the default
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

function setupSelectedFuel(fuelBox) {
    fuelBox.classList.add('selected');
}

function setupSelectedPercentageBoxes(percentageBox) {
    percentageBox.classList.add('selected');
}

window.addEventListener('load', init);
