/**
 * This file is analogous to RomanNumerals.py but that it is in JS
 */

const NUMERALS = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
};

const swap = obj => Object.fromEntries(Object.entries(obj).map(x => x.reverse()));

const NUMBERS = swap(NUMERALS);

function numToRoman(num) {
    let n = num;
    console.assert(typeof(n) === "number");
    console.assert(n > 0, "Minimum Roman Numeral is 1");
    console.assert(n < 4000, "Maximum Roman Numeral is 3999");

    let basis = Object.values(NUMERALS);
    basis.sort((a,b) => a-b > 0).reverse();
    let r = "";

    for(let b = 0; b < basis.length-1; b++) {
        while(n - basis[b] >= 0) {
            n -= basis[b];
            r += NUMBERS[basis[b]];
        }

        if(n === 0) {
            break;
        } else if (n - basis[b] < 0) {
            if(b%2 === 0 && n - basis[b] + basis[b+2] >= 0) {
                n -= basis[b] - basis[b+2];
                r += NUMBERS[basis[b+2]] + NUMBERS[basis[b]];
            } else if (b%2 === 1 && n - basis[b] + basis[b+1] >= 0) {
                n -= basis[b] - basis[b+1];
                r += NUMBERS[basis[b+1]] + NUMBERS[basis[b]];
            }
        }
    }

    while(n > 0) {
        n--;
        r += "I";
    }

    return r;
}

function romanToNum(r) {
    console.assert(typeof(r) === "string");
    console.assert(r.match(/(I|V|X|L|C|D|M)+/g)[0] === r);
    console.assert(r.match(/(I{4,}|V{4,}|X{4,}|L{4,}|C{4,}|D{4,}|M{4,})/g) === null);

    let nums = r.split('');
    let sum = 0;

    for(let i = 0; i < nums.length-1; i++) {
        let curr = nums[i];
        if(nums[i+1] > curr)
            sum -= curr;
        else
            sum += curr;
    }

    return sum + nums[nums.length-1];
}

export {numToRoman, romanToNum};
