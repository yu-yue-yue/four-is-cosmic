document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(tabLink => {
        tabLink.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked tab and the corresponding content
            tabLink.classList.add('active');
            document.getElementById(tabLink.getAttribute('data-tab')).classList.add('active');
        });
    });
});

function getEnglishCosmicSequence() {
    var num = document.getElementById('numberInput').value;
    // deal with edge case of not digits
    let isNum = /^\d+$/.test(num);
    if (!isNum) {
        document.getElementById('english-display').innerText = "Digit input only";
        return 0;
    }
    
    var number = Number(num); 
    var arr = [number];
    while (number != 4) {
        number = convertToEnglishWords(number).length;
        arr.push(number); 
    }

    var displayArea = document.getElementById('english-display');
    displayArea.innerText = outputCosmicSequence(arr);
    resizeBox(displayArea);
    
    return arr;
}

function getFrenchCosmicSequence() {
    var num = document.getElementById('numberInput').value;
    // deal with edge case of not digits
    let isNum = /^\d+$/.test(num);
    if (!isNum) {
        document.getElementById('french-display').innerText = "Digit input only";
        return 0;
    }
    
    var number = Number(num); 
    var arr = [number];
    while (number != 4) {
        number = convertToFrenchWords(number).length;
        arr.push(number); 
    }

    var displayArea = document.getElementById('french-display');
    displayArea.innerText = outputCosmicSequence(arr);
    resizeBox(displayArea);
    
    return arr;
}

function outputCosmicSequence(arr) {
    var output = "" + arr[0];
    for (let i = 1; i < arr.length; i++) {
        output = output.concat(" is ", arr[i], ".\n", arr[i]);
    }
    output += " is cosmic.";
    return output;
}


const units = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const scales = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion"];

function convertToEnglishWords(num) {
    if (num === 0) return "Zero";
    return convertEnglish(num).trim();
}

function convertEnglish(num) {
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

const unites = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
const adolescents = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dixsept", "dixhuit", "dixneuf"];
const dizaines = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatrevingt", "quatrevingt"];
const centaines = ["", "cent", "deuxcent", "troiscent", "quatrecent", "cinqcent", "sixcent", "septcent", "huitcent", "neufcent"];
const grandsNombres = ["", "mille", "million", "milliard", "billion", "billiard", "trillion", "trilliard", "quadrillion", "quadrilliard", "quintillion", "quintilliard", "sextillion", "sextilliard", "septillion", "septilliard", "octillion", "octilliard", "nonillion"];

function convertToFrenchWords(n) {
    if (n === 0) return "zéro";

    let resultat = "";

    function convertirMoinsDeMille(num) {
        let str = "";

        // Hundreds
        if (Math.floor(num / 100) > 0) {
            str += centaines[Math.floor(num / 100)] + (num % 100 === 0 ? "" : "");
        }

        // Tens and Ones
        num = num % 100;
        if (num < 10) {
            str += unites[num];
        } else if (num < 20) {
            str += adolescents[num - 10];
        } else {
            let dizainesValeur = Math.floor(num / 10);
            let unitesValeur = num % 10;
            if (dizainesValeur === 7 || dizainesValeur === 9) {
                str += dizaines[dizainesValeur] + "" + adolescents[unitesValeur];
            } else {
                str += dizaines[dizainesValeur] + (unitesValeur === 0 ? "" : (dizainesValeur === 8 ? "" : "") + unites[unitesValeur]);
            }
        }

        return str.trim();
    }

    function diviserEnMorceaux(num) {
        const morceaux = [];
        while (num > 0) {
            morceaux.push(num % 1000);
            num = Math.floor(num / 1000);
        }
        return morceaux;
    }

    const morceaux = diviserEnMorceaux(n);
    for (let i = 0; i < morceaux.length; i++) {
        if (morceaux[i] !== 0) {
            let motMorceau = convertirMoinsDeMille(morceaux[i]);
            if (i === 1 && morceaux[i] === 1) {
                resultat = grandsNombres[i] + "" + resultat;
            } else {
                resultat = motMorceau + (grandsNombres[i] ? "" + grandsNombres[i] : "") + (resultat ? "" + resultat : "");
            }
        }
    }

    return resultat.trim();
}

function resizeBox(element) {
    element.style.display = 'inline-block';
    element.style.height = 'auto'; // Set width to auto for resizing
    element.style.padding = '10px';
    element.style.height = (element.scrollHeight + 20) + 'px'; // Add padding to width
}

