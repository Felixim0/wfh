import {getPercentMultiplier} from '../js/conversionHelpers.js';

test('Check 100% is int 1', () => {
  expect(getPercentMultiplier('100%')).toBe(1);
});

test('Check 80% is float .8', () => {
  expect(getPercentMultiplier('80%')).toBe(.8);
});

test('Check 60% is float .6', () => {
  expect(getPercentMultiplier('60%')).toBe(.6);
});

test('Check 50% is float .5', () => {
  expect(getPercentMultiplier('50%')).toBe(.5);
});

test('Check 40% is float .4', () => {
  expect(getPercentMultiplier('40%')).toBe(.4);
});

test('Check 20% is float .2', () => {
  expect(getPercentMultiplier('20%')).toBe(.2);
});
