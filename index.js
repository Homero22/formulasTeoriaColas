// Obtener referencias a los botones y al elemento main
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const contenido1 = document.getElementById('contenido-1');
const contenido2 = document.getElementById('contenido-2');
const contenido3 = document.getElementById('contenido-3');
const mainContent = document.getElementById('main-content');

// Funciones para mostrar contenido según el botón clicado
function mostrarContenido1() {
    contenido1.style.display = 'block';
    contenido2.style.display = 'none';
    contenido3.style.display = 'none';
}

function mostrarContenido2() {
    contenido1.style.display = 'none';
    contenido2.style.display = 'block';
    contenido3.style.display = 'none';
}

function mostrarContenido3() {
    contenido1.style.display = 'none';
    contenido2.style.display = 'none';
    contenido3.style.display = 'block';
}
// Funciones para calcular los resultados y mostrarlos
function calcularResultado1() {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;
    const input3 = document.getElementById('input3').value;
    let fraccionUno = 1/factorial(Number(input1));
    let fraccionDos = exponenciacion(Number(input1),Number(input2),Number(input3));
    const resultado = fraccionUno 
    document.getElementById('Pk').textContent = 'El resultado es: ' + resultado;
}

function calcularResultado2() {
    const input3 = document.getElementById('input3').value;
    const resultado = input3 * 2;
    document.getElementById('resultado2').textContent = 'El resultado es: ' + resultado;
}

function calcularResultado3() {
    const input4 = document.getElementById('input4').value;
    const resultado = input4 ** 2;
    document.getElementById('resultado3').textContent = 'El resultado es: ' + resultado;
}
//funciones generales
function calcularPk(n,m,k){
    let fraccionUno = 1/factorial(n);
    let fraccionDos = exponenciacion(n,m,k);
    return fraccionUno * fraccionDos;
}

//funciones complementarias

function factorial(n){
    if(n==0){
        return 1;
    }else{
        return n*factorial(n-1);
    }
}
function exponenciacion(n,m,k){
    let numerador = n;
    let denominador = m;

    for(let i = 1; i < k; i++){
        numerador *= n;
        denominador *= m;
    }
    return numerador/denominador;
}

// Asignar event listeners a los botones
btn1.addEventListener('click', mostrarContenido1);
btn2.addEventListener('click', mostrarContenido2);
btn3.addEventListener('click', mostrarContenido3);