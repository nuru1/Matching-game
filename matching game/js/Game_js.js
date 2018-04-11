var mArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J'];
var mValues = [];
var mTile_ids = [];
var tiles_flipped = 0;
var color='pp.jpg';

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard(){
	tiles_flipped = 0;
	var output = '';
    mArray.memory_tile_shuffle();
	for(var i = 0; i < mArray.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlip(this,\''+mArray[i]+'\')"></div>';
	}
	document.getElementById('mBoard').innerHTML = output;
}

function memoryFlip(tile,val){
	if(tile.innerHTML == "" && mValues.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(mValues.length == 0){
			mValues.push(val);
			mTile_ids.push(tile.id);
		} else if(mValues.length == 1){
			mValues.push(val);
			mTile_ids.push(tile.id);
			if(mValues[0] == mValues[1]){
				tiles_flipped += 2;
				// Clear both arrays
				mValues = [];
            	mTile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == mArray.length){
					alert("Board cleared... generating new board");
					document.getElementById('mBoard').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(mTile_ids[0]);
				    var tile_2 = document.getElementById(mTile_ids[1]);
				    tile_1.style.background = 'black';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'black';
					tile_2.innerHTML = "";
				    // Clear both arrays
				    mValues = [];
            	    mTile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}