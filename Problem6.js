a = document.getElementsByTagName("pre")[0].innerHTML.trim();

a = a.split("\n").join();

index = 0;
for(let i=0 ; i < a.length-13 ; i++){
  buffer = [...new Set(a.substring(i , i+14))];
    console.log(buffer);
  if(buffer.length == 14){
    index = i+14
    break;
  } 
}
index;