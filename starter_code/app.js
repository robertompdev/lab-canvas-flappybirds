const flappyBird = {
    name: 'Flappy Bird',
    description: 'HTML5 Canvas',
    author: ['Luciano', 'Roberto'],
    license: undefined,
    version: 'beta',
    canvasDom: undefined,
    ctx: undefined,
    obs: undefined,
    obstacles: [],
    fpsCounter: 60,
    framesCounter: 0,
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

        this.setEventListeners()
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

        }, 1000 / this.fpsCounter)
    },

    reset() {

        this.background = new Background(this.ctx, this.wSize.width, this.wSize.height)
        this.player = new Player(this.ctx, this.wSize.width, this.wSize.height);
        this.obstacles = [];


    },

    drawAll() {
        this.background.draw();
        this.player.draw(this.framesCounter);
        this.obstacles.forEach(obs => obs.draw());


    },



    setEventListeners() {

    },

    moveAll() {
        this.background.move();
        this.player.move();
        this.obstacles.forEach(obs => obs.move());

    },

    clear() {
        this.ctx.clearRect(0, 0, this.wSize.width, this.wSize.height);
    },

    generateObstacles() {
        if (this.framesCounter % 70 == 0) {
            //Generamos obstaculos cada 70 frames.
            this.obstacles.push(new Obstacle(this.ctx, this.wSize.width, this.wSize.posY0, this.player.height)); //pusheamos nuevos obstaculos
            console.log(this.obstacles)
        }
    },

    clearObstacles() {
        //funcion para limpiar obs
        this.obstacles.forEach((obs, idx) => {
            if (obs.posX <= 0) {
                this.obstacles.splice(idx, 1);
            }
        });
    },

    isCollision() {
        // funcion para comprobar colisiones

        return this.obstacles.some(
            obs =>
                this.player.posX + this.player.width >= obs.posX &&
                this.player.posY + this.player.height >= obs.posY &&
                this.player.posX <= obs.posX + obs.width
        );
        //fin del juego, detenemos intervalo
    },

    gameOver() {
        //Gameover detiene el juego.
        clearInterval(this.interval);
    }

}
