var fs = require('fs');
const { callbackify } = require('util');

// File Input working
try {
    var data = fs.readFileSync('input.txt', 'utf8');  
} catch(e) {
    console.log('Error:', e.stack);
}

// Parsing inp
a = data.trim().split("\n").map(x => x.split(" ")).map(x => [x[0] , +x[1]]);

// -------------------------------------------------------------------------------------------------------
// Part 1
// -------------------------------------------------------------------------------------------------------

function calc_distance(a , b) {
    return Math.sqrt(
        Math.pow((a[0] - b[0]) , 2) +
        Math.pow((a[1] - b[1]) , 2)
    );
}

const go = (d , dp , currH , currT , dir) => {
    switch (dir) {
        case "L":
            for(let i=1 ; i<=d ; i++){
                currH[0] = currH[0]-1;
                if(calc_distance(currH , currT) > 1.5) {currT[0] = currT[0]-1 ; currT[1] = currH[1]}
                dp.add(JSON.stringify([currT[0] , currT[1]]));
            }
            break;
        case "R":
            for(let i=1 ; i<=d ; i++){
                currH[0] = currH[0]+1;
                if(calc_distance(currH , currT) > 1.5) {currT[0] = currT[0]+1 ; currT[1] = currH[1]}
                dp.add(JSON.stringify([currT[0] , currT[1]]));
            }
            break;
        case "U":
            for(let i=1 ; i<=d ; i++){
                currH[1] = currH[1]-1;
                if(calc_distance(currH , currT) > 1.5) {currT[0] = currH[0] ; currT[1] = currT[1]-1}
                dp.add(JSON.stringify([currT[0] , currT[1]]));
            }
            break;
        case "D":
            for(let i=1 ; i<=d ; i++){
                currH[1] = currH[1]+1;
                if(calc_distance(currH , currT) > 1.5) {currT[0] = currH[0] ; currT[1] = currT[1]+1}
                dp.add(JSON.stringify([currT[0] , currT[1]]));
            }
            break;
    }
    return currH;
}

let dp = new Set();
let currH = [0 , 0];
let currT = [0 , 0];

a.forEach((x , i) => {
    go(x[1] , dp , currH , currT , x[0]);
    // console.error(currH , currT);
});

console.log(dp.size);

// -------------------------------------------------------------------------------------------------------
// Part 1.5
// -------------------------------------------------------------------------------------------------------

