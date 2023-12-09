const gridEl = document.getElementById("color-scheme");
const hexEl = document.getElementById("hex-el");

let colorsArr = [];

document.getElementById("submit-btn").addEventListener('click',function(e){
    e.preventDefault();

    gridEl.innerHTML="";
    hexEl.innerHTML="";

    const colorSelected = (document.getElementById("color-picker").value).substring(1);
    const modeSelected = document.getElementById("color-select").value;
    colorsArr=[];

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorSelected}&format=json&mode=${modeSelected}&count=6`, {method:"GET"})
        .then(res => res.json())
        .then(data => {

            (data.colors).forEach(color => {
                colorsArr.push(color.hex.value);
            });
            
            renderColors(colorsArr);
        });
})

function renderColors(colorsArr){
    colorsArr.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-display';
        colorBox.id = 'color-display';
        colorBox.style.backgroundColor = color;
        
        const colorHex = document.createElement('p');
        colorHex.className = 'hex';
        colorHex.textContent = color;

        gridEl.appendChild(colorBox);
        hexEl.appendChild(colorHex);
    });
}

document.addEventListener("click", (e) => {
    if (e.target.id.includes("color-display")) {
        const backgroundColor = e.target.style.backgroundColor;
        const hexColor = rgbToHex(backgroundColor);
        
        navigator.clipboard.writeText(hexColor);
        alert(hexColor);
    }
});

// Función para convertir un color RGB a formato hexadecimal
function rgbToHex(rgb) {
    // Obtener los valores de rojo, verde y azul
    const [r, g, b] = rgb.match(/\d+/g);

    // Convertir a hexadecimal y asegurarse de que tengan dos dígitos
    const toHex = (value) => {
        const hex = parseInt(value).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    // Combinar los componentes en un solo valor hexadecimal
    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    return hexColor;
}