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

strategy = {
    'X': {
        'A': 'Z',
        'B': 'X',
        'C': 'Y',
    },
    'Y': {
        'A': 'X',
        'B': 'Y',
        'C': 'Z'
    },
    'Z': {
        'A': 'Y',
        'B': 'Z',
        'C': 'X'
    }
}

with open('input.txt') as f:
    rounds = f.read().split('\n')
    result = 0
    for round in rounds:
        opp = round[0]
        me = strategy[round[2]][opp]
        result += rules[me][opp] + bonus[me]
print(result)
