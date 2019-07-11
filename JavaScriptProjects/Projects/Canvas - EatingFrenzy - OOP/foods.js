class Foods {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.foods = [];
        this.foodEatenCounter = 0;
    }

    CreateNew() {
        if (this.foods.length < 5) {
            var birdFood = new Food(this.canvas, this.ctx);
            this.foods.push(birdFood);
        }
    }

    Draw() {
        for (var i = 0; i < this.foods.length; i++) {
            this.foods[i].Draw();
        }
    }

    WasEaten() {
        for (var i = 0; i < this.foods.length; i++) {
            if (this.foods[i].WasEaten()) {
                this.foods.splice(i, 1);
                this.foodEatenCounter++;
            }
        }
        return this.foodEatenCounter;
    }

    Refresh(refreshCounter) {
        this.Draw();
        if (refreshCounter % 100 == 0) {
            this.CreateNew();
        }
        return this.WasEaten();
    }
}
