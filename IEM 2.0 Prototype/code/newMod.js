inlets = 2; 
outlets = 2;

var modules = [];

function bang(){
	var newModObj = {
		"newmod": [
			{
				"file": "fader.iem.maxpat",
				"name": "faderTest",
				"rax" : 1,
				"comments": "test a mess of parameters"
			}, {
				"file": "delayJSON.iem.maxpat",
				"name": "delayTest",
				"rax" : 2,
				"comments": "standardized delay processor"
			}
		]
	};
	
	
	//send a stringified object to the (experimental) newModJSON function 
	var str = JSON.stringify(newModObj);
	newModJSON(str);

}

function norax(){
// simulate an incoming JSON string that instantiates new modules without rack spaces
	var newModObj = {
		"newmod": [
			{
				"file": "fader.iem.maxpat",
				"name": "faderTest",
				"comments": "test a mess of parameters"
			}, {
				"file": "delayJSON.iem.maxpat",
				"name": "delayTest",
				"comments": "standardized delay processor"
			}
		]
	};
	
	
	//send a stringified object to the (experimental) newModJSON function 
	var str = JSON.stringify(newModObj);
	newModJSON(str);

}

function newModJSON(str){
	post(str);
	post();
	
	var obj = JSON.parse(str);
	
	var d = new Dict("IEM-modules"); // keep a list of current mods
	
	var files = [];
	var mods = [];
	var rax = [];

//	extract the file/mod pairs from the obj into arrays
	if(obj.hasOwnProperty("newmod")){ // top level key should be "newmod"
		post("New Mods!\n");
		if(Array.isArray(obj.newmod)){ //value should be an array of objects
			post("Array of " + obj.newmod.length + " mods!\n");
			for(var i = 0; i < obj.newmod.length; i++){
				if(obj.newmod[i].hasOwnProperty("file")){
					post("file: " + obj.newmod[i].file);
					post();
					files[i] = obj.newmod[i].file;
				}
				else{
					files[i] = "";
					error("missing file element in newmod array member " + i);
				}
				if(obj.newmod[i].hasOwnProperty("name")){
					post("modname: " + obj.newmod[i].name);
					post();
					mods[i] = obj.newmod[i].name;
				}
				else{
					mods[i] = "";
					error("missing mod name element in newmod array member " + i);
				}

				if(obj.newmod[i].hasOwnProperty("rax")){
					post("rack units: " + obj.newmod[i].rax);
					post();
					rax[i] = obj.newmod[i].rax;
				}
				else if (obj.newmod[i].hasOwnProperty("size")){
					//module has a custom UI size in px (width & height)
					// rax property takes precedent
				}
				else{
					// change this to create a module outside of the rack with no visible UI
					rax[i] = 0;
				}
				
			}
		}
	}
	
	var rackOffset = 0;
	var offset = 0;
	var rackPos = 0;
	
	//make some bpatcher modules from the array of file/name pairs
	for(var j = 0; j < mods.length; j++){
		var file = files[j];
		var modName = mods[j];
		if(patcher.getnamed(modName) == null){ // check to make sure it's not already there
			post("mod: " + modName + "; file: " + file);
			post();
			if(rax[j] > 0){
				var p = patcher.newdefault(0, 0, "bpatcher", file, "@args", modName, "@border", 2, "@varname", modName);		
				
				//rack positioning based on "rax" value
				if(j > 0){
					rackOffset += j * 90 * rax[j - 1]; // offset is cumulative
				} else rackOffset = 0;
				
				var bottomRight = rackOffset + 90 * rax[j];
				p.rect = [0, rackOffset, 950, bottomRight];
				post("patching rectangle: " + 0 + ", " + rackOffset + ", " + 950 +", " + bottomRight);
				post();

				// add to the dictionary
				var JSONstring = '{"file" : "' + files[j] + '", "rackPos" : ' + rackPos + '}';
				d.setparse(modName, JSONstring);
				rackPos ++;
				
			}
			else { // rax property is 0: do not add it to the rack area as a bpatcher
				if(j > 0){
						offset += j * 25; // offset is cumulative
					}
				else offset = 500;
			
				var p = patcher.newdefault(1000, offset, file, modName);
				p.varname = modName;
				
	//			post("patching rectangle: " + 0 + ", " + offset + ", " + 50 +", " + bottomRight);
	//			post();
				// add to the dictionary
				var JSONstring = '{"file" : "' + files[j] + '", "xPos" : 1000, "yPos" : ' + offset + '}';
				d.setparse(modName, JSONstring);
//				rackPos ++;

			}

		}
		else {
			error("there's already a mod by that name!\n");
		}
	}


}

