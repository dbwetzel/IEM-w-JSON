inlets = 2; 
outlets = 2;

var modules = [];

function bang(){

	// how do I sort a bang in the left from a bang in the right?
	
	// message to thispatcher:
	// script newobject bpatcher @name %s @args %s @varname mod%ld @border 2 @patching_rect 0 %ld 950 %ld
	
	if(inlet==1){
		outlet(1, "bang");
		var deletedMod = patcher.getnamed("foobar");
		patcher.remove(deletedMod);
	} else {
	
		var patchName = "delayJSON.iem";
		var modName = "noona";
		
		//create a bpatcher with the given filename and mod name
//		var a = patcher.newdefault(0, 0,"bpatcher", patchName, "@args", modName, "@border", 2, "@varname", modName);
		patcher.getnamed(modName).rect = [0, 18, 950, 180];
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
	post("num args: " + a.length);
	post();
	
	switch(a[0]){
		case "all": //delete all mods
			killbpatchers(); // see below - using patcher.getlogical()
			d.clear();
			break;
			
		default: //delete individual mods
			for(var i = 0; i < a.length; i++){ // check through the list of args
				post("deleting mod: " + a[i]);
				post();
				var deleteMod = patcher.getnamed(a[i]); // get a reference to the mod
				if(deleteMod){ //check to amke sure something got returned
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
