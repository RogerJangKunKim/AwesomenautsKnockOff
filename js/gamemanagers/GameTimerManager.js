game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.lastCreep2 = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},
	
	update: function(){
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();
		this.playerCreepTimerCheck();
		return true;
	},

	goldTimerCheck: function(){
		//gives you 1 gold for every other enemy creep that spawns. so every 20 seconds
		if(Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += (game.data.exp1 + 1);
			console.log("Current gold: " + game.data.gold);
		} 
	},

	creepTimerCheck: function(){
		//makes sure that this.now is a multiple of 10(%).
		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 500)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
		} 
	},
	playerCreepTimerCheck: function(){
		//makes sure that this.now is a multiple of 10(%).
		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep2 >= 500)){
			this.lastCreep2 = this.now;
			var creepee = me.pool.pull("PlayerCreep", 0, 0, {});
			me.game.world.addChild(creepee, 5);
		} 
	},

});