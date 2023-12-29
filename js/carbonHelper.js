// Calculations for Carbon Emissions
export function calculateCarbon(emissionFactors) {
  // Get what the user inputted
  const transportMethod = emissionFactors.transportMethod;
  const totalCommuteHoursPerYear = emissionFactors.totalCommuteHoursPerYear;
  const totalCommuteKMPerYear = emissionFactors.totalComuteKMPerYear;

  // Options are Petrol, Deisel, Walk/Bike, Train
  if (transportMethod === 'Petrol') {
    return emissionsFromCar('Petrol', totalCommuteHoursPerYear);
  } else if (transportMethod === 'Deisel') {
    return emissionsFromCar('Deisel', totalCommuteHoursPerYear);
  } else if (transportMethod === 'Walk/Bike') {
    return 0;
  } else if (transportMethod === 'Train') {
    return emissionsFromTrain(totalCommuteKMPerYear);
  }
}

function emissionsFromTrain(totalCommuteKMPerYear) {
  // https://thrustcarbon.com/insights/the-carbon-emission-of-a-uk-train-journey
  const co2PerKM = 0.03659;
  return co2PerKM * totalCommuteKMPerYear;
}

// Calculate emissions from a car given hours driven and fuel type
function emissionsFromCar(petrolOrDeisel, totalCommuteHoursPerYear) {
  // Constants for emission rates
  const emissionRatePetrolPerKm = 120; // grams of CO2 per kilometer, example for a petrol car
  const emissionRateDeiselPerKm = 150;
  const averageSpeedKmPerHour = 40; // average speed in km/h

  // Calculate total distance traveled per year (in kilometers)
  const totalDistanceKmPerYear = averageSpeedKmPerHour * totalCommuteHoursPerYear;

  // Calculate total carbon emissions for the year (in grams)
  const totalCarbonPetrolEmissions = totalDistanceKmPerYear * emissionRatePetrolPerKm;
  const totalCarbonDesilEmissions = totalDistanceKmPerYear * emissionRateDeiselPerKm;

  // If needed, convert total carbon emissions to kilograms or tons
  const totalCarbonEmissionsPetrolKg= totalCarbonPetrolEmissions / 1000;
  const totalCarbonEmissionsDieselKg= totalCarbonDesilEmissions / 1000;
  
  if (petrolOrDeisel === 'Petrol') {
    return totalCarbonEmissionsPetrolKg;
  } else if (petrolOrDeisel === 'Deisel') {
    return totalCarbonEmissionsDieselKg;
  }
}


  
