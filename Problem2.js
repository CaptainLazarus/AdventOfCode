let a = document.getElementsByTagName("pre")[0].innerHTML;

// Part 1
a.trim()
    .split("\n")
    .map(x => x.split(" "))
    .map(a => {
        let score = a[1] == "X" ? 1 : a[1] == "Y" ? 2 : 3;
        if( 
            (a[0] == "A" && a[1] == "X") || 
        (a[0] == "B" && a[1] == "Y") || 
        (a[0] == "C" && a[1] == "Z")) 
        {score+=3;}
        
        else if(
        (a[0] == "A" && a[1] == "Y") || 
        (a[0] == "B" && a[1] == "Z") || 
        (a[0] == "C" && a[1] == "X")) 
        {score+=6;}
    return score;
    })
    .reduce((acc , x) => acc+x , 0);
  

// Part 2
a.trim()
    .split("\n")
    .map(x => x.split(" "))
    .map(a => {
        let score = a[1] == "X" ? 0 : a[1] == "Y" ? 3 : 6;
        if(a[1] == "X"){
            score = score + (a[0] == "A" ? 3 : a[0] == "B" ? 1 : 2); 
        }
        if(a[1] == "Y"){
            score = score + (a[0] == "A" ? 1 : a[0] == "B" ? 2 : 3); 
        }
        if(a[1] == "Z"){
            score = score + (a[0] == "A" ? 2 : a[0] == "B" ? 3 : 1); 
        }
        return score;
    })
    .reduce((acc , x) => acc+x , 0);