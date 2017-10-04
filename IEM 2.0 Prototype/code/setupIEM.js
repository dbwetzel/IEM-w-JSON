/**
This scipt is fairly simple, but it is executed only after the IEM script is loaded.
It presumes a dictionary named "setup"
If the setup dictionary contains a "newmod" object, 
this script will send a stringified version to the "newMod" method of the IEM "rack"

The "init" function of the setup object is handled by the newMod patcher after new modules are loaded
**/

inlets = 1;

function bang(){
	//get the setup dictionary
	var s = new Dict("setup");
	// convert to js object
	var obj = JSON.parse(s.stringify());
	
	if(obj.hasOwnProperty("newmod")){
		post("New Modules:");
		post();	
		var newmodObj = new Object();
		newmodObj.newmod = obj.newmod;

		if(this.patcher.getnamed("newMod")){
			this.patcher.getnamed("newMod").message(JSON.stringify(newmodObj));
		}
	
	}
	else{
		post("hmmm ...\n");
	}

}