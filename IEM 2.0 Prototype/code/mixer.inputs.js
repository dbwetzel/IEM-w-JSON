inlets = 1;
outlets = 2;

var channels = [];
var width = 97;
var height = 269;
var numChannels = 0;
var numOuts = 0;
var modName = "testMixer";

function bang(){
	//output a dummy input object
	var obj = {
		"input" : [
			{
			"parameters" : {
				"trim" : 127,
				"panA" : 64,
				"faderA" : 100
			},
			"controls" : {
				"trimcc" : "foobar"
			},
			"audio" : {}
			},
			{
			"parameters" : {
				"trim" : 127,
				"panA" : 0,
				"faderA" : 127
			},
			"controls" : {},
			"audio" : {}
			},
			{
			"parameters" : {
				"trim" : 108,
				"panA" : 80,
				"faderA" : 111
			},
			"controls" : {},
			"audio" : {}
			},
			{
			"parameters" : {
				"trim" : 127,
				"panA" : 64,
				"faderA" : 127
			},
			"controls" : {},
			"audio" : {}
			}
		]
	};
	
	outlet(0, JSON.stringify(obj.input));
}


function msg_int(x){
	
	
	channels.push(x); //add to an array
	
	outlet(0, channels);
	
	}
	
function input(){
	
	var a = arrayfromargs(arguments);
	
	// first arg should be the mod Name
	var modName = a[0];
	
	//second arg is stringified JSON
	var obj = JSON.parse(a[1]);
	
	if(typeof obj == "object"){ // we are expecting an array of objects here
		
		for(var i = 0; i < obj.length; i++){
			if(typeof obj[i] == "object"){
				var inputObj = new Object();
				inputObj = obj[i];
				//add a name field
				inputObj["name"] = modName + ".input[" + i + "]";
				//send to a named Max receive object
				messnamed(inputObj.name, JSON.stringify(inputObj)); 
			}
		}
	}
}
	
// add new input channels if necessary
function newInputs(){
	var a = arrayfromargs(arguments);
	
	if(a.length > 1){
		
		modName = a[0]; // first arg should be the module name
		var start = numChannels;
		// if the number of channels is bigger than the current channel count, add more channels
		if(a[1] > numChannels && typeof(a[1]) == "number"){
			for(var i = start; i < a[1]; i++){
				var inputName = modName + ".input[" + i + "]";
				var p = patcher.newdefault(
					0, 0, "bpatcher", "mixer.channel.iem", 
					"@args", inputName, "@varname", inputName,
					"@border", 2, "@bgmode", 1);		
				var offset = width * numChannels;
				p.rect = [offset, 0, offset + width, height];
				numChannels ++;
			}
		}
	}
}

function newOutputs(){
	
	post("output section coming soon!");
	post();

	var a = arrayfromargs(arguments);
	
	if(a.length > 1){
		
		modName = a[0]; // first arg should be the module name
		var start = numOuts;
		// if the number of channels is bigger than the current channel count, add more channels
		if(a[1] > numOuts && typeof(a[1]) == "number"){
			for(var i = start; i < a[1]; i++){
				var outputName = modName + ".output[" + i + "]";
/*				var p = patcher.newdefault(
					0, 0, "bpatcher", "mixer.out.iem", 
					"@args", outName, "@varname", outName,
					"@border", 2, "@bgmode", 1);		
				var offset = width * numChannels;
				p.rect = [offset, 0, offset + width, height];
*/
				numOuts ++;
				post(outputName);
				post();
			}
		}
	}	
	
}

	
function deleteChannel(){ // takes channel number and deletes corresponding mixer inputs
	
	var a = arrayfromargs(arguments); //get arguments

	if(a.length == 0){ //check for args
		error("no arguments to deleteMods()\n");
		error("usage: deleteChannels [all || num] \n");
		return;
		// this would happen for the message "deleteChannel" with no arguments	
	}
	
/*	var d = new Dict("IEM-modules"); // get a reference to the list of mods
	var keys = d.getkeys();
	if(keys == null){
		error("no keys in Dict IEM-modules\n");
		return;
	}
*/	
	if(a[0] == "all"){
			post("num channels: " + numChannels);
			post();

			for(var i = 0; i < numChannels; i ++){
				var chan = modName + ".input[" + i + "]";
				post("deleting mod: " + chan);
				post();
				var deleteChan = patcher.getnamed(chan); // get a reference to the mod
				if(deleteChan){ //check to make sure something got returned
					patcher.remove(deleteChan);
				}
			}
			numChannels = 0;

	}
	if (typeof(a[0]) == "number"){	
		//should use the argument as a number of channels to delete starting from the highest index
		post("deleting " + a[0] + " of " + numChannels + " channel strips");
		post();
		post("typof(a[0]): " + typeof(a[0]));
		post();
		var j;
		for(j = 0; j < a[0]; j ++){
			var chanIndex = numChannels - j - 1;
			post("deleting channel " + chanIndex);
			post();
			var chan = modName + ".input[" + chanIndex + "]";
			var deleteChan = patcher.getnamed(chan); // get a reference to the mod
			if(deleteChan){ //check to make sure something got returned
				patcher.remove(deleteChan); // remove the mod from the patcher
			}
		}
		numChannels -= j;
	} 
} // end deleteMods()
