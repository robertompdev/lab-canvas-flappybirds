class Obstacle {
    constructor(ctx, canvasW, playerY0, playerH) {
        this.ctx = ctx;
        this.width = 70;
        this.height = this.width * 3;
        this.velX = 5;
        this.posX = canvasW;
        //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.
        this.posY = 350;
        this.image = new Image();
        this.image.src = '../starter_code/images/obstacle_bottom.png';
    }

    draw() {
        //this.ctx.fillStyle = "black";
        //this.ctx.fillRect(this.posX, this.posY, this.width, this.height);

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