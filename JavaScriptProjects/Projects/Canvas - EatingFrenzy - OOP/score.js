class Score {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = 20;
        this.y = 30;
        this.score = 0;
    }

    Draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "Blue";
        this.ctx.fillText("Score: " + this.score, this.x, this.y);
        this.ctx.fill();
        this.ctx.closePath();
    }

    Refresh(score) {
        this.score = score;
        this.Draw();
    }
}


