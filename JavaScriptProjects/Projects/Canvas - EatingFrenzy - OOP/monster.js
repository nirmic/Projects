class Monster {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.width = 20;
        this.height = 20;
        this.visible = false;
    }

    Draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "green";
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    MoveTowardsBird() {
        if (this.x < bird.x) this.x++;
        else this.x--;

        if (this.y < bird.y) this.y++;
        else this.y--;
    }

    IsTouchingBird() {
        var birdX1 = bird.x;
        var birdX2 = bird.x + bird.width;
        var birdY1 = bird.y;
        var birdY2 = bird.y + bird.height;
        var monsterX1 = this.x;
        var monsterX2 = this.x + this.width;
        var monsterY1 = this.y;
        var monsterY2 = this.y + this.height;
        if (((birdX1 >= monsterX1 && birdX1 <= monsterX2) || (birdX2 >= monsterX1 && birdX2 <= monsterX2)) &&
            ((birdY1 >= monsterY1 && birdY1 <= monsterY2) || (birdY2 >= monsterY1 && birdY2 <= monsterY2))) {
            console.log("Game Over!!!")
        }
    }

    IsTouchingBullet() {
        var bulletX1 = bird.bullet.x;
        var bulletX2 = bird.bullet.x + bird.bullet.width;
        var bulletY1 = bird.bullet.y;
        var bulletY2 = bird.bullet.y + bird.bullet.height;
        var monsterX1 = this.x;
        var monsterX2 = this.x + this.width;
        var monsterY1 = this.y;
        var monsterY2 = this.y + this.height;
        if (((bulletX1 >= monsterX1 && bulletX1 <= monsterX2) || (bulletX2 >= monsterX1 && bulletX2 <= monsterX2)) &&
            ((bulletY1 >= monsterY1 && bulletY1 <= monsterY2) || (bulletY2 >= monsterY1 && bulletY2 <= monsterY2))) {
            bird.bullet.visible = false;
            this.visible = false;
        }
    }

    Refresh(refreshCounter) {
        if (this.visible) {
            this.Draw();
            this.MoveTowardsBird();
            this.IsTouchingBird();
            this.IsTouchingBullet();
        } else {
            if (refreshCounter % 100 == 0) {
                this.x = this.canvas.width;
                this.y = this.canvas.height / 2;
                this.visible = true;
            }
        }
    }
    
}


