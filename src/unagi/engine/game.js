var Game = {
	log : {},
	pressedKeys : [],
	audio_keyStroke : "assets/sound/typewriter-key-1.mp3",
	storedSound : {},
	audioEngine : {},

	wordList : [
		'apple',
		'app',
		'banana', 
		'cherry',
		'durian',
		'elegant',
		'fairy',
		'garry'
	],

	init : function() {
		this.audioEngine = new Howl( {
			urls: [ this.audio_keyStroke ],
			sprite : {
				stroke : [ 0, 1000 ],
			}
		} );

		var keyDownProxyFunc = $.proxy( this.keyDownEventHandler, this );
		var keyUpProxyFunc = $.proxy( this.keyUpEventHandler, this );

		$(document.body).keydown( keyDownProxyFunc );
		$(document.body).keyup( keyUpProxyFunc);
		
		log = $( '#log' )[0];
	},

	start : function() {

	},

	testTrie : function() {
		var head = new Trie( );

		for( var index = 0; index < this.wordList.length; index++ ){
			console.log( this.wordList[ index ] );
			head.put( this.wordList[ index ] );
		}
		console.log( head );
		console.log( head.get( 'happy' ) )
		console.log( head.get( 'apple' ) )
		console.log( head.get( 'app' ) )
		console.log( head.get( 'banana' ) )

		head.nuke( 'appraise' );
		head.nuke( 'apple' );
		head.nuke( 'warrent' );
		console.log( head.get( 'apple' ) );
		console.log( head );
	},

	keyDownEventHandler : function( event ){
		var storedSound = new Audio( );
		storedSound.src = this.audio_keyStroke;

		this.debugKeyDown( event, true ); 
		//storedSound.play();

		this.audioEngine.play( 'stroke' );
	},

	keyUpEventHandler : function( event ){
		this.debugKeyDown( event, false ); 
	},


	debugKeyDown : function( event, bKeyDown ){
		
		//check to see if the keys have been pressed already
		var list = this.pressedKeys[ event.keyCode ];
		var eventType = "Up Keys: ";
		
		//If they haven't, create the list elements for them
		if( !list ) {
			list = log.appendChild( document.createElement( 'li' ) );
		} 

		//If it is key down, add it to the list and remove any key-up classes
		if( bKeyDown ) {
			this.pressedKeys[ event.keyCode ] = list;
			$( list ).removeClass( 'key-up' );
			var eventType = "Down Keys: ";
		}	
		else{
			$( list ).addClass( 'key-up' );
		}

		$( list ).text( eventType + event.keyCode );
	}

};

