// 3 different way to sum to n
function sum_to_n_a(n: number): number {
  // using recursion
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_a(n - 1);
  }
}


function sum_to_n_b(n: number): number {
  // using formula
  return (n * (n + 1)) / 2;
}

function sum_to_n_c(n: number): number {
  // using loop
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}