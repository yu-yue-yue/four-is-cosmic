function getCosmicSequence() {
    var num = document.getElementById('numberInput').value;
    // deal with edge case of not digits
    let isNum = /^\d+$/.test(num);
    if (!isNum) {
        document.getElementById('displayArea').innerText = "Digit input only";
        return 0;
    }
    
    var number = Number(num); 
    var arr = [number];
    while (number != 4) {
        number = convertToWords(number).length;
        arr.push(number); 
    }

    var displayArea = document.getElementById('displayArea');
    displayArea.innerText = outputCosmicSequence(arr);
    resizeBox(displayArea);
    
    return arr;
}

function outputCosmicSequence(arr) {
    var output = "" + arr[0];
    for (let i = 1; i < arr.length; i++) {
        output = output.concat(" is ", arr[i], ".\n", arr[i]);
    }
    output.concat(" is cosmic.");
    return output;
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
    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? "" + units[num % 10] : "");
    if (num < 1000) return units[Math.floor(num / 100)] + "Hundred" + (num % 100 !== 0 ? "" + convert(num % 100) : "");
    
    for (let i = 1; i < scales.length; i++) {
        let unitValue = 1000 ** i;
        if (num < unitValue * 1000) {
            return convert(Math.floor(num / unitValue)) + "" + scales[i] + (num % unitValue !== 0 ? "" + convert(num % unitValue) : "");
        }
    }
}

function resizeBox(element) {
    element.style.display = 'inline-block';
    element.style.height = 'auto'; // Set width to auto for resizing
    element.style.paddng = 10px;
    element.style.height = (element.scrollHeight + 20) + 'px'; // Add padding to width
}

