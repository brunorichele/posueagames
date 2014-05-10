//Classe  Inimigos

function Inimigos(ctx,width,height){
	this.ctx = ctx;

	this.inimigos = [[1,1,0,1,1],
	                 [1,1,0,1,1],
	                 [1,1,0,1,1],
	                 [1,1,0,1,1],
	                 [1,1,0,1,1]];

//	this.inimigos = [[1,1,1,1,1],
//	                 [1,1,1,1,1],
//	                 [1,1,1,1,1],
//	                 [1,1,1,1,1],
//	                 [1,1,1,1,1]];

//	this.inimigos = [[1,0,0,0,1],
//	                 [1,0,0,0,1],
//	                 [1,0,0,0,1],
//	                 [1,0,0,0,1],
//	                 [1,0,0,0,1]];
	
	this.width = (width/this.inimigos.length) -1;
	this.height = 20; 
	this.DISTANCIA = 1;
	
	this.desenhaInimigos = function(){
		for(var i =0; i < this.inimigos.length; i++){
			for(var j =0; j < this.inimigos[i].length; j++){
				if(this.inimigos[i][j] == 1){
					this.ctx.beginPath();
					this.ctx.fillStyle = "#000000";
					this.ctx.rect((j*(this.width + this.DISTANCIA)) + this.DISTANCIA,(i*(this.height + this.DISTANCIA)) + this.DISTANCIA, this.width,this.height);
					this.ctx.closePath();
					this.ctx.fill();
				}
			}
		}
	}
		
}