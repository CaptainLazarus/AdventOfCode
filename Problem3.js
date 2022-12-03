a = document.getElementsByTagName("pre")[0].innerHTML.trim();

// Part 1
a
    .split("\n")
    .map(x => {
        let arr = [x.substr(0, (x.length) / 2), x.substr((x.length) / 2)];
        arr = new Set(arr[0].split("").filter(x => arr[1].split("").includes(x)));
        arr = [...arr]

        return arr.reduce((acc, x) => {
            let val = (x === x.toUpperCase()) ? (x.charCodeAt(0) - 64) + 26 : (x.charCodeAt(0) - 96);
            return acc + val;
        }, 0);
    })
    .reduce((acc, x) => acc + x, 0)

// Part 2
a
    .split("\n")
    .reduce((acc, x, i, arr) => {
        if (i % 3 === 0) {
            acc.push([arr[i], arr[i + 1], arr[i + 2]]);
        }
        return acc;
    }, [])
    .map(arr => {
        let diff = new Set(arr[0].split("").filter(x => arr[1].split("").includes(x)));
        diff = new Set([...diff].filter(x => arr[2].split("").includes(x)));
        return [...diff].reduce((acc, x) => {
            let val = (x === x.toUpperCase()) ? (x.charCodeAt(0) - 64) + 26 : (x.charCodeAt(0) - 96);
            return acc + val;
        }, 0);
    })
    .reduce((acc, x) => acc + x, 0)
