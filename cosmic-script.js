function getCosmicSequence() {
    var num = document.getElementById('numberInput').value;
    // deal with edge case of not digits
    let isNum = /^\d+$/.test(num);
    if (!isNum) {
        document.getElementById('displayArea').innerText = "Please only input digits!";
        return "Please only input digits!";
    }
    
    var number = BigInt(num); 
    var arr = [number];
    while (number != 4n) {
        number = BigInt(convertToWords(number).length);
        arr.push(number); 
    }
    document.getElementById('displayArea').innerText = number;
    console.log(arr);
    return arr;
}


const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const scales = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion"];

function convertToWords(num) {
    if (num === 0) return "Zero";
    return convert(num).trim();
}

function convert(num) {
    if (num < 10n) return units[num];
    if (num < 20n) return teens[num - 10n];
    if (num < 100n) return tens[Math.floor(num / 10n)] + (num % 10n !== 0n ? "" + units[num % 10n] : "");
    if (num < 1000n) return units[Math.floor(num / 100n)] + "Hundred" + (num % 100n !== 0n ? "" + convert(num % 100n) : "");
    
    for (let i = 1n; i < scales.length; i++) {
        let unitValue = 1000n ** i;
        if (num < unitValue * 1000n) {
            return convert(Math.floor(num / unitValue)) + "" + scales[i] + (num % unitValue !== 0n ? "" + convert(num % unitValue) : "");
        }
    }
}

