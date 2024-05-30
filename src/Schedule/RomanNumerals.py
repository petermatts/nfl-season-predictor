import re
from copy import copy

NUMERALS = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
}

NUMBERS = dict((v,k) for k,v in NUMERALS.items())

def numToRoman(num: int):
    n = copy(num)
    assert type(n) == int
    if num <= 0: raise ValueError("Minimum Roman Numeral is 1")
    if num >= 4000: raise ValueError("Maximum Roman Numeral is 3999")

    basis = list(NUMERALS.values())
    basis.sort(reverse=True)
    r = ""

    for b in range(len(basis)-1):
        while n - basis[b] >= 0:
            n -= basis[b]
            r += NUMBERS[basis[b]]

        if n == 0:
            break
        elif n - basis[b] < 0:
            if b%2 == 0 and n - basis[b] + basis[b+2] >= 0:
                n -= basis[b] - basis[b+2]
                r += NUMBERS[basis[b+2]] + NUMBERS[basis[b]]
            elif b%2 == 1 and n - basis[b] + basis[b+1] >= 0:
                n -= basis[b] - basis[b+1]
                r += NUMBERS[basis[b+1]] + NUMBERS[basis[b]]

    while n > 0:
        n -= 1
        r += 'I'

    return r

def romanToNum(r: str):
    assert type(r) == str
    match = re.match(r"(I|V|X|L|C|D|M)*", r)
    assert match.string == r
    find = re.findall(r"(I{4,}|V{4,}|X{4,}|L{4,}|C{4,}|D{4,}|M{4,})", r)
    assert len(find) == 0

    nums = list(map(lambda x: NUMERALS[x], [*r]))
    sum = 0

    for i in range(len(nums)-1):
        curr = nums[i]
        if nums[i+1] > curr:
            sum -= curr
        else:
            sum += curr

    return sum + nums[-1]


if __name__ == '__main__':
    # print(romanToNum('MMXXIV'))
    for i in range(1, 1001):
        print(numToRoman(i))
