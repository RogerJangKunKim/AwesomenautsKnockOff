game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("title-screen")), -10); // TODO

		
		//used to get to the PLAY screen
		me.input.bindKey(me.input.KEY.ENTER, "start");

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Arial", 46, "white");
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Fake Awesomenauts", 450, 130);
				this.font.draw(renderer.getContext(), "Press ENTER to play", 250, 530);
			}
		})));

		//we need event handler to pass in info
		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
			//action is whatever key was pressed
			if(action === "start"){
				//changes the screen to the play screen.
				me.state.change(me.state.PLAY);
			}
		});
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//disbales the ENTER key so that players can not got back to the play screen by pressing enter.
		me.input.unbindKey(me.input.KEY.ENTER); // TODO
		me.event.unsubscribe(this.handler);
	}
});
