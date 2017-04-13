inlets = 1;
outlets = 2;


function bang()
{
	//create a dummy IEM module event
	var x = {"name" : "foo", "parameters" : {"time" : 512, "fb" : 0.8}};

	if(x.name == null){
		post("no name field for this module!");
	}
	else {
		var send = x.name;
	}
	var string = JSON.stringify(x);
	messnamed("foo", string);
	outlet(0, string);
	outlet(1, send);
}

function parse(mod){
	// distribute parameters to named objects in the patcher
	var obj = JSON.parse(mod);
	
	post("Module: " + obj.name + "\n");
	
	if(typeof obj.parameters == 'object'){
		post("Parameters: \n");
		var params = obj.parameters;
		var keys = Object.keys(params);
		for(var i = 0; i < keys.length; i ++){
			var key = keys[i]
			var val = params[key];
			post(key + ": " + val);
			post();
			this.patcher.getnamed(key).message(val);	
		}
		
	}
	if(typeof obj.audio == 'object'){
		post("Audio Busses: \n");
		var params = obj.audio;
		var keys = Object.keys(params);
		for(var i = 0; i < keys.length; i ++){
			var key = keys[i]
			var val = params[key];
			post(key + ": " + val);
			post();
			this.patcher.getnamed(key).message(val);	
		}
		
	}
	if(typeof obj.control == 'object'){
		post("Control Channels: \n");
		var params = obj.control;
		var keys = Object.keys(params);
		for(var i = 0; i < keys.length; i ++){
			var key = keys[i];
			var val = params[key];
			post(key + ": " + val);
			post();
			this.patcher.getnamed(key).message(val);	
		}
		
	}
	
	
}