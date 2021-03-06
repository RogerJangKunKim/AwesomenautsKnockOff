//giving the player its properties/initiallizing the player.
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings){
		//refactored this init function.
		this.setSuper(x, y);
		this.setPlayerTimers();
		this.setAttributes();
		this.type = "PlayerEntity";
		this.setFlags();

		//screen will be fixed on wherever the player goes.
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		this.addAnimation();

		//sets the default animation.
		this.renderable.setCurrentAnimation("idle");
	},
	setSuper: function(x, y){
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
	},
	setPlayerTimers: function(){
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastSpear = this.now;
		this.lastAttack = new Date().getTime();
	},
	setAttributes: function(){
		//game.data allows property to be controlled from game.js
		this.health = game.data.playerHealth;
		//adds gravity.
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		this.attack = game.data.playerAttack;

	},
	setFlags: function(){
		//keeps track of the direction of the character
		this.facing = "right";
		this.dead = false;
	},
	addAnimation: function(){
		//selects the sprites to use on the sprite sheet.
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
		this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 30);
		this.renderable.addAnimation("jump", [30, 31], 80);
	},

	update: function(delta){
		this.now = new Date().getTime();
		this.dead = this.checkIfDead();
		this.checkKeyPressesAndMovement();
		this.checkAbilityKeys();
		this.setAnimation();

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;
	},
	checkIfDead: function(){
		//restarts the player
		if(this.health <= 0){
			return true;
		}
		return false;
	},
	checkKeyPressesAndMovement: function(){
		if(me.input.isKeyPressed("right")){
			this.moveRight();
		}
		else if(me.input.isKeyPressed("left")){
			this.moveLeft();
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
			this.jump();
		}

		this.attacking = me.input.isKeyPressed("attack");
	},
	moveRight: function(){
		//adds to the position of my x by the velocity defined above
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth.
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(false);
			this.facing = "right";
			if(me.input.isKeyPressed("up")){
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
			}
	},
	moveLeft: function(){
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.facing = "left";
			this.flipX(true);
			if(me.input.isKeyPressed("up")){
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
			}
	},
	jump: function(){
		this.body.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
		me.audio.play("jump");
	},
	checkAbilityKeys: function(){
		if(me.input.isKeyPressed("skill1")){

		}
		else if(me.input.isKeyPressed("skill2")){

		}
		else if(me.input.isKeyPressed("skill3")){
			this.throwSpear();
		}
	},
	throwSpear: function(){
		if((this.now - this.lastSpear) >= game.data.spearTimer && game.data.ability3 > 0){
			this.lastSpear = this.now;
			var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
			me.game.world.addChild(spear, 10);
		}
	},
	setAnimation: function(){
		if(this.attacking){
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
	},

	loseHealth: function(damage){
		//loses health according to the damage.
		this.health = this.health - damage;
	},

	//keeps track of the objects
	collideHandler: function(response){
		if(response.b.type==="EnemyBaseEntity"){
			this.collideWithEnemyBase(response);
		}
		else if(response.b.type==="EnemyCreep"){
			this.collideWithEnemyCreep(response);
		}
	},
	collideWithEnemyBase: function(response){
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
	},
	collideWithEnemyCreep: function(response){
		var xdif = this.pos.x - response.b.pos.x;
		var ydif = this.pos.y - response.b.pos.y;

		this.stopMovement(xdif);
		//will only execure if return is true.
		if(this.checkAttack(xdif, ydif)){
			this.hitCreep(response);
		};
	},
	stopMovement: function(xdif){
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
	},
	checkAttack: function(xdif, ydif){
		if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit>= game.data.playerAttackTimer
			&& (Math.abs(ydif)<=40) && 
			(((xdif>0) && this.facing === "right") || ((xdif<0) && this.facing==="right"))
			){
			this.lastHit = this.now;
			return true;
		}
		return false;
	},
	hitCreep: function(response){
		//if the creep's health is less than or equal to our attack, then execute code in statement
		if(response.b.health <= game.data.playerAttack){
			//adds one gold for a creep kill
			game.data.gold += 1;
		}
		response.b.loseHealth(game.data.playerAtack);
	},
});

