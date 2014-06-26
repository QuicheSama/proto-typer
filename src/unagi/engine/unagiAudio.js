var UnagiAudio = function() {
	var context = {};
};

UnagiAudio.prototype.init = function() {
	try{
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();
		console.log('Initializing - Audio');
	}
	catch( e ){
		alert( 'Web Audio API is not supported in this browser' );
	}
}

UnagiAudio.prototype.playSound = function( buffer ){
	var source = context.createBufferSource() 	// create a sound source
	source.buffer = buffer;						// tell the source which sound to play

	source.connect( this.context.destination );	// connect the source to the context destination
	source.start( 0 );							// play the source now
}