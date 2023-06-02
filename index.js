// Obtener referencias a los botones y al elemento main
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const contenido1 = document.getElementById("contenido-1");
const contenido2 = document.getElementById("contenido-2");
const contenido3 = document.getElementById("contenido-3");
const mainContent = document.getElementById("main-content");

// Funciones para mostrar contenido según el botón clicado
function mostrarContenido1() {
  contenido1.style.display = "block";
  contenido2.style.display = "none";
  contenido3.style.display = "none";
}

function mostrarContenido2() {
  contenido1.style.display = "none";
  contenido2.style.display = "block";
  contenido3.style.display = "none";
}

function mostrarContenido3() {
  contenido1.style.display = "none";
  contenido2.style.display = "none";
  contenido3.style.display = "block";
}
    // Funciones para calcular los resultados y mostrarlos
function calcularResultado1() {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;
  const input3 = document.getElementById("input3").value;

    //Valores
  const lambda = Number(input1);
  const mu = Number(input2);
  const k = Number(input3);

    //Calcular P0
  const resultado = calcular_P0(lambda, mu, k);
  document.getElementById("P0").textContent = "P0 = " + resultado.toFixed(3);

    //Calcular Pk
  const resultado2 = calcularPk(lambda, mu, k, resultado);
  document.getElementById("Pk").textContent = "Pk = " + resultado2;

    //Calcular PNE
  const resultado3 = 1 - resultado2;
  document.getElementById("PNE").textContent = "PNE = " + resultado3.toFixed(3);

    //Calcular L 

    const clientesSistema = calcularL(lambda, mu, k, resultado);
    document.getElementById("L").textContent = "L = " + clientesSistema.toFixed(3);

    //Calcular Lq
    const clientesCola = calcularLq(lambda, mu, k, resultado);
    document.getElementById("Lq").textContent = "Lq = " + clientesCola.toFixed(3);


    //Calcular Ln
    const clientesColaNoVacia = clientesCola/resultado2;
    document.getElementById("Ln").textContent = "Ln = " + clientesColaNoVacia.toFixed(3); 

    //Calcular W
    const tiempoSistema = calcularW(lambda, mu, k, resultado);
    document.getElementById("W").textContent = "W = " + tiempoSistema.toFixed(3);


    //Calcular Wq
    const tiempoCola = calcularWq(lambda, mu, k, resultado);
    document.getElementById("Wq").textContent = "Wq = " + tiempoCola.toFixed(3);


    //Calcular Wn
    const tiempoColaNoVacia = tiempoCola/resultado2;
    document.getElementById("Wn").textContent = "Wn = " + tiempoColaNoVacia.toFixed(3);
}

function calcularResultado2() {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;
  const input3 = document.getElementById("input3").value;
  const input4 = document.getElementById("input4").value;

  //Valores
  const lambda = Number(input1);
  const mu = Number(input2);
  const k = Number(input3);
  const n = Number(input4);
  //Calcular Pn

  if (n <= k) {
    const resultado4 = calcularPn(lambda, mu, k, n);
    document.getElementById("Pn").textContent =
      "Pn para n=0,1,2,...k = " + resultado4.toFixed(3);
  } else {
    const resultado4 = calcularPn2(lambda, mu, k, n);
    document.getElementById("Pn").textContent = "Pn para n>=k "+ resultado4.toFixed(3);
  }
}

/************************************************************************ */
function calcularResultado3() {
  const input3 = document.getElementById("input3").value;
  const resultado = input3 * 2;
  document.getElementById("resultado2").textContent =
    "El resultado es: " + resultado;
}

function calcularResultado4() {
  const input4 = document.getElementById("input4").value;
  const resultado = input4 ** 2;
  document.getElementById("resultado3").textContent =
    "El resultado es: " + resultado;
}
/************************************************************************ */



//*************************************************************************Funciones PICM************************************************************** */
function calcularPk(l, m, k, p) {
  let nume = 0;
  let denominador = 0;
  let fraccionUno = 0;
  let fraccionDos = 0;

  let lambda = l;
  let mu = m;
  let numeroServidores = k;

  //primera parte de la formula
  fraccionUno = 1 / factorial(numeroServidores);
  fraccionDos = exponenciacion(lambda, mu, numeroServidores);
  fraccionDos = fraccionDos.toFixed(3);
  //segunda parte de la formula
  nume = m * k;
  denominador = k * m - l;

  return fraccionUno * fraccionDos * ((nume * p) / denominador);
}

