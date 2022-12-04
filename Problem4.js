a = document.getElementsByTagName("pre")[0].innerHTML.trim();

// Part 1
a.split("\n")
	.map(x => {
  let arr = x.split(",").map(y => y.split("-").map(z=>+z));
  if((arr[0][0] <= arr[1][0] && arr[0][1] >= arr[1][1]) ||
    	arr[0][0] >= arr[1][0] && arr[0][1] <= arr[1][1])
    return 1;
  else return 0;
	})
	.reduce((acc , x) => acc+x , 0);

// Part 2
a.split("\n")
	.map(x => {
  let arr = x.split(",").map(y => y.split("-").map(z=>+z));
  if(arr[0][0] > arr[1][1] || arr[0][1] < arr[1][0]) return 0;
  else return 1;
	})
	.reduce((acc , x) => acc+x , 0);