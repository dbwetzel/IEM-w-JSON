inlets = 2;
outlets = 3;

var voices = new Array(16);

for(var i = 0; i < voices.length; i++){
	voices[i] = "free";
	}

function bang(){
	// find next "free" voice
	var index;
	for(var i = 0; i < voices.length; i ++){
		if (voices[i] == "free"){
			i ++;
			outlet(0, i);
			return;
		}
	}
	error("no ramp voices availabel!");

}

function msg_int(x){
	
	if(inlet == 1){ // right inlet
		
		//resize the voices array to x
		if(x > voices.length){
			for(var i = voices.length; i < x; i ++){
				voices.push("free");
				//add free voices
			}
			
		} else {
			for(var j = voices.length; j > x; j --){
				voices.pop();
				// remove voices
			}
		}		

		outlet(2, x + " " + voices);
	}
}
	
function list(){

	var a = arrayfromargs(arguments);
	
	var ind = a[0] - 1;
	
	voices[ind] = a[1];
	
	outlet(2, voices);

	
}