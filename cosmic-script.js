function getEnglishCosmicSequence() {
    var num = document.getElementById('numberInputEnglish').value;
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
    displayArea.innerText = outputEnglishCosmicSequence(arr);
    resizeBox(displayArea);
    
    return arr;
}

function getFrenchCosmicSequence() {
    var num = document.getElementById('numberInputFrench').value;
    // deal with edge case of not digits
    let isNum = /^\d+$/.test(num);
    if (!isNum) {
        document.getElementById('french-display').innerText = "Digit input only";
        return 0;
    }
    
    var number = Number(num); 
    var arr = [number];
    number = convertToFrenchWords(number).length;
    while (!arr.includes(number)) {
        arr.push(number); 
        number = convertToFrenchWords(number).length;
    }
    arr.push(number); 
    var displayArea = document.getElementById('french-display');
    displayArea.innerText = outputFrenchCosmicSequence(arr);
    resizeBox(displayArea);
    console.log(arr);
    return arr;
}

function getSpanishCosmicSequence() {
    var num = document.getElementById('numberInputSpanish').value;
    // deal with edge case of not digits
    let isNum = /^\d+$/.test(num);
    if (!isNum) {
        document.getElementById('spanish-display').innerText = "Digit input only";
        return 0;
    }
    
    var number = Number(num); 
    var arr = [number];
    number = convertToSpanishWords(number).length;
    while (!arr.includes(number)) {
        arr.push(number); 
        number = convertToSpanishWords(number).length;
    }
    if (number != 5) arr.push(number); 
    var displayArea = document.getElementById('spanish-display');
    displayArea.innerText = outputSpanishCosmicSequence(arr);
    resizeBox(displayArea);
    console.log(arr);
    return arr;
}

function outputEnglishCosmicSequence(arr) {
    var output = "" + arr[0];
    for (let i = 1; i < arr.length; i++) {
        output = output.concat(" is ", arr[i], ".\n", arr[i]);
    }
    output += " is cosmic.";
    return output;
}

function outputFrenchCosmicSequence(arr) {
    var output = "" + arr[0];
    for (let i = 1; i < arr.length; i++) {
        output = output.concat(" est ", arr[i], ".\n", arr[i]);
    }
    output += " n'est pas cosmique.";
    return output;
}

function outputSpanishCosmicSequence(arr) {
    var output = "" + arr[0];
    for (let i = 1; i < arr.length; i++) {
        output = output.concat(" es ", arr[i], ".\n", arr[i]);
    }
    if (output.charAt(output.length - 1) == '5') {
        output += " es cósmico.";
    } else {
        output += " no es cósmico."
    }
    return output;
}


const units = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const scales = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion"];

function convertToEnglishWords(num) {
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

const unidades = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
const adolescentes = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
const decenas = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const hundreds = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

const numerosGrandes = [
    "mil", "millón", "mil millones", "billón", "mil billones", "trillón", 
    "mil trillones", "cuatrillón", "mil cuatrillones", "quintillón", "mil quintillones",
    "sextillón", "mil sextillones", "septillón", "mil septillones", "octillón", "mil octillones",
    "nonillón", "mil nonillones"
];

function convertToSpanishWords(num) {
    if (num < 0) return "Número fuera de rango";
    if (num === 0) return unidades[0];
    if (num > Number.MAX_SAFE_INTEGER) return "Número fuera de rango"; // Ajusted to the maximum safe integer in JavaScript

    function obtenerUnidades(n) {
        return unidades[n];
    }

    function obtenerDecenas(n) {
        if (n < 10) return obtenerUnidades(n);
        if (n < 20) return adolescentes[n - 10];
        let decena = Math.floor(n / 10);
        let unidad = n % 10;
        if (unidad === 0) return decenas[decena];
        if (decena === 2) return "veinti" + unidades[unidad];
        return decenas[decena] + "y" + unidades[unidad];
    }

    function obtenerCentenas(n) {
        if (n < 100) return obtenerDecenas(n);
        let centena = Math.floor(n / 100);
        let resto = n % 100;
        if (centena === 1 && resto === 0) return "cien";
        return hundreds[obtenerCentenas] + (resto === 0 ? "" : "" + obtenerDecenas(resto));
    }

    function obtenerMiles(n) {
        if (n < 1000) return obtenerCentenas(n);
        let mil = Math.floor(n / 1000);
        let resto = n % 1000;
        if (mil === 1) return "mil" + (resto === 0 ? "" : "" + obtenerCentenas(resto));
        return obtenerCentenas(mil) + "mil" + (resto === 0 ? "" : "" + obtenerCentenas(resto));
    }

    function obtenerNumerosGrandes(n, index) {
        if (n < 1000) return obtenerMiles(n);
        let divisor = 1000;
        let indiceNumeroGrande = 0;
        while (indiceNumeroGrande < index) {
            divisor *= 1000;
            indiceNumeroGrande++;
        }
        let cociente = Math.floor(n / divisor);
        let resto = n % divisor;
        let nombreNumeroGrande = numerosGrandes[index];
        let prefijo = (cociente === 1) ? "un" : obtenerMiles(cociente) + "";
        let resultado = prefijo + nombreNumeroGrande;
        if (resto > 0) resultado += "" + obtenerNumerosGrandes(resto, index - 1);
        return resultado;
    }

    let maxIndex = Math.floor(Math.log10(num) / 3) - 1;
    return obtenerNumerosGrandes(num, maxIndex);
}


function resizeBox(element) {
    element.style.display = 'inline-block';
    element.style.height = 'auto'; // Set width to auto for resizing
    element.style.padding = '10px';
    element.style.height = (element.scrollHeight + 20) + 'px'; // Add padding to width
}
