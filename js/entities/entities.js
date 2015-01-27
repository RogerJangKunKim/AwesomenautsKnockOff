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
		//adds gravity.
		this.body.setVelocity(10, 20);

		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("rwalk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 30);
		this.renderable.addAnimation("lwalk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 30);

		this.renderable.setCurrentAnimation("idle");

	},

	update: function(delta){
		if(me.input.isKeyPressed("right")){
			//adds to the position of my x by the velocity defined above
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth.
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			if(me.input.isKeyPressed("up")){
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
			}

		}
		else if(me.input.isKeyPressed("left")){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			if(me.input.isKeyPressed("up")){
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
			}
		}
		else if(me.input.isKeyPressed("up")){
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}
		else if(me.input.isKeyPressed("down")){
			this.body.vel.y += this.body.accel.y * me.timer.tick;
		}

		else{
			this.body.vel.x = 0;
			this.body.vel.y = 5;

		}

		if(this.body.vel.x >0){
			if(!this.renderable.isCurrentAnimation("rwalk")){
				this.renderable.setCurrentAnimation("rwalk");
			}
		}	
		else if(this.body.vel.x <0){
			if(!this.renderable.isCurrentAnimation("lwalk")){
				this.renderable.setCurrentAnimation("lwalk");
			}
		}	

		else{
			this.renderable.setCurrentAnimation("idle");
		}

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;

	}

});