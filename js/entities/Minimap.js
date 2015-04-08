game.MiniMap = me.Entity.extend({
	init: function(x, y ,settings) {
		this._super(me.Entity, "init", [x, y, {
			imager: "minimap",
			width: 158,
			height: 90,
			spritewidth: "158",
			spriteheight: "90",
			getShape: function(){
				return (new me.Rect(0, 0, 158, 90)).toPolygon();
			},
		}]);
		this.floating = true;
	}
});