/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

// javascriptYDOM, ej3

    document.addEventListener("DOMContentLoaded", function()){
        const palos = ["C", "D", "H", "S"];
        const valor = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        const JQA = [10, 11];
        const cartas = [palos, valor, JQA];
        const jugadorCartas = document.getElementById("jugador-cartas");
    // array para J, Q, A
        for (const imagePath of cartas){
            const img = document.createElement("img");
            img.src = imagePath;
            jugadorCartas.append(img);
        }
}


