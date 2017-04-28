inlets = 1;
outlets = 1;

function bang(){

	// message to thispatcher:
	// script newobject bpatcher @name %s @args %s @varname mod%ld @border 2 @patching_rect 0 %ld 950 %ld
	
	var patchName = "delayJSON.iem";
	var modName = "foobar";
	var varName = "mod[1]";
	
	//create a bpatcher with the given filename and mod name
	var a = patcher.newdefault(0, 0,"bpatcher", patchName, "@args", modName, "@border", 2, "@varname", varName);
	a.rect = [0, 0, 950, 180];


}
