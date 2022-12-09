var fs = require('fs');

// File Input working
try {
    var data = fs.readFileSync('input.txt', 'utf8');
    // console.log(data.toString());    
} catch(e) {
    console.log('Error:', e.stack);
}
a = data.trim().split("\n").map(x => x.split("").map(y => +y));

// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// Part 1 (Precomp for both is diff. Have to keep seperate)

// Converted input into matrix
let left = JSON.parse(JSON.stringify(a));
let right = JSON.parse(JSON.stringify(a));
let up = JSON.parse(JSON.stringify(a));
let down = JSON.parse(JSON.stringify(a));

// left precompute => 0 > 1 > 2 > 3 ...............
for(let row=0 ; row<a.length ; row++){
    // let temp = [a[row][0]];
    for(let col = 1; col < a[row].length ; col++){
        left[row][col] = (left[row][col] > left[row][col-1] ? left[row][col] : left[row][col-1]);
    }
}

// right precompute => n-1 > n-2 > n-3 ..................
for(let row=0 ; row<a.length ; row++){
    for(let col = a[row].length-2 ; col >= 0 ; col--){
        right[row][col] = right[row][col] > right[row][col+1] ? right[row][col] : right[row][col+1];
    }
}

// // up_precompute
for(let col=0 ; col<a[0].length ; col++){
    for(let row = 1 ; row < a.length ; row++){
        up[row][col] = (up[row][col] > up[row-1][col] ? up[row][col] : up[row-1][col]);
    }
}

// down precompute
for(let col=0 ; col<a.length ; col++){
    for(let row = a.length-2 ; row >= 0 ; row--){
        down[row][col] = down[row][col] > down[row+1][col] ? down[row][col] : down[row+1][col];
    }
}

let sum = 0;
let n = a.length;
sum = n + 2*(n-1) + n-2;

for(let row = 1 ; row < a.length-1 ; row ++){
    for(let col = 1 ; col < a[0].length-1 ; col++){
        let val = a[row][col];
        if( val > up[row-1][col] || 
            val > down[row+1][col] ||
            val > right[row][col+1] ||
            val > left[row][col-1]
        )
        sum += 1;
    }
}

console.log("Sum: "+ sum);

// -------------------------------------------------------------------------------------------------------
// Part 2
// Converted input into matrix
// left = JSON.parse(JSON.stringify(a));
// right = JSON.parse(JSON.stringify(a));
// up = JSON.parse(JSON.stringify(a));
// down = JSON.parse(JSON.stringify(a));

// // left precompute => 0 > 1 > 2 > 3 ...............
// for(let row=0 ; row<a.length ; row++){
//     left[row][0] = 0;
//     for(let col = 1; col < a[row].length ; col++){
//         left[row][col] = (a[row][col] > a[row][col-1] ? left[row][col-1]+1 : 1);
//     }
// }

// // // right precompute => n-1 > n-2 > n-3 ..................
// for(let row=0 ; row<a.length ; row++){
//     right[row][a[row].length-1] = 0;
//     for(let col = a[row].length-2 ; col >= 0 ; col--){
//         right[row][col] = (a[row][col] > a[row][col+1] ? right[row][col+1] + 1 : 1);
//     }
// }

// // up_precompute
// for(let col=0 ; col<a[0].length ; col++){
//     up[0][col] = 0;
//     for(let row = 1 ; row < a.length ; row++){
//         up[row][col] = (a[row][col] > a[row-1][col] ? up[row-1][col]+1 : 1);
//     }
// }

// // down precompute
// for(let col=0 ; col<a.length ; col++){
//     down[a.length-1][col] = 0;
//     for(let row = a.length-2 ; row >= 0 ; row--){
//         down[row][col] = (a[row][col] > a[row+1][col] ? down[row+1][col] + 1 : 1);
//     }
// }

// console.error(a , left , right , up , down);

let ans = 0;
let mul_arr = JSON.parse(JSON.stringify(a));

const find_n_trees = (arr , max_row , max_col , direction) => {
    let output = 1;
    if(max_row == 0 || max_col == 0 || max_row == a.length-1 || max_col == a[0].length-1) return 0;
    switch (direction) {
        case "left":
            for(let col = max_col-1 ; col > 0 ; col--){
                if(arr[max_row][max_col] > arr[max_row][col]) output+=1 ;
                else return output;
            }
            break;
        case "right":
            for(let col = max_col+1 ; col < a[0].length-1 ; col++){
                if(arr[max_row][max_col] > arr[max_row][col]) output+=1 ;
                else return output;
            }
            break;
        case "up":
            for(let row = max_row - 1 ; row > 0 ; row--){
                if(arr[max_row][max_col] > arr[row][max_col]) output+=1 ;
                else return output;
            }
            break;
        case "down":
            for(let row = max_row + 1 ; row < a.length-1 ; row++){
                if(arr[max_row][max_col] > arr[row][max_col]) output+=1 ;
                else return output;
            }
            break;
    }
    return output;
}

for(let row = 0 ; row < a.length ; row ++){
    for(let col = 0 ; col < a[0].length ; col++){
        let n_trees_left = find_n_trees(a , row , col , "left");
        let n_trees_right = find_n_trees(a , row , col , "right");
        let n_trees_up = find_n_trees(a , row , col , "up");
        let n_trees_down = find_n_trees(a , row , col , "down")
        let mul =  n_trees_left * n_trees_right * n_trees_up * n_trees_down ;
        console.error(n_trees_left , n_trees_right , n_trees_up , n_trees_down);
        if(mul > ans) ans = mul;
        mul_arr[row][col] = mul;
    }
    console.log("\n");
}

console.error(a , mul_arr);
console.log(ans);