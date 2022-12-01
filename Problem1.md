# One liners for the first problem

1. JS
```
document.getElementsByTagName("pre")[0].innerHTML
.split("\n\n")
.map(ns => 
	ns
	.split("\n")
 	.map(x => +x)
	.reduce((acc , x) => acc+ (+x) , 0))
.sort((a,b) => b-a)
.slice(0,3)
.reduce((acc , x) => acc+x , 0)
```
Author : CaptainLazarus

---

2. Ruby
```
 $<.read.split("\n\n").map { |x| x.split("\n").map(&:to_i).sum }.sort.reverse.take(3).sum
```

Author : Utkarsh Kukreti

---

3. Perl
```
put 'input'.IO.split("\n\n").map(*.words.sum).sort(-*)[0, ^3]».sum
```

Author : Stolen from Reddit

---

4. Python (reading from file)
```
f = sorted(eval(open(0).read().
    replace('\n\n', ',').replace('\n', '+')))

print(f[-1], sum(f[-3:]))
```

Author : No idea

---

5. Google sheet (I had no idea this existed)
```
=SUM(INDEX(LARGE(BYROW(SPLIT(FLATTEN(SPLIT(JOIN(,IF(A:A,A:A&"❆","∞")),"∞")),"❆"),LAMBDA(r,SUM(r))),{1;2;3})))
```

Author : No idea

---
