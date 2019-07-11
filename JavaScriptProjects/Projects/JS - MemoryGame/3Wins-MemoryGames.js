"use strict";

var cardsArray = ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'D', 'D', 'D', 'E', 'E', 'E', 'F', 'F', 'F', 'G', 'G', 'G', 'H', 'H', 'H'];

function OnTileClick(card, cardValue) {
    if (card.innerHTML === "" && flippedCards.length < 3) {
        card.classList.toggle('flip');
        card.style.background = '#FFF';
        card.innerHTML = cardValue;
        if (flippedCards.length < 2) {
            flippedCards.push(card);
        }
        else if (flippedCards.length === 2) {
            flippedCards.push(card);
            if (flippedCards[0].innerHTML === flippedCards[1].innerHTML && flippedCards[1].innerHTML === flippedCards[2].innerHTML) {
                flippedCardsCount += 3;
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
    var card3 = flippedCards[2];
    card1.style.background = "lightblue";
    card1.innerHTML = "";
    card1.classList.toggle('flip');
    card2.style.background = "lightblue";
    card2.innerHTML = "";
    card2.classList.toggle('flip');
    card3.style.background = "lightblue";
    card3.innerHTML = "";
    card3.classList.toggle('flip');
    flippedCards = [];
}
