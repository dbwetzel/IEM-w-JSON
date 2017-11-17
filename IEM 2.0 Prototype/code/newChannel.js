inlets = 1;
outlets = 2;

var channels = [];
var width = 97;
var height = 269;
var numChannels = 0;
var modName = "testMixer";

function msg_int(x){
	
	
	channels.push(x);
	
	outlet(0, channels);
	
	}
	
function newChannel(){
	var a = arrayfromargs(arguments);
	
	if(a.length > 0){
		
		for(var i = 0; i < a[0]; i++){
			var p = patcher.newdefault(0, 0, "bpatcher", "mixer.channel.iem", "@args", modName + ".input[" + numChannels + "]", "@border", 2, "@varname", "testMixer.input[0]", "@bgmode", 1);		
			var offset = width * numChannels;
			p.rect = [offset, 0, offset + width, height];
			numChannels ++;
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
