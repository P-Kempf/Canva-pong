const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;

let marcador1 = 0;
let marcador2 = 0;

class Element {
    constructor(opciones) {
        this.x = opciones.x
        this.y = opciones.y
        this.width = opciones.width
        this.height = opciones.height
        this.color = opciones.color
        this.speed = opciones.speed
        this.gravity = opciones.gravity

    }
}

const jugador1 = new Element({
    x: 10,
    y: 200,
    width: 15,
    height: 80,
    color: "#fff",
    gravity: 2,
})

const jugador2 = new Element({
    x: 625,
    y: 200,
    width: 15,
    height: 80,
    color: "#fff",
    gravity: 2,
})
const pelota = new Element({
    x: 650 / 2,
    y: 400 / 2,
    width: 15,
    height: 15,
    color: "#20C20E",
    speed: 1,
    gravity: 1,
})

function drawElement(element) {
    context.fillStyle = element.color;
    context.fillRect(element.x, element.y, element.width, element.height)
}

function drawMarcador1() {
    context.font = "18px Arial";
    context.fillStyle = "#FFF";
    context.fillText(marcador1, canvas.width / 2 - 60, 30)
}
function drawMarcador2() {
    context.font = "18px Arial";
    context.fillStyle = "#FFF";
    context.fillText(marcador2, canvas.width / 2 + 60, 30)
}
function drawElements() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawElement(jugador1);
    drawElement(jugador2);
    drawElement(pelota);
}
function bucle() {
    drawElements()
    window.requestAnimationFrame(loop)
}
