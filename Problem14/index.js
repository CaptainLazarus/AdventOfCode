var fs = require('fs');
const { maxHeaderSize } = require('http');
const { callbackify } = require('util');

// File Input working
try {
    var data = fs.readFileSync('input.txt', 'utf8');  
} catch(e) {
    console.log('Error:', e.stack);
}

a = data.trim().split("\n").map(x => x.split("->").map(y => y.split(",").map(z => +z)));

// -------------------------------------------------------------------------------------------------
// Part 1
// -------------------------------------------------------------------------------------------------
let set = new Set();
let max_height = 0;

a.forEach(path => {
    for(let i=0 ; i<path.length-1 ; i++){
        let start = JSON.parse(JSON.stringify(path[i]));
        let end = JSON.parse(JSON.stringify(path[i+1]));
        max_height = start[1] > max_height ? start[1] : max_height;
        max_height = end[1] > max_height ? end[1] : max_height;

        // if height equal, is straight line
        if(start[1] == end[1]) {
            for (let i= Math.min(start[0] , end[0]); i <= Math.max(start[0] , end[0]); i++) {
                set.add(JSON.stringify([i , start[1]]));
            }
        }
        else if(start[0] == end[0]) {
            for (let i= Math.min(start[1] , end[1]); i <= Math.max(start[1] , end[1]); i++) {
                set.add(JSON.stringify([start[0] , i]));
            }
        }
    }
});

let initial_length = set.size;

function add_to_set(x , y , set) {
    while( !set.has(JSON.stringify([x , y+1])) ) {
        y += 1;
        if(y > max_height){
            break;
        }
    }
    if(y <= max_height) {
        let left = JSON.stringify([x-1 , y+1]);
        let right = JSON.stringify([x+1 , y+1]);
        let curr = JSON.stringify([x , y]);

        let on_left = set.has(left);
        let on_right = set.has(right);

        if(!on_left) return add_to_set(x-1 , y+1 , set);
        else if(!on_right) return add_to_set(x+1 , y+1 , set);
        else if(on_left && on_right) {
            // console.error(curr);
            set.add(curr);
            return set.size;
        }
        else return 0;
    }
    return 0;
}

while(true){
    let x = 500;
    let y = 0;
    if(add_to_set(x , y , set) == 0) {
        break;
    }
}

console.log(set.size - initial_length);

// -------------------------------------------------------------------------------------------------
// Part 2
// -------------------------------------------------------------------------------------------------
let set_2 = new Set()

let max_height_2 = 0;

// adding to set_2
a.forEach(path => {
    for(let i=0 ; i<path.length-1 ; i++){
        let start = JSON.parse(JSON.stringify(path[i]));
        let end = JSON.parse(JSON.stringify(path[i+1]));
        max_height_2 = start[1] > max_height_2 ? start[1] : max_height_2;
        max_height_2 = end[1] > max_height_2 ? end[1] : max_height_2;

        // if height equal, is straight line
        if(start[1] == end[1]) {
            for (let i= Math.min(start[0] , end[0]); i <= Math.max(start[0] , end[0]); i++) {
                set_2.add(JSON.stringify([i , start[1]]));
            }
        }
        else if(start[0] == end[0]) {
            for (let i= Math.min(start[1] , end[1]); i <= Math.max(start[1] , end[1]); i++) {
                set_2.add(JSON.stringify([start[0] , i]));
            }
        }
    }
});

max_height_2 = max_height_2 + 2;
for(let i = -15000 ; i<15000 ; i++) set_2.add(JSON.stringify([i , max_height_2]));

let initial_size_2 = set_2.size;

function add_to_set_2(x , y , set_2) {
    while( !set_2.has(JSON.stringify([x , y+1])) ) {
        y += 1;
    }
    let left = JSON.stringify([x-1 , y+1]);
    let right = JSON.stringify([x+1 , y+1]);
    let curr = JSON.stringify([x , y]);

    let on_left = set_2.has(left);
    let on_right = set_2.has(right);

    if(!on_left) return add_to_set_2(x-1 , y+1 , set_2);
    else if(!on_right) return add_to_set_2(x+1 , y+1 , set_2);
    else if(on_left && on_right) {
        set_2.add(curr);
        return set_2.size;
    }
}

while(!set_2.has(JSON.stringify([500 , 0]))) {
    let x = 500;
    y = 0;
    add_to_set_2(x , y , set_2);
}

console.error(set_2.size - initial_size_2);