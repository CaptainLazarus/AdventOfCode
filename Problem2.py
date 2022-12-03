# AOC 2022 Day 2
# P1
print(sum([{'X':1, 'Y':2, 'Z':3}[i[2]]+(0 if i[:3] in ('A Z', 'B X', 'C Y') else 3 if i[:3] in ('A X', 'B Y', 'C Z') else 6) for i in open('input.txt','r').readlines()]))

# P2
print(sum([{'X':0, 'Y':3, 'Z':6}[i[2]]+{'A':1, 'B':2,'C':3}[{'A':'C', 'B':'A', 'C':'B'}[i[0]] if i[2] == 'X' else i[0] if i[2] == 'Y' else {'A':'B', 'B':'C', 'C':'A'}[i[0]]] for i in open('input.txt','r').readlines()]))