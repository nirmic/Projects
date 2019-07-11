"use strict";

var menus = [
    { name: 'JS - Arrays', link: 'JS - Arrays/Arrays.html' },
    { name: 'JS - Progress Bar', link: 'JS - ProgressBar/ProgressBar.html' },
    { name: 'JS - Phonebook', link: 'JS - Phonebook/Phonebook.html' },
    { name: 'JS - Calculator', link: 'JS - Calculator/Calculator.html' },
    { name: 'JS - Survey Wizard', link: 'JS - SurveyWizard/SurveyWizard.html' },
    { name: 'JS - Tic Tac Toe', link: 'JS - TicTacToe/TicTacToe.html' },
    { name: 'JS - Memory Game', link: 'JS - MemoryGame/MemoryGame.html' },
    { name: 'JS - Memory Game - 3 cards', link: 'JS - MemoryGame/3Wins-MemoryGame.html' },
    { name: 'Canvas - Eating Frenzy', link: 'Canvas - EatingFrenzy/EatingFrenzy.html' },
    { name: 'Canvas - OOP - Eating Frenzy', link: 'Canvas - OOP - EatingFrenzy/EatingFrenzyOOP.html' },
    { name: 'Canvas - Ping Pong Paddle', link: 'Canvas - PingPongPaddle/PingPongPaddle.html' },
    { name: 'Canvas - Brick Breaker', link: 'Canvas - BrickBreaker/BrickBreaker.html' },
    { name: 'Canvas - Clock', link: 'Canvas - Clock/Clock.html' },
    { name: 'Canvas - Snake', link: 'Canvas - Snake/Snake.html' },
    { name: 'jQuery - Memory Game', link: 'jQuery - MemoryGame/jQuery-MemoryGame.html' },
    { name: 'jQuery - Caterpillar', link: 'jQuery - Caterpillar/Caterpillar.html' },
    { name: 'jQuery - Picture Puzzle', link: 'jQuery - PicturePuzzle/PicturePuzzle.html' },
    { name: 'jQuery - Checkers', link: 'jQuery - Checkers/Checkers.html' },
    { name: 'Bootstrap - Hello World', link: 'Bootstrap - HelloWorld/HelloWorld.html' },
    { name: 'Bootstrap - Joke Around - Slider', link: 'Bootstrap - JokeAround/JokeAround-1.html' },
    { name: 'Bootstrap - Joke Around - ToolTips', link: 'Bootstrap - JokeAround/JokeAround-2-Tooltip.html' },
    { name: 'Bootstrap - Joke Around - ImageGrid', link: 'Bootstrap - JokeAround/JokeAround-3-ImageGrid.html' },
    { name: 'AJAX - Movie Database', link: 'AJAX - Movie Database/MyMDb.html' },
    { name: 'AJAX - Google Maps', link: 'Ajax - GoogleMaps/GoogleMapsAPI.html' },
    { name: 'Maze Creator / Solver' },
    { name: '2048' },
    { name: 'Battleship' },
    { name: 'Pipe Dream' },
    { name: 'Class Project - My Awesome Project!' }
];

function CreateMenu() {
    var menuDiv = document.getElementById('menuDiv');
    var ul = document.createElement('ul');
    menuDiv.appendChild(ul);
    for (var i = 0; i < menus.length; i++)
    {
        var li = document.createElement('li');
        ul.appendChild(li);
        var menuName = menus[i].name;
        var menuLink = (menus[i].link === undefined) ? './WebProject/ComingSoon.html' : menus[i].link;
        li.innerHTML += "<a href='./Projects/" + menuLink + "' target='Project'>" + menuName + "</a>";
    }
}

function LoadFirstMenuOption() {
    var projectFrame = document.getElementById('projectFrame');
    projectFrame.setAttribute("src", './Projects/' + menus[0].link);
}


CreateMenu();
LoadFirstMenuOption();
