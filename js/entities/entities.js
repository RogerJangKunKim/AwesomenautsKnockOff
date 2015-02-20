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
		this.type = "PlayerEntity";
		//game.data allows property to be controlled from game.js
		this.health = game.data.playerHealth;
		//adds gravity.
		this.body.setVelocity(game.data.playerMoveSpeed, 20);

		//keeps track of the direction of the character
		this.facing = "right";
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.dead = false;
		this.lastAttack = new Date().getTime();

		//screen will be fixed on wherever the player goes.
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		//selects the sprites to use on the sprite sheet.
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 30);
		this.renderable.addAnimation("jump", [30, 31], 80);

		//sets the default animation.
		this.renderable.setCurrentAnimation("idle");

	},

	update: function(delta){
		this.now = new Date().getTime();
		//restarts the player
		if(this.health <= 0){
			this.dead = true;
		}

		if(me.input.isKeyPressed("right")){
			//adds to the position of my x by the velocity defined above
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth.
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(false);
			this.facing = "right";
			if(me.input.isKeyPressed("up")){
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
			}

		}
		else if(me.input.isKeyPressed("left")){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(true);
			this.facing = "left";
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
		//allows the player to jump once.
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
				this.flipX(true);
			}
		}
		//if player moves to the right, then sets animation to "rwalk."
		else if(this.body.vel.x !==0 && !this.renderable.isCurrentAnimation("attack")){
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}	
		/*else if(this.body.vel.y >0){
			if(!this.renderable.isCurrentAnimation("jump")){
				this.renderable.setCurrentAnimation("jump");
			}
		}*/	

		else if(!this.renderable.isCurrentAnimation("attack")){
			this.renderable.setCurrentAnimation("idle");
		}


		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;

	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	//keeps track of the objects
	collideHandler: function(response){
		if(response.b.type==="EnemyBaseEntity"){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
			//won't let the player go through the base from above.
			if(ydif<-40 && xdif<70 && xdif>-35){
				this.body.falling = false;
				//this.body.vel.y = -1;
			}
			//if on right side, player will be blocked from moving into the base
			else if(xdif>-35 && this.facing==="right" && (xdif<0)){
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x - 1;
			}
			//if on left side, player will be blocked from moving into the base.
			else if(xdif<70 && this.facing==="left" && (xdif>0)){
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x + 1;
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAtack);
			}
		}
		else if(response.b.type==="EnemyCreep"){
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			//keeps us from walking through the enemy creep
			if(xdif>0){
				this.pos.x = this.pos.x + 1;
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			}
			else{
				this.pos.x = this.pos.x - 1;
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit>= game.data.playerAttackTimer
				&& (Math.abs(ydif)<=40) && 
				(((xdif>0) && this.facing === "right") || ((xdif<0) && this.facing==="right"))
				){
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAtack);
			}
		}
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
		this.health = game.data.playerBaseHealth;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "PlayerBase";

		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},
	update:function(delta){
		if(this.health<=0){
			this.broken = true;
			//removes the entity.
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
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
		this.health = game.data.enemyBaseHealth;
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
		
	},
	//everytime a base gets hit, they will lose health.
	loseHealth: function(){
		this.health--;
	}
});

game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);
		this.health = game.data.enemyCreepHealth;
		this.alwaysUpdate = true;
		//lets us know if the enemy is currently attacking.
		this.attacking = false;
		//keeps track of when the creep last attacked.
		this.lastAttacking = new Date().getTime();
		//keeps track of when the creep last hit anything.
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},
	update: function(delta){
		if(this.health<=0){
			me.game.world.removeChild(this);
		}

		this.now = new Date().getTime();

		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);


		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;
	},

		collideHandler: function(response){
			if(response.b.type==='PlayerBase'){
				this.attacking = true;
				//this.lastAttacking = this.now;
				this.body.vel.x = 0;
				//keeps moving to the right to maintain its position
				this.pos.x = this.pos.x + 1;
				//checks that it has been atleast 1 sec since creep hit the base.
				if((this.now - this.lastHit >= game.data.enemyCreepAttackTimer)){
					//updates the lasthit timer
					this.lastHit = this.now;
					//makes the playerbase call its losehealth function and passes it as damage of 1.
					response.b.loseHealth(game.data.enemyCreepAttack);
				}
			}
				else if(response.b.type==='PlayerEntity'){
					var xdif = this.pos.x - response.b.pos.x;

					this.attacking = true;
					//this.lastAttacking = this.now;

					this.body.vel.x = 0;
					
					if(xdif>0){
						//keeps moving to the right to maintain its position

						this.pos.x = this.pos.x + 1;
						this.body.vel.x = 0;
					}
					//checks that it has been atleast 1 sec since creep hit the base.
					if((this.now - this.lastHit >= game.data.enemyCreepAttackTimer) && xdif>0){
						//updates the lasthit timer
						this.lastHit = this.now;
						//makes the playerbase call its losehealth function and passes it as damage of 1.
						response.b.loseHealth(game.data.enemyCreepAttack);
					}
				}
			}

		
});

game.GameManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();

		this.alwaysUpdate = true;
	},

	
	update: function(){
		this.now = new Date().getTime();

		//asks if the player is dead.
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}
		//makes sure that this.now is a multiple of 10(%).
		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0);
			me.game.world.addChild(creepe, 2);
		} 
		return true;
	}
});