var width = 950;
var height = 290;

// sample newMod object for Mixer_2.0
// based on the sample narsissus.iem.json script
var newMixer = {
	
		"file": "mixer2.0.iem.maxpat",
		"name": "mixer",
		"arguments" : {"inputs": 4, "outputs" : 2},
		"rax" : 2,
		"comments": "Handles both audio routing and spatialization tasks"
	
};
// if a newMod object has an "arguments" property, add it as an array after "@args" in the newdefault() string

function bang(){
	
	newBPatcher(newMixer);
	
//	var args = ["foobar", "inputs", 4];
	
//	var p = patcher.newdefault(0, 0, "bpatcher", "mixer2.0.iem", "@args", args, "@varname", "foobar");
//	p.rect = [0, 0, width, height];
}

function newBPatcher(newMod) {
	
	var file, modName, argKeys;
	var args = [];
	
	if(newMod.hasOwnProperty("file")){
		file = newMod.file;
		post("file: " + file);
		post();
	}

	if(newMod.hasOwnProperty("name")){
		modName = newMod.name;
		post("modName: " + modName);
		post();
	}
	if(newMod.hasOwnProperty("arguments")){
		var obj = newMod.arguments;
		for (var prop in obj) {
  			if (obj.hasOwnProperty(prop)) {
				args.push(prop); //property
				args.push(obj[prop]); // value
  			} 
		}
		post("args: " + args);
		post();
	}
	
	var p = patcher.newdefault(0, 0, "bpatcher", file, "@args", modName, args, "@varname", modName);
	p.rect = [0, 0, width, height];

}

function explore(str){
	var offset = 100;
	
	var obj = this.patcher.getnamed(str);
	obj.rect = [offset, offset, offset + width, offset + height];
	
	post();
	post();
	
	}