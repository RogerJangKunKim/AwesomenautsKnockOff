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

		//screen will be fixed on wherever the player goes.
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		//selects the sprites to use on the sprite sheet.
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		this.renderable.addAnimation("rwalk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 30);
		this.renderable.addAnimation("lwalk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 30);
		this.renderable.addAnimation("jump", [30, 31], 80);

		//sets the default animation.
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
			else if(me.input.isKeyPressed("attack")){
				if(!this.renderable.isCurrentAnimation("attack")){
					//sets current animation to attack then back to idle
					this.renderable.setCurrentAnimation("attack", "idle");
					//starts from first animation not from where left off.
					this.renderable.setAnimationFrame();
					this.flipX(true);
				}
			}

		}
		else if(me.input.isKeyPressed("left")){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			if(me.input.isKeyPressed("up")){
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
			}
			else if(me.input.isKeyPressed("attack")){
				if(!this.renderable.isCurrentAnimation("attack")){
					//sets current animation to attack then back to idle
					this.renderable.setCurrentAnimation("attack", "idle");
					//starts from first animation not from where left off.
					this.renderable.setAnimationFrame();
					this.flipX(false);
				}
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

		if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
			this.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}



		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets current animation to attack then back to idle
				this.renderable.setCurrentAnimation("attack", "idle");
				//starts from first animation not from where left off.
				this.renderable.setAnimationFrame();
			}
		}
		//if player moves to the right, then sets animation to "rwalk."
		else if(this.body.vel.x >0){
			if(!this.renderable.isCurrentAnimation("rwalk")){
				this.renderable.setCurrentAnimation("rwalk");
			}
		}	
		else if(this.body.vel.x <0){
			if(!this.renderable.isCurrentAnimation("lwalk")){
				this.renderable.setCurrentAnimation("lwalk");
			}
		}	
		else if(this.body.vel.y >0){
			if(!this.renderable.isCurrentAnimation("jump")){
				this.renderable.setCurrentAnimation("jump");
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

//gives property to the player and enemy base.
game.PlayerBaseEntity = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "PlayerBaseEntity";

		this.renderable.addAnimation("idle", [0]);
		this.renderable.setCurrentAnimation("idle");
	},
	update:function(delta){
		if(this.health<=0){
			this.broken = true;

			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){

	}
});

game.EnemyBaseEntity = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";

		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},
	update:function(delta){
		if(this.health<=0){
			this.broken = true;

			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){
		
	}
});