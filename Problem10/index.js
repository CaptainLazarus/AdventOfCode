var fs = require('fs');
const { callbackify } = require('util');

// File Input working
try {
    var data = fs.readFileSync('input.txt', 'utf8');  
} catch(e) {
    console.log('Error:', e.stack);
}

// Parsing inp
a = data.trim().split("\n").map(x => x.split(" "));

let b = a.reduce(([x , c , s , v] , n) => {
    if(c == 20 || (c-20) % 40 == 0){
        if(!v.has(c)){
            s+= x*c;
            v.add(c);
        }
    }
    else if((c+1) == 20 || ((c+1)-20) % 40 == 0){
        if(!v.has(c+1)){
            s+= x*(c+1);
            v.add(c+1);
        }
    }
    if(n[0] == "noop"){
        return [x , c+1 , s , v];
    }
    else {
        if((c+2) == 20 || ((c+2)-20) % 40 == 0){
            if(!v.has(c+2)){
                s+= x*(c+2);
                v.add(c+2);
            }
        }
        return [x+ (+n[1]), c+2 , s , v]
    }

} , [1 , 0 , 0 , new Set()])

console.error(b);

// ----------------------------------------------------------------
// Part 2
// ----------------------------------------------------------------

let monitor = [];
for(let i=0 ; i < 6 ; i++){
    monitor.push([]);
    for(let j=0 ; j<40 ; j++)
        monitor[i].push(".");
}

const display = (monitor) => {
    for(let i=0 ; i < 6 ; i++){
        for(let j=0 ; j<40 ; j++)
        process.stdout.write(monitor[i][j])
        console.log();
    }
    console.log("\n")
}

display(monitor);

// looping through instructions
let index = 0;
// adding cycles to a
a.map(x => x[0] == "noop" ? x.push(0) : x.push(2));
// console.error(a);


let x = 1;
for(let row = 0 ; row < 6 ; row++){
    // looping each cycle
    let beam = 0;
    for(let beam = 0 ; beam<40 ; beam++){
        // draw pixel
        if(beam == x
            || beam == x-1
            || beam == x+1
        ){
            monitor[row][beam] = "#";
        }

        // after drawing pixel, calc new value of x for each cycle
        if(a[index].at(-1) == 0) {
            let instr = a[index][0];
            if(instr == "noop") index++;
            else {
                x = x + (+a[index][1]);
                index++;
            }
        }
        else {
            a[index][2] = a[index][2] - 1;
            if(a[index][2] == 0){
                x = x + (+a[index][1]); 
                index++;
            }
        }
    }
}

display(monitor);