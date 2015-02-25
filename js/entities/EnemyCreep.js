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
		//IF I PUT DAMAGE IT WILL NOT WORK
		this.health = this.health - 1;
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