function newMod(){
	var a = arrayfromargs(arguments);
	
	if(a.length < 2 || a.length % 2 == 1) {
		error("newMod() usage error: not enough arguments");
		return;
	}

	var d = new Dict("IEM-modules");
//	post(a);
//	post();
	
	var files = [];
	var mods = [];
	var f = 0, m = 0;
	//de-interleave the args array
	for(var i=0; i < a.length; i++){
		if(i % 2 == 0){
			files[f] = a[i];
			f ++;
		}
		else{
			mods[m] = a[i];
			m++;
		}
	}

	for(var j = 0; j < mods.length; j++){
		d.set(mods[j], files[j]);
		var file = files[j];
		var modName = mods[j];
		if(patcher.getnamed(modName) == null){ // check to make sure it's not already there
			post("mod: " + modName + "; file: " + file);
			post();
			var p = patcher.newdefault(0, 0, "bpatcher", file, "@args", modName, "@border", 2, "@varname", modName);		
			var offset = j * 180;
			p.rect = [0, offset, 950, offset + 180];
		}
		else{
			error("there's already a mod by that name!\n");
		}
	}
	 	
}

function deleteMods(){ // takes mod names and deletes corresponding named objects
	
	var a = arrayfromargs(arguments); //get arguments

	if(a.length == 0){ //check for args
		error("no arguments to deleteMods()\n");
		error("usage: deleteMods [all || modName(s)] \n");
		return;
		// this would happen for the message "deleteMods" with no arguments	
	}
	
	var d = new Dict("IEM-modules"); // get a reference to the list of mods
	var keys = d.getkeys();
	if(keys == null){
		error("no keys in Dict IEM-modules\n");
		return;
	}
//	post("num args: " + a.length);
//	post();
	
	switch(a[0]){
		case "all": //delete all mods
			for(var i = 0; i < keys.length; i ++){
				var key = keys[i];
				post("deleting mod: " + key);
				post();
				var deleteMod = patcher.getnamed(key); // get a reference to the mod
				if(deleteMod){ //check to make sure something got returned
					patcher.remove(deleteMod);
				}
			}

//			killbpatchers(); // see below - using patcher.getlogical()
			d.clear();
			break;
			
		default: //delete individual mods
			for(var i = 0; i < a.length; i++){ // check through the list of args
				post("deleting mod: " + a[i]);
				post();
				var deleteMod = patcher.getnamed(a[i]); // get a reference to the mod
				if(deleteMod){ //check to make sure something got returned
					patcher.remove(deleteMod); // remove the mod from the patcher
				}
				if(d.contains(a[i])){ // if the arg exists in the Dict as a key
					d.remove(a[i]);   // delete it
				}
			} // end for loop			
	} // end switch
} // end deleteMods()

function isitapatcher(a){
	// only return 1 for patchers that are left justified
	// other subpatchers will be safe
	if(a.maxclass == "patcher" && a.rect[0] == 0)
		return 1;
	else
		return 0;
}

function killbpatchers()
{
	e = patcher.getlogical(isitapatcher); //uses the return value as an array
	if (e && e.length) {
		for (var i=0;i < e.length;i++) {
			post("deleting " + e[i].maxclass+": "+e[i].varname +"\n");
			patcher.remove(e[i]);
		}
	}
}
