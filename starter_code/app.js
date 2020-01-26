const flappyBird = {
    name: 'Flappy Bird',
    description: 'HTML5 Canvas',
    author: ['Luciano', 'Roberto'],
    license: undefined,
    version: 'beta',
    canvasDom: undefined,
    ctx: undefined,
    obs: undefined,
    obstaclesBottom: [],
    obstaclesTop: [],
    fpsCounter: 60,
    framesCounter: 0,
    score: 0,

    canvas: undefined,
    wSize: {
        width: 700,
        height: 500,
    },
    refresh: 0,




    init(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.canvasDom.width = this.wSize.width
        this.canvasDom.height = this.wSize.height
        scoreBoard.init(this.ctx)
        this.startGame()
    },

    startGame() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++;
            this.clear()
            this.drawAll()
            this.moveAll()
            this.generateObstacles()
            this.clearObstacles()
            this.isCollision()
            if (this.isCollision()) {
                this.gameOver();
            }
            this.score += 0.01;
            this.drawScore();
        }, 1000 / this.fpsCounter)

    },

    reset() {

        this.background = new Background(this.ctx, this.wSize.width, this.wSize.height)
        this.player = new Player(this.ctx, this.wSize.width, this.wSize.height);
        this.obstaclesBottom = [];
        this.obstaclesTop = [];
        this.scoreBoard = scoreBoard;

    },

    drawAll() {

        this.background.draw();
        this.player.draw(this.framesCounter);
        this.obstaclesBottom.forEach(obs => obs.draw());
        this.obstaclesTop.forEach(obs => obs.draw());

    },

    moveAll() {
        this.background.move();
        this.player.move();
        this.obstaclesBottom.forEach(obs => obs.move());
        this.obstaclesTop.forEach(obs => obs.move());

    },

    clear() {
        this.ctx.clearRect(0, 0, this.wSize.width, this.wSize.height);
    },

    generateObstacles() {

        if (this.framesCounter % 80 == 0) {
            let randomNumber1 = Math.floor(Math.random() * -150)
            let randomNumber2 = randomNumber1 + 450
            //Generamos obstaculos cada 80 frames.
            this.obstaclesBottom.push(new ObstacleBottom(this.ctx, this.wSize.width, randomNumber2)); //pusheamos nuevos obstaculos
            this.obstaclesTop.push(new ObstacleTop(this.ctx, this.wSize.width, randomNumber1)); //pusheamos nuevos obstaculos
        }
    },

    clearObstacles() {
        //funcion para limpiar obs
        this.obstaclesBottom.forEach((obs, idx) => {
            if (obs.posX <= -80) {
                this.obstaclesBottom.splice(idx, 1);

            }
        });
        this.obstaclesTop.forEach((obs, idx) => {
            if (obs.posX <= -80) {
                this.obstaclesTop.splice(idx, 1);
            }
        });
    },

    isCollision() {
        // funcion para comprobar colisiones

        if (this.player.posX <= this.obstaclesBottom[0].posX + this.obstaclesBottom[0].width && this.player.posX + this.player.width >= this.obstaclesBottom[0].posX && this.player.posY + this.player.height >= this.obstaclesBottom[0].posY) {

            return true
        }

        if (this.player.posX <= this.obstaclesTop[0].posX + this.obstaclesTop[0].width && this.player.posX + this.player.width >= this.obstaclesTop[0].posX && this.player.posY <= this.obstaclesTop[0].posY + this.obstaclesTop[0].height) {
            return true
        }

        if (this.player.posY >= this.wSize.height) {
            return true
        }

        //fin del juego, detenemos intervalo
    },

    gameOver() {
        //Gameover detiene el juego.
        clearInterval(this.interval);
        alert('GAME OVER')
    },

    drawScore() {
        this.scoreBoard.update(this.score);
    }

}
