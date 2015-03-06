game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},
	
	update: function(){
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();
		return true;
	},

	goldTimerCheck: function(){
		//gives you 1 gold for every other enemy creep that spawns. so every 20 seconds
		if(Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += 1;
			console.log("Current gold: " + game.data.gold);
		} 
	},

	creepTimerCheck: function(){
		//makes sure that this.now is a multiple of 10(%).
		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0);
			me.game.world.addChild(creepe, 2);
		} 
	},

});

game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},

	update: function(){
		//asks if the player is dead.
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}
		return true;
	},
});

game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		//makes it that you will not gain extra exp from destroying a tower.
		this.gameOver = false;
	},

	update: function(){
		if(game.data.win === true && !this.gameover){
			this.gameOver(true);
		}
		else if(game.data.win === false && !this.gameover){
			this.gameOver(false);
		}
		return true;
	},

	gameOver: function(win){
		if(win){
			game.data.exp += 10;
		}	
		else{
			game.data.exp += 1;
		}
			console.log(game.data.exp);
			this.gameover = true;
			me.save.exp = game.data.exp;
	},
});