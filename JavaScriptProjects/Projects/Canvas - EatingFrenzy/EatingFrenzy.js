var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var refreshCounter = 0;
var bird_x = 10;
var bird_y = canvas.height / 2;
var bird_width = 20;
var bird_height = 20;
var bird_upPressed = false;
var bird_downPressed = false;
var bird_leftPressed = false;
var bird_rightPressed = false;
var bird_spacePressed = false;
var bird_direction = "right";

function BirdInit() {
    bird_x = 10;
    bird_y = canvas.height / 2;
    bird_width = 20;
    bird_height = 20;
    bird_upPressed = false;
    bird_downPressed = false;
    bird_leftPressed = false;
    bird_rightPressed = false;
    bird_spacePressed = false;
    bird_direction = "right";
    BirdHookEvents();
}

function BirdDraw() {
    ctx.beginPath();
    ctx.fillStyle = "turquoise";
    ctx.rect(bird_x, bird_y, bird_width, bird_height);
    ctx.fill();
    ctx.closePath();
}

function BirdHookEvents() {
    document.addEventListener("keydown", function (e) { BirdKeyHandler(e, true); }, false);
    document.addEventListener("keyup", function (e) { BirdKeyHandler(e, false); }, false);
}

function BirdKeyHandler(e, isDown) {
    switch (e.keyCode) {
        case 32:
            bird_spacePressed = isDown;
            break;
        case 37:
            bird_leftPressed = isDown;
            bird_direction = "left";
            break;
        case 38:
            bird_upPressed = isDown;
            bird_direction = "up";
            break;
        case 39:
            bird_rightPressed = isDown;
            bird_direction = "right";
            break;
        case 40:
            bird_downPressed = isDown;
            bird_direction = "down";
            break;
        default:
            break;
    }
}

function BirdMove() {
    if (bird_upPressed && bird_y > 0) {
        bird_y -= 2;
    }
    if (bird_downPressed && bird_y < canvas.height - bird_height) {
        bird_y += 2;
    }
    if (bird_leftPressed && bird_x > 0) {
        bird_x -= 2;
    }
    if (bird_rightPressed && bird_x < canvas.width - bird_width) {
        bird_x += 2;
    }
}

function BirdShoot() {
    if (bird_spacePressed && !bird_bullet.visible) {
        bird_SetBulletXY();
        bird_bullet.direction = bird_direction;
        bird_bullet.visible = true;
    }
}

function BirdRefresh() {
    BirdDraw();
    BirdMove();
    BirdShoot();
}

function RefreshScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    BirdRefresh();
}

BirdInit();
setInterval(RefreshScreen, 10);
