class Bird {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = 10;
        this.y = canvas.height / 2;
        this.width = 20;
        this.height = 20;
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.spacePressed = false;
        this.direction = "right";
        this.bullet = new Bullet(canvas, ctx, this.direction);
    }

    Draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "turquoise";
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill();
        this.ctx.closePath();
    }

    HookEvents(document) {
        document.addEventListener("keydown", function (e) { bird.KeyHandler(e, true); }, false);
        document.addEventListener("keyup", function (e) { bird.KeyHandler(e, false); }, false);
    }

    KeyHandler(e, isDown) {
        switch (e.keyCode) {
            case 32:
                this.spacePressed = isDown;
                break;
            case 37:
                this.leftPressed = isDown;
                this.direction = "left";
                break;
            case 38:
                this.upPressed = isDown;
                this.direction = "up";
                break;
            case 39:
                this.rightPressed = isDown;
                this.direction = "right";
                break;
            case 40:
                this.downPressed = isDown;
                this.direction = "down";
                break;
            default:
                break;
        }
    }

    Move() {
        if (this.upPressed && this.y > 0) {
            this.y -= 2;
        }
        if (this.downPressed && this.y < this.canvas.height - this.height) {
            this.y += 2;
        }
        if (this.leftPressed && this.x > 0) {
            this.x -= 2;
        }
        if (this.rightPressed && this.x < this.canvas.width - this.width) {
            this.x += 2;
        }
    }

    Shoot() {
        if (this.spacePressed && !this.bullet.visible) {
            this.SetBulletXY();
            this.bullet.direction = this.direction;
            this.bullet.visible = true;
        }
    }

    SetBulletXY() {
        switch (this.direction) {
            case "up":
                this.bullet.x = this.x + (this.width - this.bullet.width) / 2;
                this.bullet.y = this.y;
                break;
            case "down":
                this.bullet.x = this.x + (this.width - this.bullet.width) / 2;
                this.bullet.y = this.y + this.height;
                break;
            case "right":
                this.bullet.x = this.x + this.width;
                this.bullet.y = this.y + (this.height - this.bullet.height) / 2;
                break;
            case "left":
                this.bullet.x = this.x;
                this.bullet.y = this.y + (this.height - this.bullet.height) / 2;
                break;
        }    }

    Refresh() {
        this.Draw();
        this.Move();
        this.Shoot();
        this.bullet.Refresh();
    }
}


