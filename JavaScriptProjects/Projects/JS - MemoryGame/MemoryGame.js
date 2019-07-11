"use strict";

var cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

function OnTileClick(card, cardValue) {
    if (card.innerHTML === "" && flippedCards.length < 2) {
        card.classList.toggle('flip');
        card.style.background = '#FFF';
        card.innerHTML = cardValue;
        if (flippedCards.length === 0) {
            flippedCards.push(card);
        }
        else if (flippedCards.length === 1) {
            flippedCards.push(card);
            if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
                flippedCardsCount += 2;
                flippedCards = [];
                IsGameOver();
            }
            else {
                setTimeout(FlipCardBack, 700);
            }
        }
    }
}

function FlipCardBack() {
    var card1 = flippedCards[0];
    var card2 = flippedCards[1];
    card1.style.background = "lightblue";
    card1.innerHTML = "";
    card1.classList.toggle('flip');
    card2.style.background = "lightblue";
    card2.innerHTML = "";
    card2.classList.toggle('flip');
    flippedCards = [];
}
