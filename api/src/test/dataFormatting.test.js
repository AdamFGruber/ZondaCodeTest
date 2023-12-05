import { filterAndSort } from '../dataFormatting';
import { validData } from './data/testData';

describe('Data Formatting Tests', function () {

test('valid input with no filtering', () => {
  const result = filterAndSort(validData, [], "");
  expect(result).toEqual(validData);
});

/** 
test('valid input with valid status code', () => {
  filterAndSort(validData, ["Active"], "");
});

test('valid input with valid sort field', () => {
  filterAndSort(validData, [], "name");
});

test('valid input with multiple valid status codes', () => {
  filterAndSort(validData, ["Active", "Builtout"], "");
});

test('valid input with both status codes and sort field', () => {
  filterAndSort(validData, ["Active", "Builtout"], "name");
});

test invalid parameters

test parameters with incorrect types

test missing parameters

test unexpected data

test empty data set
*/

});


/** 
describe('API Tests', function () {

  test valid api get request gives correct status code

  test valid api get request gives correct response data
  
  test valid api post request gives correct status code

  test valid api post request gives correct response data

  test post request with missing body

  test post request with invalid fields in body

  test post request with correct fields but data not in dataset

  test correct headers are responded with

  for all the negative responses test that a meaningful error response is returned
  
});
*/