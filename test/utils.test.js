const { isEven, isPositive, factorial } = require('../src/utils');

describe('Utils Functions', () => {
  describe('isEven', () => {
    test('should return true for even numbers', () => {
      expect(isEven(4)).toBe(true);
    });

    test('should return false for odd numbers', () => {
      expect(isEven(3)).toBe(false);
    });

    test('should return true for zero', () => {
      expect(isEven(0)).toBe(true);
    });
  });

  describe('isPositive', () => {
    test('should return true for positive numbers', () => {
      expect(isPositive(5)).toBe(true);
    });

    test('should return false for negative numbers', () => {
      expect(isPositive(-5)).toBe(false);
    });

    test('should return false for zero', () => {
      expect(isPositive(0)).toBe(false);
    });
  });

  describe('factorial', () => {
    test('should calculate factorial of 5', () => {
      expect(factorial(5)).toBe(120);
    });

    test('should return 1 for factorial of 0', () => {
      expect(factorial(0)).toBe(1);
    });

    test('should return 1 for factorial of 1', () => {
      expect(factorial(1)).toBe(1);
    });

    test('should throw error for negative numbers', () => {
      expect(() => factorial(-1)).toThrow('Factorial not defined for negative numbers');
    });
  });
});
