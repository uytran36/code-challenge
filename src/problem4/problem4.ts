// 3 different way to sum to n

/**
 * Complexity: O(n)
 * 
 * @param n number
 * @returns sum of 1 to n
 */
function sum_to_n_a(n: number): number {
  // using recursion
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_a(n - 1);
  }
}

/**
 * Complexity: O(1)
 * 
 * @param n number
 * @returns sum of 1 to n
 */
function sum_to_n_b(n: number): number {
  // using formula
  return (n * (n + 1)) / 2;
}

/**
 * Complexity: O(n)
 * 
 * @param n number
 * @returns sum of 1 to n
 */
function sum_to_n_c(n: number): number {
  // using loop
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}