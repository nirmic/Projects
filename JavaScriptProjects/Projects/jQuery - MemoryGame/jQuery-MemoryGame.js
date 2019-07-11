"use strict";

$(document).ready(function () {

    var cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

    function OnTileClick(card, cardValue) {
        if (card.text() === "" && flippedCards.length < 2) {
            card.toggleClass('flip');
            card.css('background-color', '#FFF');
            card.text(cardValue);
            if (flippedCards.length === 0) {
                flippedCards.push(card);
            }
            else if (flippedCards.length === 1) {
                flippedCards.push(card);
                if ($(flippedCards[0]).text() === $(flippedCards[1]).text()) {
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
        card1.css('background-color', 'lightblue');
        card1.text("");
        card1.toggleClass('flip');
        card2.css('background-color', 'lightblue');
        card2.text("");
        card2.toggleClass('flip');
        flippedCards = [];
    }

    var flippedCards = [];
    var flippedCardsCount = 0;

    Array.prototype.Shuffle = function () {
        for (var i = 0; i < this.length; i++) {
            var j = Math.floor(Math.random() * (this.length - i));
            var swap = this[j];
            this[j] = this[i];
            this[i] = swap;
        }
    };


    function IsGameOver() {
        if (flippedCardsCount === cardsArray.length) {
            alert("Board cleared...generating new board");
            $('#memoryBoard').text("");
            InitBoard();
        }
    }

    function InitBoard() {
        flippedCardsCount = 0;
        cardsArray.Shuffle();
        $.each(cardsArray, function (i, cardArray) {
            var cardDiv = $('<div class="card" id="card' + i + '"></div > ');
            cardDiv.click(function () { OnTileClick($(this), cardArray); });
            $("#memoryBoard").append(cardDiv);
        });
    }

    InitBoard();
});