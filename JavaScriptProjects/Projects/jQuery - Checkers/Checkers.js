"use strict";

$(document).ready(function () {
    var selectedPiece;
    var selectedSquareId;
    var optionalMoveSquares = [];
    var whiteMove = true;
    var whitePieces = 12;
    var blackPieces = 12;
    var colors = {
        WHITE: "rgb(0, 0, 0)",
        BLACK: "rgb(255, 255, 255)",
        YELLOW: "rgb(255, 255, 0)",
        RED: "rgb(255, 0, 0)"
    };

    function ClearMoveOptions() {
        for (var i = optionalMoveSquares.length - 1; i >= 0; i--) {
            optionalMoveSquares[i].css("background-color", "red");
            optionalMoveSquares.splice(i, 1);
        }
    }

    function DrawMoveOptions() {
        for (var i = 0; i < optionalMoveSquares.length; i++) {
            optionalMoveSquares[i].css("background-color", "yellow");
        }
    }

    function FindWhiteMoveOptions(color, row, col) {
        var option;
        option = $('#' + (row - 1) + '_' + (col - 1));
        if (option.is(':parent')) {
            if (option.children().first().css('background-color') !== color && !$('#' + (row - 2) + '_' + (col - 2)).is(':parent')) {
                option = $('#' + (row - 2) + '_' + (col - 2));
                optionalMoveSquares.push(option);
            }
        } else {
            optionalMoveSquares.push(option);
        }
        option = $('#' + (row - 1) + '_' + (col + 1));
        if (option.is(':parent')) {
            if (option.children().first().css('background-color') !== color && !$('#' + (row - 2) + '_' + (col + 2)).is(':parent')) {
                option = $('#' + (row - 2) + '_' + (col + 2));
                optionalMoveSquares.push(option);
            }
        } else {
            optionalMoveSquares.push(option);
        }
    }

    function FindBlackMoveOptions(color, row, col) {
        var option;
        option = $('#' + (row + 1) + '_' + (col - 1));
        if (option.is(':parent')) {
            if (option.children().first().css('background-color') !== color && !$('#' + (row + 2) + '_' + (col - 2)).is(':parent')) {
                option = $('#' + (row + 2) + '_' + (col - 2));
                optionalMoveSquares.push(option);
            }
        } else {
            optionalMoveSquares.push(option);
        }
        option = $('#' + (row + 1) + '_' + (col + 1));
        if (option.is(':parent')) {
            if (option.children().first().css('background-color') !== color && !$('#' + (row + 2) + '_' + (col + 2)).is(':parent')) {
                option = $('#' + (row + 2) + '_' + (col + 2));
                optionalMoveSquares.push(option);
            }
        } else {
            optionalMoveSquares.push(option);
        }
    }

    function FindMoveOptions(color, row, col, isKing) {
        console.log(color, row, col, isKing);
        if (color === colors.BLACK || isKing) {
            FindBlackMoveOptions(color, row, col);
        }
        if (color === colors.WHITE || isKing) {
            FindWhiteMoveOptions(color, row, col);
        }
    }

    function RedrawMoveOptions(clickedPiece) {
        console.log(clickedPiece);
        selectedPiece = clickedPiece;

        var isKing = false;
        var parent = selectedPiece.parent();
        selectedSquareId = parent.attr("id").split('_');
        //If the selected piece has the <p>K</p> inside of it, it is a parent of it, which means, it is a king
        if (selectedPiece.is(':parent')) {
            isKing = true;
        }
        ClearMoveOptions();
        FindMoveOptions(selectedPiece.css("background-color"), parseInt(selectedSquareId[0]), parseInt(selectedSquareId[1]), isKing);
        DrawMoveOptions();
    }

    function ClearSquare(oldRow, oldCol, newRow, newCol) {
        if (oldRow - newRow === 2) {
            if (oldCol - newCol === -2) {
                $('#' + (oldRow - 1) + '_' + (oldCol + 1)).empty();
            } else {
                $('#' + (oldRow - 1) + '_' + (oldCol - 1)).empty();
            }
            return true;
        } else if (oldRow - newRow === -2) {
            if (oldCol - newCol === -2) {
                $('#' + (oldRow + 1) + '_' + (oldCol + 1)).empty();
            } else {
                $('#' + (oldRow + 1) + '_' + (oldCol - 1)).empty();
            }
            return true;
        }
    }

    function UpdatePieceCount() {
        if (whiteMove) {
            blackPieces--;
        } else {
            whitePieces--;
        }
    }

    function MovePieceToNewPosition(square) {
        square.append(selectedPiece);
        var squareId = square.attr("id").split('_');
        //Clear the piece from its previous square
        if (ClearSquare(parseInt(selectedSquareId[0]), parseInt(selectedSquareId[1]), parseInt(squareId[0]), parseInt(squareId[1]))) {
            UpdatePieceCount();
        }
        //if we are at the end of the board, and we are not already king, set the piece style as king
        if (parseInt(squareId[0]) === 0 || parseInt(squareId[0]) === 7) {
            if (!selectedPiece.is(':parent')) {
                console.log("king");
                selectedPiece.append("<p class='king'>K</p> ");
            }
        }
    }

    function RedSquareClicked(square) {
        //Only if a red square is already Yellow, advance the piece to it
        if (square.css('background-color') === colors.YELLOW) {
            MovePieceToNewPosition(square);
            ClearMoveOptions();
            //switch turn
            whiteMove = !whiteMove;
            UpdateTurnText();
        }
    }

    function BlackPieceClicked(piece) {
        RedrawMoveOptions(piece);
    }

    function WhitePieceClicked(piece) {
        RedrawMoveOptions(piece);
    }

    function SetPiecesEvents() {
        $(".white.piece").click(function () { WhitePieceClicked($(this)); });
        $(".black.piece").click(function () { BlackPieceClicked($(this)); });
        $(".red.square").click(function () { RedSquareClicked($(this)); });
    }

    function UpdateTurnText() {
        if (blackPieces === 0) {
            $('#turn').html("White Wins!");
        } else if (whitePieces === 0) {
            $('#turn').html("Black Wins!");
        } else {
            if (whiteMove) {
                $('#turn').html("White Move");
            } else {
                $('#turn').html("Black Move");
            }
        }
    }

    function DrawBoard() {
        var id;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                    $("#squares").append($("<div>", { class: "white square" }));
                } else {
                    id = i + '_' + j;
                    $("#squares").append($("<div>", { class: "red square", id: id }));
                    if (i <= 2) {
                        $("#" + id).append($("<div>", { class: "white piece" }));
                    } else if (i >= 5) {
                        $("#" + id).append($("<div>", { class: "black piece" }));
                    }
                }
            }
        }
    }

    function InitBoard() {
        DrawBoard();
        SetPiecesEvents();
        UpdateTurnText();
    }

    InitBoard();
});

