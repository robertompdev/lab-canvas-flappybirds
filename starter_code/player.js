class Player {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx;
        this.gameWidth = w;
        this.gameHeight = h;

        this.image = new Image();
        this.image.src = '../starter_code/images/flappy.png';

        this.width = 500 * 0.1;
        this.height = 350 * 0.1;

        this.posX = 60;
        this.posY0 = this.gameHeight / 2; //Guardamos la posicion original para usarla como suelo
        this.posY = this.gameHeight / 2;
        this.velY = 1;
        this.keys = keys;

        this.setListeners(); //Llamamos al listener para que desde el primer momento el jugador responda.
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height
        );

    }

    move() {
        let gravity = 0.4;

        if (this.posY <= 500) {
            //COmprobamos que el player nunca sobrepase el suelo.

            this.posY += this.velY;
            this.velY += gravity;

        } else {
            //Si lo hace reseteamos posición y velocidad
            //alert('GAME OVER')


        }

    }

    setListeners() {

        document.onkeydown = e => {
            if (e.keyCode === 32) {
                this.posY -= 30; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
                this.velY -= 10;

            }
        };
    }

}