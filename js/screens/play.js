game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;


		//searches and loads the map.
		me.levelDirector.loadLevel("level01");

		this.resetPlayer(0, 420);

		var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
		me.game.world.addChild(gameTimerManager, 0);

		var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		me.game.world.addChild(heroDeathManager, 0);

		var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		me.game.world.addChild(experienceManager, 0);

		var spendGold = me.pool.pull("SpendGold", 0, 0, {});
		me.game.world.addChild(spendGold, 0);

		var pauseScreen = me.pool.pull("PauseScreen", 0, 0, {});
		me.game.world.addChild(pauseScreen, 0);

		//binding keys for movement.
		//"right" represents the right key.
		me.input.bindKey(me.input.KEY.Q, "skill1");
		me.input.bindKey(me.input.KEY.W, "skill2");
		me.input.bindKey(me.input.KEY.E, "skill3");
		me.input.bindKey(me.input.KEY.B, "buy");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.SPACE, "jump");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.A, "attack");
		me.input.bindKey(me.input.KEY.F9, "pause");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		//me.audio.playTrack("blankSpace");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//me.audio.stopTrack("Bruno1");
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
	//x and y tells where to set the player on the screen.
	resetPlayer: function(x,y){
		//adding the player to the game screen.
		//0, 420 are the coordinates where we want our player to appear on the map.
		game.data.player = me.pool.pull("player", x, y, {});
		me.game.world.addChild(game.data.player, 5);
	}

});
