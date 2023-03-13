const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;


let animacion
// movimiento 
let controles = {
    jugador1: {
        arriba: "w",
        abajo: "s",
        marcador: 0
    },
    jugador2: {
        arriba: "ArrowUp",
        abajo: "ArrowDown",
        marcador: 0
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
        this.isMovingUp = opciones.isMovingUp;
        this.isMovingDown = opciones.isMovingDown

    }
}

const jugador1 = new Element({
    x: 1,
    y: 200 - 40,
    width: 15,
    height: 80,
    color: "#0000ff",
    gravity: 2,
    isMovingDown: false,
    isMovingUp: false
})

const jugador2 = new Element({
    x: canvas.width - 16,
    y: 200 - 40,
    width: 15,
    height: 80,
    color: "#ff0000",
    gravity: 2,
    isMovingDown: false,
    isMovingUp: false
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

document.addEventListener('keydown', function (event) {
    if (event.key === controles.jugador1.arriba) {
        jugador1.isMovingUp = true;
    } else if (event.key === controles.jugador1.abajo) {
        jugador1.isMovingDown = true;
    }

    if (event.key === controles.jugador2.arriba) {
        jugador2.isMovingUp = true;
    } else if (event.key === controles.jugador2.abajo) {
        jugador2.isMovingDown = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === controles.jugador1.arriba) {
        jugador1.isMovingUp = false;
    } else if (event.key === controles.jugador1.abajo) {
        jugador1.isMovingDown = false;
    }

    if (event.key === controles.jugador2.arriba) {
        jugador2.isMovingUp = false;
    } else if (event.key === controles.jugador2.abajo) {
        jugador2.isMovingDown = false;
    }
});







const upKeyInput = document.getElementById('up-key-input-1');
const downKeyInput = document.getElementById('down-key-input-1');
const colorInput = document.getElementById('color-input-1');
const upKeyInput2 = document.getElementById('up-key-input-2');
const downKeyInput2 = document.getElementById('down-key-input-2');
const colorInput2 = document.getElementById('color-input-2');
const titulojugador = document.getElementById('jugador-1');
const titulojugador2 = document.getElementById('jugador-2');

upKeyInput.value = controles.jugador1.arriba;
downKeyInput.value = controles.jugador1.abajo;
upKeyInput2.value = controles.jugador2.arriba;
downKeyInput2.value = controles.jugador2.abajo;
colorInput.value = jugador1.color;
colorInput2.value = jugador2.color;
titulojugador.style.color = jugador1.color;
titulojugador2.style.color = jugador2.color;


// Selección de elementos del DOM
const optionsMenu = document.getElementById('options-menu');
const optionsForm = document.getElementById('update-keys');

// Función para abrir el menú de opciones
function openOptionsMenu() {
    optionsMenu.style.display = 'block';
    window.cancelAnimationFrame(animacion)
}

// Función para cerrar el menú de opciones
function closeOptionsMenu() {
    optionsMenu.style.display = 'none';
    window.requestAnimationFrame(bucle)
}



// Asignar eventos a los elementos del DOM
document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
        if (optionsMenu.style.display == 'block') {
            closeOptionsMenu();
        } else {
            openOptionsMenu()
        }
    }
});

function guardarCambios() {
    controles.jugador1.arriba = upKeyInput.value;
    controles.jugador1.abajo = downKeyInput.value;
    controles.jugador2.arriba = upKeyInput2.value;
    controles.jugador2.abajo = downKeyInput2.value;
    jugador1.color = colorInput.value;
    jugador2.color = colorInput2.value;
    titulojugador.style.color = jugador1.color;
    titulojugador2.style.color = jugador2.color;
    console.log(jugador1.color)
    closeOptionsMenu()


}

// Función para capturar la primera tecla que se pulse
function captureFirstKey(event, input) {
    event.preventDefault();
    const key = event.key.toLowerCase();
    const nextInput = document.querySelector(`[tabIndex="${input.tabIndex + 1}"]`);

    input.value = key;
    input.removeEventListener('keydown', captureFirstKey);
    if (nextInput) {
        nextInput.focus();
    }

}

console.log(document.querySelector('input'))
// Agregar eventos de clic a los campos de entrada
upKeyInput.addEventListener('focus', () => {
    upKeyInput.addEventListener('keydown', (event) => {
        captureFirstKey(event, upKeyInput);
    });
});

