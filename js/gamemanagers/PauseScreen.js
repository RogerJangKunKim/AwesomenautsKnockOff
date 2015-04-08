game.PauseScreen = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastPause = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
	},
	update: function(){
		this.now = new Date().getTime();
		if(me.input.isKeyPressed("pause") && this.now-this.lastPause >= 1000){
			this.lastPause = this.now;
			if(!this.paused){
				this.pause();
			}
			else{
				this.unpause();
			}
		}

		return true;
	},
	pause: function(){
		this.paused = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0,0);
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen"));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.8);
		me.game.world.addChild(game.data.buyscreen, 34);
		game.data.player.body.setVelocity(0, 0);
		this.setPauseText();
	},
	unpause: function(){
		this.pause = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(10, 20);
		me.game.world.removeChild(game.data.buyscreen);
		me.game.world.removeChild(game.data.pausetext);
	},
	setPauseText: function(){
		game.data.pausetext = new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PRESS P TO Unpause.", this.pos.x, this.pos.y);
			},
		}));
		me.game.world.addChild(game.data.pausetext, 35); //sets the buytext to 35
	},
	
});