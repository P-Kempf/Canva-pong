const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;

let marcador1 = 0;
let marcador2 = 0;

// movimiento 
var jugador1Subir = "w";
var jugador1Bajar = "s";
var jugador2Subir = "ArrowUp";
var jugador2Bajar = "ArrowDown";

function cambiarTeclas() {
    jugador1Subir = window.prompt("Ingresa la tecla para que el jugador 1 suba (actual: " + jugador1Subir + "):");
    jugador1Bajar = window.prompt("Ingresa la tecla para que el jugador 1 baje (actual: " + jugador1Bajar + "):");
    jugador2Subir = window.prompt("Ingresa la tecla para que el jugador 2 suba (actual: " + jugador2Subir + "):");
    jugador2Bajar = window.prompt("Ingresa la tecla para que el jugador 2 baje (actual: " + jugador2Bajar + "):");
}

// Event listener para detectar cuando se presiona la tecla ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        cambiarTeclas();
    }
});

window.addEventListener("keydown", presionarTecla, false);

function presionarTecla(e) {
    const key = e.key
    console.log(e.key)
    if (key == jugador1Subir && jugador1.y - jugador1.gravity > 0) {
        jugador1.y -= jugador1.gravity * 4;
    }
    else if (key == jugador1Bajar &&
        jugador1.y + jugador1.height + jugador1.gravity < canvas.height) {
        jugador1.y += jugador1.gravity * 4;
    }
    if (key == jugador2Subir && jugador2.y - jugador2.gravity > 0) {
        jugador2.y -= jugador2.gravity * 4;
    }
    else if (key == jugador2Bajar &&
        jugador2.y + jugador2.height + jugador2.gravity < canvas.height) {
        jugador2.y += jugador2.gravity * 4;
    }
}

class Element {
    constructor(opciones) {
        this.x = opciones.x;
        this.y = opciones.y;
        this.r = opciones.r;
        this.width = opciones.width;
        this.height = opciones.height;
        this.color = opciones.color;
        this.speed = opciones.speed || 2;
        this.gravity = opciones.gravity;
        this.circle = opciones.circle;

    }
}

const jugador1 = new Element({
    x: 1,
    y: 200 - 40,
    width: 15,
    height: 80,
    color: "blue",
    gravity: 2,
})

const jugador2 = new Element({
    x: canvas.width - 16,
    y: 200 - 40,
    width: 15,
    height: 80,
    color: "red",
    gravity: 2,
})
const pelota = new Element({
    x: canvas.width / 2 - 7.5,
    y: canvas.height / 2 - 7.5,
    width: 15,
    height: 15,
    color: "#00ff00",
    speed: 2,
    gravity: 1,
})
const campo = new Element({
    x: canvas.width / 2,
    y: 0,
    width: 2,
    height: canvas.height,
})
const campoCentro = new Element({
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: canvas.height / 4,
    circle: true,
})
const campoJugador1 = new Element({
    x: 0,
    y: canvas.height / 2,
    r: canvas.height / 4,
    circle: true,
})
const campoJugador2 = new Element({
    x: canvas.width,
    y: canvas.height / 2,
    r: canvas.height / 4,
    circle: true,
})

function drawField(element) {
    context.beginPath();
    context.setLineDash([5, 10]);

    if (element.circle) {
        context.arc(element.x, element.y, element.r, 0, 2 * Math.PI);
    } else {
        context.moveTo(element.x, element.y);
        context.lineTo(element.x, element.y + element.height);
    }

    context.stroke();
}


function drawElement(element) {
    // set stroke & shadow to the same color
    context.strokeStyle = element.color;
    context.shadowColor = element.color;
    context.fillStyle = element.color;

    context.shadowBlur = 3;
    // repeatedly overdraw the blur to make it prominent
    for (var i = 0; i < 5; i++) {

        context.shadowBlur += 0.25;

        context.fillRect(element.x, element.y, element.width, element.height);
    }
    context.lineWidth = 2;
    context.fillRect(element.x + 2, element.y + 2, element.width - 4, element.height - 4);
}



function drawMarcador1() {
    context.font = "18px Arial";
    context.fillStyle = "blue";
    context.fillText(marcador1, canvas.width / 2 - 60, 30)
}
function drawMarcador2() {
    context.font = "18px Arial";
    context.fillStyle = "red";
    context.fillText(marcador2, canvas.width / 2 + 51, 30)
}
function drawElements() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawElement(jugador1);
    drawElement(jugador2);
    drawElement(pelota);
    drawField(campo);
    drawField(campoJugador1)
    drawField(campoJugador2)
    drawField(campoCentro)
    drawMarcador1()
    drawMarcador2()
}
function ramdonNumberGenerator(numero){
    let numeroAleatorio
    do {
        numeroAleatorio = Math.random()* numero - numero /2  
    } while (numeroAleatorio >= -1.5 && numeroAleatorio <= 1.5);
    return numeroAleatorio
}
function resetPelota() {
    pelota.x = canvas.width / 2 - pelota.width / 2;
    pelota.y = canvas.height / 2 - pelota.height / 2;
    pelota.speed = ramdonNumberGenerator(4.5)
    pelota.gravity = Math.random() * 6 - 3;
    console.log(pelota.speed , pelota.gravity )
}

function rebotar() {
    if (pelota.y <= 0 || pelota.y + pelota.height >= canvas.height) {
        pelota.gravity = pelota.gravity * -1;
        pelota.y += pelota.gravity;
        pelota.x += pelota.speed;
    }
    else {
        pelota.y += pelota.gravity;
        pelota.x += pelota.speed;
    }
}
function colisionar() {
    if (pelota.x + pelota.width >= jugador2.x &&
        pelota.x <= jugador2.x + jugador2.width &&
        pelota.y + pelota.height >= jugador2.y &&
        pelota.y <= jugador2.y + jugador2.height) {
        pelota.speed = -pelota.speed;
        pelota.gravity = Math.random() * 2 - 1;
        pelota.speed *= 1.1; 
        pelota.gravity *= 1.1;
    }

    if (pelota.x + pelota.width >= jugador1.x &&
        pelota.x <= jugador1.x + jugador1.width &&
        pelota.y + pelota.height >= jugador1.y &&
        pelota.y <= jugador1.y + jugador1.height) {
        pelota.speed = -pelota.speed;
        pelota.gravity = Math.random() * 2 - 1;
        pelota.speed *= 1.1; 
        pelota.gravity *= 1.1;
    }

    // Detectar si la pelota ha tocado la pared y actualizar el marcador del jugador contrario
    if (pelota.x <= 0) {
        marcador2++;
        resetPelota();
    }

    if (pelota.x + pelota.width >= canvas.width) {
        marcador1++;
        resetPelota();
    }

}

function bucle() {
    drawElements()
    rebotar()
    colisionar()
    window.requestAnimationFrame(bucle)
}
bucle()

