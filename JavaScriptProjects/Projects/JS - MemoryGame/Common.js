"use strict";

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
        document.getElementById('memoryBoard').innerHTML = "";
        InitBoard();
    }
}

function InitBoard() {
    flippedCardsCount = 0;
    var output = '';
    cardsArray.Shuffle();
    for (var i = 0; i < cardsArray.length; i++) {
        output += '<div class="card" id="tile_' + i + '"onclick = "OnTileClick(this,\'' + cardsArray[i] + '\')" ></div > ';
    }
    document.getElementById('memoryBoard').innerHTML = output;
}

InitBoard();
