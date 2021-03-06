game.PlayerCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "creep2",
			width: 100,
			height: 85,
			spritewidth: "100",
			spriteheight: "85",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 85)).toPolygon();
			}
		}]);
		this.health = game.data.playerCreepHealth;
		this.alwaysUpdate = true;
		//lets us know if the enemy is currently attacking.
		this.attacking = false;
		//keeps track of when the creep last attacked.
		this.lastAttacking = new Date().getTime();
		//keeps track of when the creep last hit anything.
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		this.body.setVelocity(3, 20);

		this.type = "PlayerCreep";

		this.renderable.addAnimation("walk", [0, 1, 2, 3, 4], 80);
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

		this.body.vel.x += this.body.accel.x * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);


		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		this.flipX(true);

		return true;
	},

		collideHandler: function(response){
			if(response.b.type==='EnemyBaseEntity' || response.b.type==='EnemyCreep'){
				this.attacking = true;
				//this.lastAttacking = this.now;
				this.body.vel.x = 0;
				//keeps moving to the right to maintain its position
				this.pos.x = this.pos.x - 1;
				//checks that it has been atleast 1 sec since creep hit the base.
				if((this.now - this.lastHit >= game.data.playerCreepAttackTimer)){
					//updates the lasthit timer
					this.lastHit = this.now;
					//makes the playerbase call its losehealth function and passes it as damage of 1.
					response.b.loseHealth(game.data.playerCreepAttack);
				}
			}
				//else if(response.b.type==='EnemyCreep'){
				//	var xdif = this.pos.x - response.b.pos.x;
//
//					this.attacking = true;
//					//this.lastAttacking = this.now;
//
//					//this.body.vel.x = 0;
//					
//					if(xdif<0){
//						//keeps moving to the right to maintain its position
//
//						this.pos.x = this.pos.x - 1;
//						this.body.vel.x = 0;
//					}
//					//checks that it has been atleast 1 sec since creep hit the base.
//					if((this.now - this.lastHit >= game.data.creepAttackTimer) && xdif>0){
//						//updates the lasthit timer
//						this.lastHit = this.now;
//						//makes the playerbase call its losehealth function and passes it as damage of 1.
//						response.b.loseHealth(game.data.playerCreepAttack);
//					}
//				}
			}

		
});


