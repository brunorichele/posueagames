var canvas, context;
var barraWidth, barraHeight;
var jogadorPosX, jogadorPosY, velocidadeJogador;
var oponentePosX, oponentePosY, velocidadeOponente;
var bolaRaio, bolaPosX, bolaPosY, bolaAngulo, velocidadeBola;
var pontosJogador, pontosOponente;
var teclaCimaPressionada, teclaBaixaPressionada;
var oponenteParaCima;
var bolaParaDireita;

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	barraWidth = 30;
	barraHeight = 90;

	pontosJogador = 0;
	pontosOponente = 0;

	// Jogador e oponente
	jogadorPosX = 0;
	jogadorPosY = (canvas.height - barraHeight) / 2;
	velocidadeJogador = 15;
	teclaCimaPressionada = false;
	teclaBaixaPressionada = false;

	oponentePosX = canvas.width - barraWidth;
	oponentePosY = 0;
	velocidadeOponente = 20;
	oponenteParaCima = false;

	// Bola
	bolaRaio = 10;
	bolaPosX = canvas.width - bolaRaio;
	bolaPosY = canvas.height / 2;
	velocidadeBola = 15;
	bolaAngulo = 1;
	bolaParaDireita = false;

	// Eventos
	document.addEventListener("keyup", keyUp, false);
	document.addEventListener("keydown", keyDown, false);
	setInterval(gameLoop, 30);
}

function keyDown(e) {
	if (e.keyCode == 38) { // Up
		teclaCimaPressionada = true;
	} else if (e.keyCode == 40) { // Down
		teclaBaixaPressionada = true;
	}
}

function keyUp(e) {
	if (e.keyCode == 38) { // Up
		teclaCimaPressionada = false;
	} else if (e.keyCode == 40) { // Down
		teclaBaixaPressionada = false;
	}
}

function gameLoop() {
	if (teclaCimaPressionada != teclaBaixaPressionada) {
		if (teclaCimaPressionada) {
			if (jogadorPosY > 0) {
				jogadorPosY -= velocidadeJogador;
			}
		} else {
			if (jogadorPosY < (canvas.height - barraHeight)) {
				jogadorPosY += velocidadeJogador;
			}
		}
	}

	if (oponenteParaCima) {
		oponentePosY -= velocidadeOponente;
		if (oponentePosY <= 0) {
			oponenteParaCima = false;
		}
	} else {
		oponentePosY += velocidadeOponente;
		if (oponentePosY > (canvas.height - barraHeight)) {
			oponenteParaCima = true;
		}
	}

	if ((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)) {
		if ((bolaPosY + bolaRaio > jogadorPosY)
				&& (bolaPosY - bolaRaio < jogadorPosY + barraHeight)) {
			bolaParaDireita = true;
		}
	} else if ((bolaPosX + bolaRaio) >= oponentePosX) {
		if ((bolaPosY + bolaRaio > oponentePosY)
				&& (bolaPosY - bolaRaio < oponentePosY + barraHeight)) {
			bolaParaDireita = false;
		}
	}

	if ((bolaPosY - bolaRaio <= 0)
			|| (bolaPosY - bolaRaio >= canvas.height - bolaRaio)) {
		bolaAngulo *= -1;
	}

	bolaPosY += bolaAngulo * 20;

	if (bolaParaDireita) {
		bolaPosX += velocidadeBola;
	} else {
		bolaPosX -= velocidadeBola;
	}
	
	if ((bolaPosX - bolaRaio) <= 0) {
		if ((bolaPosY + bolaRaio <= jogadorPosY)
				|| (bolaPosY - bolaRaio >= jogadorPosY + barraHeight)) {
			pontosOponente++;
			bolaPosX = canvas.width / 2;
			bolaPosY = canvas.height / 2;
			bolaParaDireita = true;
		}
	} else if ((bolaPosX + bolaRaio) >= canvas.width) {
		if ((bolaPosY + bolaRaio <= oponentePosY)
				|| (bolaPosY - bolaRaio >= oponentePosY + barraHeight)) {
			pontosJogador++;
			bolaPosX = canvas.width / 2;
			bolaPosY = canvas.height / 2;
			bolaParaDireita = false;
		}
	}

	// Limpa a tela antes de desenhar
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Linha divisoria
	context.beginPath();
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2, canvas.height);
	context.strokeStyle = "silver";
	context.stroke();
	context.closePath();
	context.fill();

	// Jogador
	context.fillStyle = "blue";
	context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeight);

	// Oponente
	context.fillStyle = "red";
	context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeight);

	// Bola
	context.beginPath();
	context.arc(bolaPosX, bolaPosY, bolaRaio, 0, 2 * Math.PI, true);
	context.closePath();
	context.fillStyle = "gold";
	context.fill();

	// Placar
	var pontosA = pontosJogador;
	var pontosB = pontosOponente;

	if (pontosA < 10) {
		pontosA = "0" + pontosA;
	}

	if (pontosB < 10) {
		pontosB = "0" + pontosB;
	}

	context.font = "42pt Helvetica";
	context.fillStyle = "#000000";
	context.fillText(pontosA + " " + pontosB, (canvas.width / 2) - 70, 50);
}