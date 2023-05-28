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

    //Valores
    let lambda = Number(input1);
    let mu = Number(input2);
    let k = Number(input3);

    console.log("Valor de lambda: ",lambda);
    console.log("Valor de mu: ",mu);
    console.log("Valor de k: ",k);

    //Calcular P0
    const resultado =calcular_P0(lambda,mu,k); 
    document.getElementById('P0').textContent = 'P0 = ' + resultado.toFixed(3);

    //Calcular Pk
    const resultado2 = calcularPk(lambda,mu,k,resultado);
    document.getElementById('Pk').textContent = 'Pk = ' + resultado2;

    //Calcular PNE
    const resultado3 = 1-resultado2;
    document.getElementById('PNE').textContent = 'PNE = ' + resultado3.toFixed(3);
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
function calcularPk(l,m,k,p){
    let nume = 0;
    let denominador = 0;
    let fraccionUno = 0;
    let fraccionDos = 0;

    let lambda = l;
    let mu = m;
    let numeroServidores = k;

    //primera parte de la formula
    fraccionUno = 1 / (factorial(numeroServidores));
    console.log("1/2", fraccionUno)
    fraccionDos = exponenciacion(lambda,mu,numeroServidores);
    fraccionDos= fraccionDos.toFixed(3);
    //segunda parte de la formula
    nume = m*k;
    denominador = (k * m)-l

    return ((fraccionUno * fraccionDos) * (nume*p/denominador));
}

function calcular_P0(l,m,k){
    // l -> lambda  m -> mu  k -> numero de servidores
    let n = k-1;
    let total = 0;
    let fraccionUno=0;
    let fraccionDos=0;
    let sumatoria=0;
    let denominadorUno=0;
    let denominadorDos=0;
    console.log("Valor de n: ",n);

    for(let i =0 ; i<=n ; i++) {
        fraccionUno = 1/factorial(i);
        console.log("Valor de fraccionUno: ",fraccionUno)
        fraccionDos = exponenciacion(l,m,i);
        sumatoria = fraccionUno * fraccionDos;
        total = total + sumatoria;
        console.log("Sumatoria: ",total);
    }

    denominadorUno=total;

    //segunda parte de la formula

    fraccionUno = 1/factorial(k);
    fraccionDos = exponenciacion(l,m,k);
    denominadorDos = (fraccionUno * fraccionDos)*(k*m)/(k*m-l);

    return 1/(denominadorUno+denominadorDos);
}


//funciones complementarias

function factorial(a){
    if(a==0){
        return 1;
    }else{
        return a*factorial(a-1);
    }
}
function exponenciacion(a,b,c){
    let numerador = a;
    let denominador = b;

    if(c==0){
        return 1;
    }

    for(let i = 1; i < c; i++){
        numerador *= a;
        denominador *= b;

    }
    console.log("Valor de exponenciacion: ",numerador/denominador);
    return numerador/denominador;
}

// Asignar event listeners a los botones
btn1.addEventListener('click', mostrarContenido1);
btn2.addEventListener('click', mostrarContenido2);
btn3.addEventListener('click', mostrarContenido3);