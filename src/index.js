module.exports = function getZerosCount(number, base) {
  function factorize(number) {
    let dividers = {};
    let divider = 2;

    while(number > 1) {
      if(number%divider === 0) {
        number /= divider;
        if(dividers[divider])
          dividers[divider] += 1;
        else
          dividers[divider] = 1
      } else {
        divider++;
      }
    }

    return dividers;
  }
  
  //{ '2': 2, '3': 1, '7': 1 }
  let primers_stat = factorize(base);
  let factorial_primers = {};

  for(let primer in primers_stat) {
    let x = number;
    let count = 0;
    while(x) {
      x = Math.floor(x / primer);
      count += x;
    }
    factorial_primers[primer] = count;
  }
  //{ '2': 1, '109': 1 } { '2': 98707928, '109': 913961 }
  let count = [];
  for(let primer in primers_stat) {
    count.push(Math.floor(factorial_primers[primer]/primers_stat[primer]));
  }

  return Math.min(...count);
}