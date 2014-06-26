function Trie( prefix ) {
	//The 'prefix' of the word (i.e. the letters that lead up to this node)
	this.prefix = prefix;	

	//Flag dictating whether this is a real word
	this.isWord = false;
}

Trie.prototype.put = function( word ) {
	var node = this;
	var wordLength = word.length;
	var currentLetter;

	for( var index = 0; index < wordLength; index++ ){
		currentLetter = word[ index ];
		
		if( node[ currentLetter ] ){
			//If a node exists for this letter, move to that node
			node = node[ currentLetter ];
		}
		else{
			//Otherwise create a new node, and move there
			var prefix = word.substring( 0, index + 1)
			node[ currentLetter ] = new Trie( prefix ); 
			node = node[ currentLetter ];
		}
	}

	node.isWord = true;
}

Trie.prototype.get = function( word ) {
	var node = this;
	var wordLength = word.length;
	var currentLetter;

	var isFound = false;

	for( var index = 0; index < wordLength; index++ ) {
		currentLetter = word[ index ];

		//If the letter doesn't exist, return false
		if( !node[currentLetter] ){
			return false
		}

		//Otherwise Continue down the tree
		node = node[ currentLetter ]
	}

	//Return the tag of the last letter in the word
	return node.isWord;
}


Trie.prototype.nuke = function( word ) {
	var node = this;
	var wordLength = word.length;
	var currentLetter;
	var currentNode;

	var prevWord = node;
	var prevWordIndex = 0;

	var found = false;
	var index = 0;

	for( index = 0; index < wordLength; index++ ) {
		currentLetter = word[ index ];
		currentNode = node[ currentLetter ];

		if( !currentNode ){
			break;
		}

		// If we find a word before we finish searching, 
		// set it as the previous word 
		if( currentNode.isWord && currentNode.prefix !== word ){
			prevWord = node[ currentLetter ];
			prevWordIndex = index;
		}

		node = node[ currentLetter ]; 
	}

	found = node.isWord;

	if( !found ){
		return false;
	}
	
	// Find the next node that would lead to the desired word
	// And nuke it
	delete prevWord[ word[ prevWordIndex + 1] ];

	return true;
}