function calcular_P0(l, m, k) {
  // l -> lambda  m -> mu  k -> numero de servidores
  let n = k - 1;
  let total = 0;
  let fraccionUno = 0;
  let fraccionDos = 0;
  let sumatoria = 0;
  let denominadorUno = 0;
  let denominadorDos = 0;

  for (let i = 0; i <= n; i++) {
    fraccionUno = 1 / factorial(i);
    fraccionDos = exponenciacion(l, m, i);
    sumatoria = fraccionUno * fraccionDos;
    total = total + sumatoria;
  }

  denominadorUno = total;

  //segunda parte de la formula

  fraccionUno = 1 / factorial(k);
  fraccionDos = exponenciacion(l, m, k);
  denominadorDos = (fraccionUno * fraccionDos * (k * m)) / (k * m - l);

  return 1 / (denominadorUno + denominadorDos);
}

//calcular Pn cuando n < k
function calcularPn(l, m, k, n) {
  let po = calcular_P0(l, m, k);
  po = po.toFixed(3);
  const denominador1 = factorial(n);
  const fraccion1 = po / denominador1;
  const fraccion2 = exponenciacion(l, m, n);
  const resultado = fraccion1 * fraccion2;

  return resultado;
}

//calcular Pn cuando n >= k
function calcularPn2(l, m, k, n) {
    const po = calcular_P0(l, m, k);
    const factorialK = factorial(k);

    const expo = n - k;
    const exponenciacionK = exponenciacionSinFraccion(k, expo);

    const fraccion1 = 1/(factorialK*exponenciacionK);

    const fraccion2 = exponenciacion(l,m,n);

    const resultado = po*fraccion1*fraccion2;
    
    return resultado;
}
//Numero esperado de clientes en el sistema
function calcularL(l, m, k, p) {

    const numerador = l*m*exponenciacion(l,m,k);
    const denominador = factorial(k-1)*exponenciacionSinFraccion((k*m)-l,2);
    const resultado = p*numerador/denominador + l/m;


    return resultado;
}
//Numero esperado de clientes en la cola
function calcularLq(l,m,k,p){

    const numerador = l*m*exponenciacion(l,m,k);
    const denominador = factorial(k-1)*exponenciacionSinFraccion((k*m)-l,2);
    const resultado = p*numerador/denominador;

    return resultado;
}
//Tiempo esperado de un cliente en el sistema
function calcularW(l,m,k,p){
    const numerador = m*exponenciacion(l,m,k)*p;
    const denominador = factorial(k-1)*exponenciacionSinFraccion((k*m)-l,2);
    const resultado = numerador/denominador + 1/m;
    return resultado;
}
//Tiempo esperado de un cliente en la cola
function calcularWq(l,m,k,p){
    const numerador = m*exponenciacion(l,m,k)*p;
    const denominador = factorial(k-1)*exponenciacionSinFraccion((k*m)-l,2);
    const resultado = numerador/denominador;
    return resultado;
}



//************************************************************************Funciones Complementarias ******************************************************//

function factorial(a) {
  if (a == 0) {
    return 1;
  } else {
    return a * factorial(a - 1);
  }
}
function exponenciacion(a, b, c) {
  let numerador = a;
  let denominador = b;

  if (c == 0) {
    return 1;
  }

  for (let i = 1; i < c; i++) {
    numerador *= a;
    denominador *= b;
  }
  return numerador / denominador;
}
function exponenciacionSinFraccion(a,b){
    let resultado = a;
    for(let i = 1; i < b; i++){
        resultado *= a;
    }
    return resultado;
}
//******************************************************************************************************************************************************* */




// Asignar event listeners a los botones
btn1.addEventListener("click", mostrarContenido1);
btn2.addEventListener("click", mostrarContenido2);
btn3.addEventListener("click", mostrarContenido3);
