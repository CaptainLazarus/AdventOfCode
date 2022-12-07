var fs = require('fs');
var Folder = require('./Folder');
var Directory = require('./Directory');

// File Input working
try {  
    var data = fs.readFileSync('input.txt', 'utf8');
    // console.log(data.toString());    
} catch(e) {
    console.log('Error:', e.stack);
}
a = data.trim().split("\n").map(line => line.split(" "));

// Initialise
let root_node = new Folder("/" , null);
let root_directory = new Directory(root_node);
// Inserting into directory

const parseInput = (root_directory , a) => {
    if(a.length == 0) return root_directory;
    else {
        command = a[0];
        command[0] == "$" ? root_directory.execute_command(command) : root_directory.insert_into_tree(command);
        // console.log(a.length);
        parseInput(root_directory , a.slice(1));
    }
}
parseInput(root_directory , a);

// Calculating size
const calculate_size = (root) => {
    if(root.hasOwnProperty('size')) return (root.size);
    return root.size = root.children.reduce((acc , x) => (acc + calculate_size(x)) , 0);
}
calculate_size(root_directory.root);
console.log(root_directory);

// --------------------------------------------------------------------------------------------------------------------
// Part 1
const calculate_sum = (root) => {
    if(root.hasOwnProperty('children'))
        if(root.size <= 100000) return (root.size + root.children.reduce((acc , x) => acc + calculate_sum(x) , 0));
        else return root.children.reduce((acc , x) => acc + calculate_sum(x) , 0);
    return 0;
}
let sum = calculate_sum(root_directory.root);
console.log(sum);

// --------------------------------------------------------------------------------------------------------------------
// Part 2
const calculate_part_2 = (root , possible_directory_sizes , space_we_need) => {
    if(root.hasOwnProperty('children'))
        if((root.size - space_we_need) >= 0) return (possible_directory_sizes.concat([root.size])).concat(root.children.reduce((acc , x) => acc.concat(calculate_part_2(x , possible_directory_sizes , space_we_need)) , []));
        else return root.children.reduce((acc , x) => acc.concat(calculate_part_2(x , possible_directory_sizes , space_we_need)) , []);
    return [];
}

let space_we_have = 70000000 - root_directory.root.size;
let space_we_need = 30000000 - space_we_have;

let possible_sizes = calculate_part_2(root_directory.root , [] , space_we_need);

console.log(Math.min(...possible_sizes));