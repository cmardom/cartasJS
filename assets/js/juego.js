/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

// javascriptYDOM, ej3
// const palos  = ["C", "D", "H", "S"];
let esTurnoDeJugador = true;
const puntosMaximos  = 21;
const baraja         = generarBaraja();

document.addEventListener("DOMContentLoaded", function() {

    const jugadorCartas     = document.getElementById('jugador-cartas');
    const computadoraCartas = document.getElementById('computadora-cartas');
    const btnNuevo          = document.getElementById('btnNuevo');
    const btnPedir          = document.getElementById('btnPedir');
    const btnDetener        = document.getElementById('btnDetener');

    btnPedir.addEventListener('click', function () {
        const puntosJugador = repartirCarta(jugadorCartas);
        if(puntosJugador > puntosMaximos){
            detener();
        }
    });

    btnDetener.addEventListener('click', function(){
       detener();
    });

    btnNuevo.addEventListener('click', function(){
        finDePartida();
    });

    function repartirCarta(contenedorCartas){
        const carta = baraja.shift();
        contenedorCartas.append(generarElementoCarta(carta));
        const puntosActuales   = calcularPuntosDeJugador(contenedorCartas);
        const puntosNuevaCarta = calcularPuntosDeCarta(carta);
        const puntosTotales    = puntosActuales + puntosNuevaCarta;

        marcadorElement(contenedorCartas).innerHTML = puntosTotales;

        return puntosTotales;
    }

    function juegaComputadora(puntosDeJugador){
        const puntosDeComputadora = repartirCarta(computadoraCartas);
        console.log(puntosDeComputadora);
        if(
            puntosDeJugador <= puntosMaximos &&
            puntosDeComputadora < puntosDeJugador &&
            puntosDeComputadora < puntosMaximos
        ){
            juegaComputadora(puntosDeJugador)
        } else {
            if(
                puntosDeJugador > puntosMaximos ||
                (puntosDeJugador < puntosDeComputadora && puntosDeComputadora <= puntosMaximos)
            ){
                finDePartida('La computadora Gana!');
            } else
            if(puntosDeComputadora > puntosMaximos || puntosDeJugador > puntosDeComputadora){
                console.log(1);
                finDePartida('El jugador gana!');
            } else
            if(puntosDeComputadora === puntosDeJugador){
                console.log(3);
                finDePartida('Empate!');
            }
        }
    }

    async function finDePartida(mensaje = ''){
        if(mensaje){
            console.log(mensaje);
            setTimeout(() => {
                alert(mensaje);
            }, 1);
        }
        setTimeout(() => {
            esTurnoDeJugador = true;
            btnPedir.removeAttribute('disabled');
            btnDetener.removeAttribute('disabled');

            marcadorElement(jugadorCartas).innerHTML     = 0;
            marcadorElement(computadoraCartas).innerHTML = 0;
            jugadorCartas.innerHTML                      = '';
            computadoraCartas.innerHTML                  = '';
        }, 3000);

    }

    function detener(){
        esTurnoDeJugador = !esTurnoDeJugador; //Toggle del booleano al valor contrario

        if(!esTurnoDeJugador){
            btnPedir.setAttribute('disabled', true);
            btnDetener.setAttribute('disabled', true);

            juegaComputadora(calcularPuntosDeJugador(jugadorCartas));
        } else {
            btnPedir.removeAttribute('disabled');
            btnDetener.removeAttribute('disabled');
        }
    }
})

function generarBaraja(){
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
    img.setAttribute('src', `assets/cartas/${carta}.png`);
    img.classList.add('carta');
    return img;
}

function calcularPuntosDeCarta(carta){
    const valorFiguras = 10;
    const valorAce     = 11;

    const numeroCarta  = carta.substring(0, carta.length - 1);
    const valorCarta   = parseInt(numeroCarta);

    if(isNaN(valorCarta)){
        const letra = numeroCarta.toUpperCase();
        switch(letra){
            case 'A': return 11;
            case 'J':
            case 'Q':
            case 'K':
                return 10;
            default:
                throw new Error('Letra de carta no válida: ' + letra);
        }
    } else {
        return valorCarta;
    }
}

function marcadorElement(contenedorCartas){
    return contenedorCartas
        .previousElementSibling
        .firstElementChild;
}

function calcularPuntosDeJugador(contenedorCartas, puntos){
    const marcador = marcadorElement(contenedorCartas);
    const puntosActuales = parseInt(marcador.firstChild.nodeValue);
    if(isNaN(puntosActuales)){
        throw new Error('Puntos actuales no es un numero');
    }
    return puntosActuales;
}