downKeyInput.addEventListener('focus', () => {
    downKeyInput.addEventListener('keydown', (event) => {
        captureFirstKey(event, downKeyInput);
    });
});

upKeyInput2.addEventListener('focus', () => {
    upKeyInput2.addEventListener('keydown', (event) => {
        captureFirstKey(event, upKeyInput2);
    });
});

downKeyInput2.addEventListener('focus', () => {
    downKeyInput2.addEventListener('keydown', (event) => {
        captureFirstKey(event, downKeyInput2);
    });
});








window.addEventListener("keydown", presionarTecla, false);

function presionarTecla(e) {
    const key = e.key

    if (key == controles.jugador1.arriba && jugador1.y - jugador1.gravity > 0) {
        jugador1.y -= jugador1.gravity * 4;
    }
    else if (key == controles.jugador1.abajo &&
        jugador1.y + jugador1.height + jugador1.gravity < canvas.height) {
        jugador1.y += jugador1.gravity * 4;
    }
    if (key == controles.jugador2.arriba && jugador2.y - jugador2.gravity > 0) {
        jugador2.y -= jugador2.gravity * 4;
    }
    else if (key == controles.jugador2.abajo &&
        jugador2.y + jugador2.height + jugador2.gravity < canvas.height) {
        jugador2.y += jugador2.gravity * 4;
    }
}



function drawField(element) {
    context.beginPath();
    context.setLineDash([5, 10]);
    context.strokeStyle = element.color;


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
    context.fillStyle = jugador1.color;
    context.fillText(controles.jugador1.marcador, canvas.width / 2 - 60, 30)
}
function drawMarcador2() {
    context.font = "18px Arial";
    context.fillStyle = jugador2.color;
    context.fillText(controles.jugador2.marcador, canvas.width / 2 + 51, 30)
}
function drawElements() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawField(campo);
    drawField(campoJugador1)
    drawField(campoJugador2)
    drawField(campoCentro)
    drawMarcador1()
    drawMarcador2()
    drawElement(jugador1);
    drawElement(jugador2);
    drawElement(pelota);
}
function ramdonNumberGenerator(numero) {
    let numeroAleatorio
    do {
        numeroAleatorio = Math.random() * numero - numero / 2
    } while (numeroAleatorio >= -1.5 && numeroAleatorio <= 1.5);
    return numeroAleatorio
}
function resetPelota() {
    pelota.x = canvas.width / 2 - pelota.width / 2;
    pelota.y = canvas.height / 2 - pelota.height / 2;
    pelota.speed = ramdonNumberGenerator(4.5)
    pelota.gravity = Math.random() * 6 - 3;
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
        if (jugador2.isMovingUp) {
            console.log("le diste en movimiento arriba")
            pelota.gravity = pelota.gravity + Math.random() * 1.5;
        }
        if (jugador2.isMovingDown) {
            console.log("le diste en movimiento abajo")
            pelota.gravity = pelota.gravity - Math.random() * 1.5 - 1.5;
        }

        pelota.speed = -pelota.speed * 1.1;
    }

    if (pelota.x + pelota.width >= jugador1.x &&
        pelota.x <= jugador1.x + jugador1.width &&
        pelota.y + pelota.height >= jugador1.y &&
        pelota.y <= jugador1.y + jugador1.height) {
        console.log(jugador1.isMovingDown, jugador1.isMovingUp)
        if (jugador1.isMovingUp) {
            console.log("le diste en movimiento arriba")
            pelota.gravity = pelota.gravity + Math.random() * 1.5;
        }
        if (jugador1.isMovingDown) {
            console.log("le diste en movimiento abajo")
            pelota.gravity = pelota.gravity - Math.random() * 1.5 - 1.5;
        }
        pelota.speed = -pelota.speed * 1.1;

    }

    // Detectar si la pelota ha tocado la pared y actualizar el marcador del jugador contrario
    if (pelota.x <= 0) {
        controles.jugador2.marcador++;
        resetPelota();
    }

    if (pelota.x + pelota.width >= canvas.width) {
        controles.jugador1.marcador++;
        resetPelota();
    }

}

function bucle() {
    drawElements()
    rebotar()
    colisionar()
    animacion = window.requestAnimationFrame(bucle)
}
bucle()

