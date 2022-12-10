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