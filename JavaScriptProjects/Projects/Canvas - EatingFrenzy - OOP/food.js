class Food {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = 20;
        this.height = 20;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }

    Draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill();
        this.ctx.closePath();
    }

    WasEaten() {
        var birdX1 = bird.x;
        var birdX2 = bird.x + bird.width;
        var birdY1 = bird.y;
        var birdY2 = bird.y + bird.height;
        var foodX1 = this.x;
        var foodX2 = this.x + this.width;
        var foodY1 = this.y;
        var foodY2 = this.y + this.height;
        if (((birdX1 >= foodX1 && birdX1 <= foodX2) || (birdX2 >= foodX1 && birdX2 <= foodX2)) &&
            ((birdY1 >= foodY1 && birdY1 <= foodY2) || (birdY2 >= foodY1 && birdY2 <= foodY2))) {
            return true;
        }
        return false;
    }
}
