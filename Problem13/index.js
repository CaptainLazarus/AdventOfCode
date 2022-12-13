var fs = require('fs');
const { callbackify } = require('util');

// File Input working
try {
    var data = fs.readFileSync('input.txt', 'utf8');  
} catch(e) {
    console.log('Error:', e.stack);
}

a = data.trim().split("\n\n").map(x => (x.trim().split("\n").map(y => JSON.parse(y))));

// console.log(a);

// ---------------------------------------------------------------------------------------------------------------------
// Part 1
// ---------------------------------------------------------------------------------------------------------------------


const compare_nums = (a,b) => {
    return (a==b ? 0 : (a<b ? 1 : -1));
}

const compare_arr = (a , b) => {
    if(a.length == 0 && b.length == 0) return 0;
    else if(a.length == 0) return 1;
    else if(b.length == 0) return -1;
    else {
        let x = Array.isArray(a[0]);
        let y = Array.isArray(b[0]);
        if(!x && !y) {
            let cmp = compare_nums(a[0] , b[0]);
            return (cmp == 0 ? compare_arr(a.slice(1) , b.slice(1)) : cmp == 1 ? 1 : -1)
        }
        if(!x) a[0] = [a[0]];
        if(!y) b[0] = [b[0]];
        let cmp = compare_arr(a[0] , b[0]);
        return (cmp == 0 ? compare_arr(a.slice(1) , b.slice(1)) : cmp == 1 ? 1 : -1);
    }
}

let sum = a.reduce((acc , lr , i) => {
    let l = JSON.parse(JSON.stringify(lr[0]));
    let r = JSON.parse(JSON.stringify(lr[1]));
    let sum1 = acc + (compare_arr(l , r) > 0 ? i+1 : 0);
    // console.log(l , "\t" , r , "\t" , sum1);
    // console.log();
    return sum1;
} , 0);

console.log(sum);

// ---------------------------------------------------------------------------------------------------------------------
// Part 2
// ---------------------------------------------------------------------------------------------------------------------

const compare = (a , b) => {
    let a_temp = JSON.parse(JSON.stringify(a));
    let b_temp = JSON.parse(JSON.stringify(b));
    return compare_arr(a_temp , b_temp);
}

let b = a.reduce((acc , lr) => {
    if(compare(lr[0] , lr[1]) > 0){
        acc.push(lr[0]);
        acc.push(lr[1]);
    }
    else {
        acc.push(lr[0]);
        acc.push(lr[1]);
    }
    return acc;
} , []);

b.push([[2]]);
b.push([[6]]);
b.sort(compare).reverse();
// console.log(b);

let x1 = b.findIndex(x => 
    JSON.stringify(x) == JSON.stringify([[2]])
);

let x2 = b.findIndex(x => 
    JSON.stringify(x) == JSON.stringify([[6]])
);

console.error((x1+1)*(x2+1));