game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	 //initializes the background tiles/player images/tower images.
	 {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
	 {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
	 {name: "player", type:"image", src: "data/img/archer.png"},
	 {name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
	 {name: "creep1", type:"image", src: "data/img/brainmonster.png"},
	 {name: "creep2", type:"image", src: "data/img/gloop.png"},
	 {name: "title-screen", type:"image", src: "data/img/title.png"},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
 	 //initializes the maps.
 	 {name: "level01", type: "tmx", src: "data/map/test.tmx"},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	
	 {name: "Sleep_Away", type: "audio", src: "data/bgm/"},
	 {name: "ariana1", type: "audio", src: "data/bgm/"},
	 {name: "beauty", type: "audio", src: "data/bgm/"},
	 {name: "bruno1", type: "audio", src: "data/bgm/"},

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
	 {name: "jump", type: "audio", src: "data/sfx/"}
];
