class Bullet {
    constructor(canvas, ctx, direction) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 10;
        this.visible = false;
        this.direction = direction;
    }

    Draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "blue";
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill();
        this.ctx.closePath();
    }

    Move() {
        var speed = 6;
        switch (this.direction) {
            case "up":
                this.y -= speed;
                if (this.y <= 0) {
                    this.visible = false;
                }
                break;
            case "down":
                this.y += speed;
                if (this.y >= this.canvas.height) {
                    this.visible = false;
                }
                break;
            case "right":
                this.x += speed;
                if (this.x >= this.canvas.width) {
                    this.visible = false;
                }
                break;
            case "left":
                this.x -= speed;
                if (this.x <= 0) {
                    this.visible = false;
                }
                break;
        }
    }

    Refresh() {
        if (this.visible == true) {
            this.Draw();
            this.Move();
        }
    }
}


