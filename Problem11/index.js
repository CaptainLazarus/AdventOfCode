var fs = require('fs');
const { callbackify } = require('util');

// File Input working
try {
    var data = fs.readFileSync('input.txt', 'utf8');  
} catch(e) {
    console.log('Error:', e.stack);
}

// Parsing inp
a = data.trim().split("\n\n").map(x => x.split("\n"));

// Parsing input properly
a = a.map(x => ([
    // monkey number
    +x[0].split(" ")[1].split("")[0],
    
    // worry order of items. take items in order
    x[1].trim().split(":")[1].split(", ").map(y => +y),
    
    // operation to be done -> add , subtract, multiply, etc
    x[2].trim().split(" ").slice(4),

    // Extra operation. Divide by 3 and round DOWN to nearest number.

    // test -> divisible by n
    +x[3].trim().split(" ")[3],

    //if true -> throw to monkey n
    +x[4].trim().split(" ")[5],
    
    // if false -> throw to monkey n
    +x[5].trim().split(" ")[5],
]))

function find_new_value(item , operation) {
    let temp = operation[1];
    if(temp == "old") temp = item;
    temp = +temp;
    switch(operation[0]) {
        case "+":
            return (item+ (+temp));
        case "-":
            return (item- (+temp));
        case "*":
            return (item* (+temp));
        case "/":
            return (item/ (+temp));
    }
}

let number_of_inspections = [];

for(let i=0 ; i<a.length ; i++) number_of_inspections.push(0);

let b = JSON.parse(JSON.stringify(a));

for(let round=0 ; round<20 ; round++){
    // in each round.
    a.forEach((monkey, n_monkey) => {
        while(monkey[1].length > 0){
            let item = +monkey[1][0];
            let new_worry_value = find_new_value(item , monkey[2]);
            new_worry_value = Math.floor(new_worry_value/3);
            if(new_worry_value % monkey[3] == 0) a[monkey[4]][1].push(new_worry_value);
            else a[monkey[5]][1].push(new_worry_value);
            number_of_inspections[n_monkey]++;
            monkey[1].shift();
        }
    });
}

// console.error(a);
// console.error(number_of_inspections)

let max = Math.max(...number_of_inspections);
let max_2 = Math.max(...number_of_inspections.filter(x => x!= max));

// console.log(max * max_2);

// -----------------------------------------------------------------------------------------------------------------------------------------------------
// Part2
// -----------------------------------------------------------------------------------------------------------------------------------------------------

// console.error(b , a);

function find_new_value_2(item , operation , LCM) {
    let temp = operation[1];
    if(temp == "old") temp = item;
    temp = BigInt(temp);
    switch(operation[0]) {
        case "+":
            return ((BigInt(item) + (temp)) % LCM);
        case "-":
            return ((BigInt(item) - (temp)) % LCM);
        case "*":
            return ((BigInt(item) * (temp)) % LCM);
        case "/":
            return ((BigInt(item) / (temp)) % LCM);
    }
}

let number_of_inspections_2 = [];

function __gcd(x, y) {
    if (x == 0)
        return y;
    return __gcd(y % x, x);
}

//recursive implementation
function LcmOfArray(arr, idx){
    if (idx == arr.length-1){
        return arr[idx];
    }
    let x = arr[idx];
    let y = LcmOfArray(arr, idx+1);
    return (x*y/__gcd(x,y));
}

let LCM = BigInt(LcmOfArray(b.map(x => x[3]) , 0));
console.log(LCM);

for(let i=0 ; i<b.length ; i++) number_of_inspections_2.push(0);

for(let round=0 ; round<10000 ; round++){
    // in each round.
    b.forEach((monkey, n_monkey) => {
        while(monkey[1].length > 0){
            let item = monkey[1][0];
            let new_worry_value = find_new_value_2(item , monkey[2] , LCM);
            if(new_worry_value % BigInt(monkey[3]) == 0) b[monkey[4]][1].push(new_worry_value);
            else b[monkey[5]][1].push(new_worry_value);
            number_of_inspections_2[n_monkey]++;
            monkey[1].shift();
        }
    });
    console.log(round);
}

// console.error(b);
console.error(number_of_inspections_2)

max = Math.max(...number_of_inspections_2);
max_2 = Math.max(...number_of_inspections_2.filter(x => x!= max));

console.log(max * max_2);