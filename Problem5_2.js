// Part 2 only has a difference in how we push and pop (with a buffer instead of directly). I've marked the code below. Check if required.

// Part 2-1 Taking Input
a = document.getElementsByTagName("pre")[0].innerHTML.trim();

a = a.split("\n\n").map(x => x.split("\n"));
initial_state = a[0].slice(0, a[0].length - 1);
steps = a[1];
initial_state = initial_state.map(x => x.trim().split("").filter((x, i) => (i - 1) % 4 == 0));
stacks = [];
for (let i = 0; i < 9; i++) {
    stacks.push([]);
}

console.log(stacks);

for (let i = initial_state.length - 1; i >= 0; i--) {
    for (let j = 0; j < 9; j++) {
        if (initial_state[i][j] != " ") stacks[j].push(initial_state[i][j]);
    }
}

// Part 2-2 - Actually solving the bloody thing
steps = steps.map(x => x.split(" ").filter((x, i) => (i - 1) % 2 == 0));
for (let i = 0; i < steps.length; i++) {
    [n, start, end] = steps[i];
    n = n < stacks[start - 1].length ? n : stacks[start - 1].length;
    buffer = []
    // Part 2 changes here. How we push what we pop. Use buffer to stash then pop buffer and push?

    //----------------------------------------------------------------------------------------------------------------------------------------------
    for (let j = 0; j < n; j++) {
        let val = stacks[start - 1].pop();
        buffer.push(val);
    }

    for (let j = 0; j < n; j++) {
        let val = buffer.pop();
        stacks[end - 1].push(val);
    }
    //----------------------------------------------------------------------------------------------------------------------------------------------
}

output = ""
for (let i = 0; i < 9; i++) {
    output = output + stacks[i][stacks[i].length - 1];
}

output