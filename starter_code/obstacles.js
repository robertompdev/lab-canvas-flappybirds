class ObstacleBottom {
    constructor(ctx, canvasW, posY) {
        this.ctx = ctx;
        this.width = 80;
        this.height = this.width * 3.2;
        this.velX = 5;
        this.posX = canvasW;
        this.posY = posY;
        this.image = new Image();
        this.image.src = '../starter_code/images/obstacle_bottom.png';
    }

    draw() {

        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height
        );

    }

    move() {

        this.posX -= this.velX

    }
}

class ObstacleTop {
    constructor(ctx, canvasW, posY) {
        this.ctx = ctx;
        this.width = 80;
        this.height = this.width * 3.2;
        this.velX = 5;
        this.posX = canvasW;
        this.posY = posY;
        this.image = new Image();
        this.image.src = '../starter_code/images/obstacle_top.png';
    }

    draw() {

        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height
        );

    }

    move() {

        this.posX -= this.velX

    }
}