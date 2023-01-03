var fs = require('fs');
var Heap = require("collections/heap");

// File Input working
try {
    var data = fs.readFileSync('input.txt', 'utf8');  
} catch(e) {
    console.log('Error:', e.stack);
}

let start,end;

// Parsing inp
a = data.trim().split("\n").map((x , row) => x.split("").map((y , col) => {
    if (y == 'S') {
        start = [row , col];
        return 0;
    } else if(y == 'E'){
        end = [row , col];
        return 25;
    } else {
        return y.charCodeAt(0)-97;
    }
}));

b = JSON.parse(JSON.stringify(a));

b.forEach(x => console.error(x));
let n = b.length;
let m = b[0].length
console.error(n , m);

function* nbs(i , j) {
    for(const [dx , dy] of [ [1 , 0] , [-1 , 0] , [0 , 1] , [0 , -1] ]){
        let x = i + dx;
        let y = j + dy;

        if(!(((x < n) && (x >= 0)) && ((y < m) && (y >= 0)))) continue;
        if(b[x][y] <= b[i][j] + 1) yield [x,y];
    }
}

const visited = [...Array(n)].map(_ => [...Array(m)].map(_ => false));
console.error(visited);


let heap = new Heap([[0 , start[0] , start[1]]] , (a,b) => {return a[0] == b[0]} , (a,b) => {return b[0]-a[0] });
console.log(heap);

while(true) {
    let [steps , i , j] = heap.pop();
    if(visited[i][j]) continue;
    visited[i][j] = true;

    if(JSON.stringify([i,j]) == JSON.stringify(end)){
        console.log(steps);
        break;
    }

    const generator = nbs(i,j);

    for(const xx of generator){
        heap.push([steps+1 , xx[0] , xx[1]]);
        // console.log(xx);
    }
}