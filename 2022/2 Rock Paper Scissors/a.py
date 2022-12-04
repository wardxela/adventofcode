lost = 0
draw = 3
won = 6

rules = {
    'X': {
        'A': draw,
        'B': lost,
        'C': won,
    },
    'Y': {
        'A': won,
        'B': draw,
        'C': lost,
    },
    'Z': {
        'A': lost,
        'B': won,
        'C': draw,
    }
}

bonus = {
    'X': 1,
    'Y': 2,
    'Z': 3
}

with open('input.txt') as f:
    rounds = f.read().split('\n')
    result = 0
    for round in rounds:
        opp = round[0]
        me = round[2]
        result += rules[me][opp] + bonus[me]
print(result)
