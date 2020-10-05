function average(scores){
    let total = 0;
    scores.forEach(function(score){
       total += score;
    })
    let avg = total/scores.length;
    return Math.round(avg);
}

const scores = [90, 98, 89, 100, 100, 86, 94]
console.log(average(scores));