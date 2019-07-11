var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var bird = new Bird(canvas, ctx);
bird.HookEvents(this.document);
var foods = new Foods(canvas, ctx);
var score = new Score(canvas, ctx);
var monster = new Monster(canvas, ctx);
var refreshCounter = 0; 

function RefreshScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.Refresh();
    var foodEatenCounter = foods.Refresh(refreshCounter);
    score.Refresh(foodEatenCounter);
    monster.Refresh(refreshCounter);

    refreshCounter++;
}

setInterval(RefreshScreen, 10);
