inlets = 1;

function bang(){
	var s = new Dict("setup");
	
	var obj = JSON.parse(s.stringify());
	
	if(obj.hasOwnProperty("newmod")){
		post("New Modules:");
		post();	
		var newmodObj = new Object();
		newmodObj.newmod = obj.newmod;
//		post(JSON.stringify(newmodObj));
//		post();
//		outlet(0, JSON.stringify(newmodObj));

		if(this.patcher.getnamed("newMod")){
			this.patcher.getnamed("newMod").message(JSON.stringify(newmodObj));
		}
	
	}
	else{
		post("hmmm ...\n");
	}

}