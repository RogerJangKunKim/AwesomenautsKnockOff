//giving the player its properties/initiallizing the player.
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, { //me.Entity is the type.
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64", //tells what width the image we are using is.
			spriteheight: "64", //tells what height the image we are using is.
			getShape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);

		this.body.setVelocity(5, 0);

	},

	update: function(delta){
		if(me.input.isKeyPressed("right")){
			//adds to the position of my x by the velocity defined above
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth.
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		else{
			this.body.vel.x = 0;
		}
		
		this.body.update(delta);
		return true;

	}

});