// Bola (JS Object)
var bola = {
	raio: 10, 
	x: null, 
	y: null,
	baixo: false,
	angulo: 5,
	velocidade: 10,
	resetX : null,
	resetY : null,
	init : function(width, y){//largura do canvas e y do jogador
		bola.resetX = bola.x = width / 2;
		bola.resetY = bola.y = y - bola.raio;
	},
	render : function(root){
		root.fillStyle = "red";
		root.beginPath();
		root.arc(bola.x, bola.y, bola.raio, 0, Math.PI*2, true);
		root.closePath();
		root.fill();
	},
	atualizar : function(y, x, w, width, height){
		// Movimentação bola
		if(bola.baixo){
			// Colisão jogador
			if(bola.y + bola.raio >= y && bola.x - bola.raio >= x && bola.x + bola.raio <= x + w){
				bola.baixo = false;
			}
			bola.y += bola.velocidade;
		}
		else {
			bola.y -= bola.velocidade;
		}
		// Colisão paredes
		if(bola.x - bola.raio <= 0 || bola.x + bola.raio >= width){
			bola.angulo *= -1;
		}
		// TODO: no momento a colisão com o piso está rebatendo a bola, mas
		// deverá contar como derrota
		if(bola.y - bola.raio <= 0 || bola.y + bola.raio >= height){
			bola.baixo = !bola.baixo;
		//	bola.clear(); // A bola retorna a posicao inicial
		//	jogador.clear(); // O jogador retorna a posicao inicial
		}
		// TODO: colisão blocos
		bola.x += bola.angulo;	
	},
	clear : function()
	{
		bola.x = bola.resetX;
		bola.y = bola.resetY;	
		bola.baixo = false;
		bola.angulo = 5;
		bola.velocidade = 10;		
	}
};