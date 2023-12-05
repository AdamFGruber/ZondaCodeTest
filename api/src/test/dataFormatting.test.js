import { filterAndSort } from '../dataFormatting';
import { validData } from './data/testData';

describe('Happy Path Tests', function () {

test('valid input with no filtering', () => {
  const result = filterAndSort(validData, [], "");
  expect(result).toEqual(validData);
});

});
