inlets = 2; 
outlets = 2;

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
		post("j == " + j);
		post();
		post(modName);
		post();
		post(file);
		post();
		var p = patcher.newdefault(0, 0, "bpatcher", file, "@args", modName, "@border", 2, "@varname", modName);		
		var offset = j * 180;
		p.rect = [0, offset, 950, offset + 180];
	}
	 	
}

function createMod(file, modName){

}
