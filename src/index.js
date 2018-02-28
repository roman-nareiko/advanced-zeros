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

  function count_dividers(number, divider) {
    let count = 0;

    while(number%divider === 0) {
      count++;
      number /= divider;
    }

    return count;
  }
  //{ '2': 2, '3': 1, '7': 1 }
  let primers_stat = factorize(base);
  let primers = Object.keys(primers_stat).map(x => parseInt(x));
  let factorial_primers = {};

  primers.forEach(primer => {
    let count = 0;
    for(let i = primer; i <= number; i += primer) {
      count += count_dividers(i, primer);
    }
    factorial_primers[primer] = count;
  });
  
  let count = [];

  primers.forEach(value => {
    count.push(Math.floor(factorial_primers[value]/primers_stat[value]));
  });
  
  return Math.min(...count);
}