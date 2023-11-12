/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

// javascriptYDOM, ej3
// const palos  = ["C", "D", "H", "S"];
const valorFiguras = 10;
const valorAce     = 11;

const rutaCartas   = 'assets/cartas/';
const extension    = 'png';

let cartasJugador     = [];
let cartasComputadora = [];

const baraja = generarBaraja();

document.addEventListener("DOMContentLoaded", function() {

    const jugadorCartas = document.getElementById('jugador-cartas');
    const computadoraCartas = document.getElementById('computadora-cartas');
    const btnNuevo = document.getElementById('btnNuevo');
    const btnPedir = document.getElementById('btnPedir');
    const btnDetener = document.getElementById('btnDetener');

    btnPedir.addEventListener('click', function () {
        repartirCarta(baraja.shift(), cartasJugador, jugadorCartas);
        // repartirCarta(baraja.shift(), cartasComputadora, computadoraCartas);
    });
})

function generarBaraja(a = true){
    const palos       = "CDHS".split('');
    const figuras      = "JQK".split('');
    const ace         = "A";
    const cartaMinima = 2;
    const cartaMaxima = 10;

    let baraja = [];

    for(const palo of palos){
        for(let carta = cartaMinima; carta <= cartaMaxima; carta++){
            baraja.push(carta+palo);
        }
        for(const figura of figuras){
            baraja.push(figura+palo);
        }
        baraja.push(ace+palo);
    }

    return _.shuffle(baraja);
}

function generarElementoCarta(carta){
    const img = document.createElement('img');
    img.src = rutaCartas + carta + '.' + extension;
    img.classList.add('carta');
    return img;
}

function repartirCarta(carta, quien, contenedorCartas){
    quien.push(carta);

    contenedorCartas.append(generarElementoCarta(carta));
}
