var fs = require('fs');
const { maxHeaderSize } = require('http');
const { callbackify } = require('util');

// File Input working
try {
    var data = fs.readFileSync('input.txt', 'utf8');  
} catch(e) {
    console.log('Error:', e.stack);
}

// Parsing working fine
a = data.trim().split("\n").map(x => x.split(":").map(x => x.trim().split(" ").map(y => y.split(",")[0]))).map(x => [[x[0].at(-2) , x[0].at(-1)] , [x[1].at(-2) , x[1].at(-1)]]).map(y => y.map(z => z.map(xx => +xx.split("=")[1])))

// ------------------------------------------------------------------------------------------------------------------------------------
// Part 1
// ------------------------------------------------------------------------------------------------------------------------------------

// Compare func
function c(a,  b) {
    return a[0][0] - b[0][0] || a[0][1] - b[0][1];
}

a.sort(c);
console.error(a);

// takes points only. DIstance func
function d(a , b){
    let x =  Math.abs(a[0] - b[0]);
    let y = Math.abs(a[1] - b[1]);
    // console.error(x , y , x+y);
    return (x + y);
}

// basically draw circles and find out where they don't pass through. Fuck do I that????
// y = 10 for test. Find distance of beacons from sensors. Put in arr_d

// DIstance func
let arr_d = {}
let max_y = Number.MIN_SAFE_INTEGER;
let max_x = Number.MIN_SAFE_INTEGER;
let min_y = Number.MAX_SAFE_INTEGER;
let min_x = Number.MAX_SAFE_INTEGER;
for(let i=0 ; i<a.length ; i++) {
    max_y = Math.max(max_y , a[i][0][1] , a[i][1][1]);
    min_y = Math.min(min_y , a[i][0][1] , a[i][1][1]);

    max_x = Math.max(max_x , a[i][0][0] , a[i][1][0]);
    min_x = Math.min(min_x , a[i][0][0] , a[i][1][0]);

    arr_d[JSON.stringify(a[i][0])] = (d(a[i][0] , a[i][1]))
};
console.error(Object.keys(arr_d).length) 
// console.error(max_x , max_y);
// console.error(min_x , min_y);

min_x = min_x - Math.max(...Object.values(arr_d));
max_x = max_x + Math.max(...Object.values(arr_d));

// console.error(min_x , max_x);

// if distance between y_line_point and sensor more than that of sensor and beacon (from arr_d), then increment
// check y_point distance for all sensors. Only if greater than all sensors, then beacon.
Y_LINE = 2000000;

let output = 0;


// Preprocessing step. Fuck, thanks amogh. Talking abt algo's today wasn't a complete waste of time. It was.......helpful :D

for(let i = 0 ; i<a.length ; i++) {
    let sensor = a[i][0];
    let beacon = a[i][1];

    if((arr_d[JSON.stringify(sensor)]) < d(sensor , [sensor[0] , Y_LINE])) delete arr_d[JSON.stringify(sensor)];
    // if(sensor[1] < beacon[1] && beacon[1] < Y_LINE) delete arr_d[JSON.stringify(sensor)];
    // else if(sensor[1] > beacon[1] && beacon[1] > Y_LINE) delete arr_d[JSON.stringify(sensor)];
}

console.log(Object.keys(arr_d).length);
console.log(arr_d);

for(let i=min_x ; i<=max_x ; i++) {
    let is_beacon = true;
    
    for(const x in arr_d) {
        let temp_d = d([i , Y_LINE] , JSON.parse(x));
        // console.log(temp_d);
        let beacon_distance = arr_d[x];
        if(temp_d > beacon_distance) is_beacon = is_beacon && true;
        else {is_beacon = false ; break}
    }
    if(!is_beacon) output+=1;
}

console.error(output);
let b = new Set();

a.forEach(x => {
    if(x[1][1] == Y_LINE) b.add(JSON.stringify(x[1]));
});
console.log(b);
console.error(output - b.size);


// ------------------------------------------------------------------------------------------------------------------------------------
// Part 2
// ------------------------------------------------------------------------------------------------------------------------------------

