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


// Part 2 has logic that also works for part 1 (Part 1 was my initial attempt for first problem which worked cuz it's only 2).
// Do not use part 1 for anything other than learning how NOT to solve this problem,


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
// Part 2
// -------------------------------------------------------------------------------------------------------
let DISTANCE = 1.5

const move = (dp , currH , currT , dir) => {
    let x_distance = currH[0] - currT[0];
    let y_distance = currH[1] - currT[1];
    if(calc_distance(currH , currT) > DISTANCE){
        currT[0] = x_distance > 0 ? currT[0]+1 : (x_distance < 0 ? currT[0]-1 : currT[0]);
        currT[1] = y_distance > 0 ? currT[1]+1 : (y_distance < 0 ? currT[1]-1 : currT[1]);
    }
}

const move_1 = (currH , dir) => {
    switch (dir) {
        case "L":
            currH[0] = currH[0]-1;
            break;
        case "R":
            currH[0] = currH[0]+1;
            break;
        case "U":
            currH[1] = currH[1]-1;
            break;
        case "D":
            currH[1] = currH[1]+1;
            break;
    }
}


let KNOTS = 10;
let dp_2 = new Set();
let knots = [];
for(let i=0 ; i < KNOTS ; i++) knots.push([0 , 0]);

a.forEach((x , i) => {
    for(let i=0 ; i<x[1] ; i++){
        move_1(knots[0] , x[0]);
        for(let k=1 ; k < KNOTS ; k++){
            move(dp_2 , knots[k-1] , knots[k] , x[0]);
            if(k== KNOTS-1) {
                console.log(knots[KNOTS-1]);
                dp_2.add(JSON.stringify(knots[KNOTS-1]));
            }
        }
        // console.log(knots);
    }
});

// console.log(knots);
console.log(dp_2.size);