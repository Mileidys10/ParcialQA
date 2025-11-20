function isEven(num) {
  return num % 2 === 0;
}

function isPositive(num) {
  return num > 0;
}

function factorial(n) {
  if (n < 0) {
    throw new Error('Factorial not defined for negative numbers');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

module.exports = {
  isEven,
  isPositive,
  factorial
};
