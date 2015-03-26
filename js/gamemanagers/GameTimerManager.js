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
			game.data.gold += (game.data.exp1 + 1);
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