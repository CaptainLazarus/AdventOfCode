const assert = require('assert');
var fs = require('fs');
const { maxHeaderSize } = require('http');
const { callbackify } = require('util');

// File Input working
function getInput(fileName) {
    try {
        var data = fs.readFileSync(fileName, 'utf8');
        return data;
    } catch(e) {
        console.log('Error:', e.stack);
    }
}

// Parsing working fine
function parseInput(s) {
    return s.trim().split("\n").map(x => x.split(":").map(x => x.trim().split(" ").map(y => y.split(",")[0]))).map(x => [[x[0].at(-2) , x[0].at(-1)] , [x[1].at(-2) , x[1].at(-1)]]).map(y => y.map(z => z.map(xx => +xx.split("=")[1])))
}

// ------------------------------------------------------------------------------------------------------------------------------------
// Part 1
// ------------------------------------------------------------------------------------------------------------------------------------

// Compare func
function c(a,  b) {
    return a[0][0] - b[0][0] || a[0][1] - b[0][1];
}

// DIstance func. takes points only
function d(a , b){
    let x =  Math.abs(a[0] - b[0]);
    let y = Math.abs(a[1] - b[1]);
    // console.error(x , y , x+y);
    return (x + y);
}

// basically draw circles and find out where they don't pass through. Fuck do I that????
// y = 10 for test. Find distance of beacons from sensors. Put in arr_d

// DIstance func
function extract_imp_params(a) {
    let arr_d = {}
    let max_x = Number.MIN_SAFE_INTEGER;
    let min_x = Number.MAX_SAFE_INTEGER;
    for(let i=0 ; i<a.length ; i++) {
        max_x = Math.max(max_x , a[i][0][0] , a[i][1][0]);
        min_x = Math.min(min_x , a[i][0][0] , a[i][1][0]);

        arr_d[JSON.stringify(a[i][0])] = (d(a[i][0] , a[i][1]))
    };

    min_x = min_x - Math.max(...Object.values(arr_d));
    max_x = max_x + Math.max(...Object.values(arr_d));
    return [arr_d , min_x , max_x];
}

function preprocess_distance_array(a , arr_d , Y_LINE) {
    // Preprocessing step. Fuck, thanks amogh. Talking abt algo's today wasn't a complete waste of time. It was.......helpful :D

    for(let i = 0 ; i<a.length ; i++) {
        let sensor = a[i][0];
        let beacon = a[i][1];

        if((arr_d[JSON.stringify(sensor)]) < d(sensor , [sensor[0] , Y_LINE])) delete arr_d[JSON.stringify(sensor)];
    }
}

function calculate_number_of_beacons(a ,  arr_d , Y_LINE , min_x , max_x) {
    let output = 0;
    let loading = 0;
    for(let i=min_x ; i<=max_x ; i++) {
        let is_beacon = true;
        
        for(const x in arr_d) {
            let temp_d = d([i , Y_LINE] , JSON.parse(x));
            let beacon_distance = arr_d[x];
            if(temp_d > beacon_distance) is_beacon = is_beacon && true;
            else {is_beacon = false ; break}
        }
        if(!is_beacon) output+=1;
    }
    return output;
}

function solve_part_1() {
    let Y_LINE = 10;
    let FILENAME = 'test_input.txt';

    let a = getInput(FILENAME);
    a = parseInput(a);
    a.sort(c);
    let [arr_d , min_x , max_x] = extract_imp_params(a);
    preprocess_distance_array(a , arr_d , Y_LINE);
    let output = calculate_number_of_beacons(a , arr_d , Y_LINE , min_x , max_x);

    // Remove already existing beacons from array
    let b = new Set();
    a.forEach(x => {
        if(x[1][1] == Y_LINE) b.add(JSON.stringify(x[1]));
    });
    return (output - b.size);
}

// console.log(solve_part_1());
// ------------------------------------------------------------------------------------------------------------------------------------
// Part 2
// ------------------------------------------------------------------------------------------------------------------------------------

function generate_perimeter(sensor , arr_d , MAX) {
    let perimeter = new Set();
    let x = sensor[0];
    let y = sensor[1];
    let d = arr_d[JSON.stringify(sensor)];
    // do_jaadoo. Fucking kill me
    d = d+1;

    // go top -> right
    for (let i = 0 , j=d; i <= d; i++ , j--) {
        if((x+i) >=0 && (x+i) <= MAX && (y+j)<=MAX && (y+j)>=0) perimeter.add(JSON.stringify([x+i , y+j]));
    }

    // go top -> left
    for (let i = 0 , j=d; i >= -d; i-- , j--) {
        if((x+i) >=0 && (x+i) <= MAX && (y+j)<=MAX && (y+j)>=0) perimeter.add(JSON.stringify([x+i , y+j]));
    }

    // go bot -> left
    for (let i = 0 , j=-d; i >= -d; i-- , j++) {
        if((x+i) >=0 && (x+i) <= MAX && (y+j)<=MAX && (y+j)>=0) perimeter.add(JSON.stringify([x+i , y+j]));
    }

    // go bot -> right
    for (let i = 0 , j=-d; i <= -d; i++ , j++) {
        if((x+i) >=0 && (x+i) <= MAX && (y+j)<=MAX && (y+j)>=0) perimeter.add(JSON.stringify([x+i , y+j]));
    }

    return perimeter;
}


function is_beacon(arr_d , point) {
    let is_beacon = true;
    
    for(const x in arr_d) {
        let temp_d = d(JSON.parse(x) , point);
        let beacon_distance = arr_d[x];
        if(temp_d <= beacon_distance) return false;
    }
    return true;
}

function solve_part_2() {
    
    // let FILENAME = 'test_input.txt';
    // let MAX = 20;
    let FILENAME = 'input.txt';
    let MAX = 4000000;

    let a = getInput(FILENAME);
    a = parseInput(a);
    a.sort(c);
    let [arr_d , ,] = extract_imp_params(a);
    
    // Gotten perimeter for all points. Now check these points for whether a beacon exists among them.
    let output = [];
    for (let i = 0; i<a.length ; i++) {
        let sensor = a[i][0];
        // console.error(sensor);
        let perimeter = generate_perimeter(sensor , arr_d , MAX);
        
        perimeter = [...perimeter].flat().map(x => JSON.parse(x));
        console.error(perimeter);
        for(let i=0 ; i<perimeter.length ; i++){
            let point = perimeter[i];
            let x = point[0];
            let y = point[1];
            
            let is_a_beacon = is_beacon(arr_d , point);
            if(is_a_beacon) {
                if(x >=0 && x <= MAX && y<=MAX && y>=0) {
                    output.push(perimeter[i]);
                }
            }
        }
    }
    output = [...new Set(output.map(x => JSON.stringify(x)))].map(y => JSON.parse(y)).flat();
    console.error(output);
    return ((output[0]*4000000) + output[1]);
}

console.error(solve_part_2());