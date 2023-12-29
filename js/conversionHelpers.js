export function getPercentMultiplier(percentageBoxValue) {
    if (percentageBoxValue === '100%') {
        return 1
    } else if (percentageBoxValue === '80%') {
        return 0.8
    } else if (percentageBoxValue === '60%') {
        return 0.6
    } else if (percentageBoxValue === '40%') {
        return 0.4
    } else if (percentageBoxValue === '20%') {
        return 0.2
    }
}

