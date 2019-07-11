var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score = {
    value: 0,
    x: 8,
    y: 20,
    draw: function () {
        ctx.font = "16px Arial";
        ctx.fillStyle = "0095DD";
        ctx.fillText("Score: " + this.value, this.x, this.y);
    }
};

var lives = {
    value: 3,
    x: 400,
    y: 20,
    draw: function () {
        ctx.font = "16px Arial";
        ctx.fillStyle = "0095DD";
        ctx.fillText("Lives: " + this.value, this.x, this.y);
    }
};

var brick = {
    width: 75,
    height: 20,
    draw: function (x, y, color) {
        ctx.beginPath();
        ctx.rect(x, y, this.width, this.height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
};

var bricksMatrix = {
    bricks: [],
    rows: 3,
    columns: 5,
    padding: 10,
    offset: 30,
    colors: ["red", "orange", "yellow", "green", "turquoise"],

    init: function () {
        for (var c = 0; c < this.columns; c++) {
            this.bricks[c] = [];
            for (var r = 0; r < this.rows; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    },

    draw: function () {
        for (var c = 0; c < this.columns; c++) {
            for (var r = 0; r < this.rows; r++) {
                if (this.bricks[c][r].status == 1) {
                    var x = (c * (brick.width + this.padding)) + this.offset;
                    var y = (r * (brick.height + this.padding)) + this.offset;
                    this.bricks[c][r].x = x;
                    this.bricks[c][r].y = y;
                    brick.draw(x, y, this.colors[c]);
                }
            }
        }
    }

};

var ball = {
    radius: 10,
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 5,
    color: "green",
    dx: 3,
    dy: -3,

    init: function () {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.dx = 3;
        this.dy = -3;
    },

    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    },

    move: function () {
        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }

        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }
        else if (this.y + this.dy > canvas.height - this.radius) {
            if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
                this.dy = -this.dy;
            }
            else {
                lives.value--;
                if (!lives.value) {
                    alert("Game Over!!!");
                    document.location.reload();
                }
                else {
                    this.init();
                    paddle.x = (canvas.width - paddle.width) / 2;
                }
            }
        }
        this.x += this.dx;
        this.y += this.dy;
    },

    collisionDetection: function () {
        for (var c = 0; c < bricksMatrix.columns; c++) {
            for (var r = 0; r < bricksMatrix.rows; r++) {
                var b = bricksMatrix.bricks[c][r];
                if (b.status == 1) {
                    if (this.x > b.x && this.x < b.x + brick.width && this.y > b.y && this.y < b.y + brick.height) {
                        this.dy = -this.dy;
                        b.status = 0;
                        score.value++;
                        if (score.value == bricksMatrix.columns * bricksMatrix.rows) {
                            alert("You Win!!!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

};

var paddle = {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2,
    dx: 7,
    rightPressed: false,
    leftPressed: false,

    draw: function () {
        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    },

    move: function () {
        if (this.rightPressed && this.x < canvas.width - this.width) {
            this.x += this.dx;
        }
        if (this.leftPressed && this.x > 0) {
            this.x -= this.dx;
        }
    }
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        paddle.rightPressed = true;
    }
    else if (e.keyCode == 37) {
        paddle.leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        paddle.rightPressed = false;
    }
    else if (e.keyCode == 37) {
        paddle.leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bricksMatrix.draw();
    ball.draw();
    paddle.draw();
    score.draw();
    lives.draw();
    ball.collisionDetection();
    ball.move();
    paddle.move();

    requestAnimationFrame(draw);
}

bricksMatrix.init();
draw();
