function Game(id, width, height) {
    this.id = id;
    this.width = width;
    this.height = height;

    //game components
    this.player = null;
    this.ball = null;
    this.level = null;
    this.canvas = null;
    this.context = null;

    //hud
    this.pontosJogador = 0;
    this.pontosOponente = 0;

    //key handlers
    this.keys = {
        left: false,
        right: false
    };

    this.posicaoInicial = this.height / 2;
    this.timer = null;
    this.delay = 0;
}

Game.prototype.init = function () {
    this.canvas = document.getElementById(this.id);
    this.context = this.canvas.getContext('2d');

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.player = new Player((this.width - 40) / 2, this.height - 30, 80, 15, ImageLoader.get('player'));

    this.ball = new Ball(this.width / 2, this.height / 2, 10);
    this.ball.speed = 15;
    this.ball.angle = Math.floor(Math.random() * 21) - 10;

    this.level = new Level();
    this.level.init();
};

Game.prototype.start = function () {
    var self = this;

    this.timer = setInterval(function () {
        self.update();
    }, 30);
};

Game.prototype.update = function () {
    //move player
    if (this.keys.right != this.keys.left) {
        if (this.keys.left) {
            if (this.player.x > 0) {
                this.player.moveLeft();
            }
        } else {
            if (this.player.x < (this.width - this.player.width)) {
                this.player.moveRight();
            }
        }
    }

    if (this.delay <= 0) {
        //move ball
        if (this.player.collidesWithBall(this.ball)) {
            this.ball.diretionUp = true;
            if (this.keys.right) {
                this.ball.angle = Math.floor(Math.random() * 10) - 9;
            }
            else {
                this.ball.angle = Math.floor((Math.random() * 10));
            }
        }

        if ((this.ball.y - this.ball.radius) <= 0) {
            if (this.keys.right) {
                this.ball.angle = Math.floor(Math.random() * 10);
            }
            else {
                this.ball.angle = Math.floor(Math.random() * 10) -9;
            }     
            this.ball.diretionUp = false;            
        }

        if ((this.ball.x - this.ball.radius <= 0) || (this.ball.x + this.ball.radius > this.width)) {
            this.ball.angle = this.ball.angle * -1;
        }

        this.ball.x += this.ball.angle;

        if (this.ball.diretionUp) {
            this.ball.y -= this.ball.speed;
        } else {
            this.ball.y += this.ball.speed;
        }                    
    }              

    //miss
    if (this.ball.y > this.height) {
        if (this.delay >= 50) {
            this.pontosOponente++;

            this.ball.x = this.width / 2;
            this.ball.y = this.posicaoInicial;
            this.ball.diretionUp = false;
            this.ball.angle = Math.floor(Math.random() * 21) - 10;
            this.delay = 0;
        }
        else {
            this.delay++;
        }
    }

    //destroy bars
    for (var i in this.level.bars) {
        var colisao = this.level.bars[i].collidesWithBall(this.ball);

        if (colisao) {
            this.level.bars.splice(i, 1);

            this.ball.diretionUp = !this.ball.diretionUp;

            this.ball.angle = Math.floor((Math.random() * 10));

            this.pontosJogador++;
        }
    }

    //check game over
    if (!this.level.hasBars()) {
        this.gameOver(this.context);
        return;
    }

    this.clear();

    //render all
    this.level.draw(this.context);

    this.player.draw(this.context);

    this.ball.draw(this.context);

    this.drawHud();
};

Game.prototype.drawHud = function () {
    var pontosA = this.pontosJogador;
    var pontosB = this.pontosOponente;

    if (this.pontosJogador < 10) {
        pontosA = '0' + this.pontosJogador;
    }
    if (this.pontosOponente < 10) {
        pontosB = '0' + this.pontosOponente;
    }

    this.context.font = '24pt Tr2n';
    this.context.fillStyle = '#00ffff';
    this.context.fillText(pontosA + ' ' + pontosB, (this.width / 2) + 180, 40);
};

Game.prototype.gameOver = function () {
    this.clear();

    this.context.font = '42pt Helvetica';
    this.context.fillStyle = '#fff';
    this.context.fillText('GAME OVER!', (this.width / 2) - 180, 40);

    clearInterval(this.timer);
};

Game.prototype.clear = function () {
    this.canvas.width = this.canvas.width;
};