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
	
	var modName = obj.name;
	
	post("Module: " + modName + "\n");
	// create a new Dict object reference to the module's main dictionary
	var modDict = new Dict(modName); 
	// convert the dictionary into JS object
	var dictObj = JSON.parse(modDict.stringify());
		
	if(typeof obj.parameters == 'object'){
		post("Parameters: \n");
		var params = obj.parameters;
		var keys = Object.keys(params);
		for(var i = 0; i < keys.length; i ++){
			var key = keys[i]
			var val = params[key];
			if(typeof val == 'object'){
				//if the value is an object
				var valKeys = Object.keys(val);
//				post(valKeys.length);
//				post();
//				var valIndex;
				for(var j = 0; j < valKeys.length; j++){
					var valIndex = valKeys[j];
					var subKey = key + "[" + valKeys[j] + "]";
					var valItems = params[key][valIndex];
					post(subKey + ": ");
					post(valItems);
					post();
					// update the module instance dictionary
					dictObj.parameters[key][valIndex] = valItems; 
					// update an object in the patcher
					this.patcher.getnamed(subKey).message(valItems);
				}
			} 
			else{
				post(key + ": " + val);
				post();
				dictObj.parameters[key] = val; // update the module instance dictionary
				this.patcher.getnamed(key).message(val); // set an object in the patcher
			}
		}
		
	}
	if(typeof obj.audio == 'object'){
		post("Audio Busses: \n");
		var params = obj.audio;
		var keys = Object.keys(params);
		for(var i = 0; i < keys.length; i ++){
			var key = keys[i]
			var val = params[key];
			if(typeof val == 'object'){
				//if the value is an object
				var valKeys = Object.keys(val);
				post(valKeys.length);
				post();
//				var valIndex;
				for(var j = 0; j < valKeys.length; j++){
					var valIndex = valKeys[j];
					var subKey = key + "[" + valKeys[j] + "]";
					var valItems = params[key][valIndex];
					post(subKey + ": ");
					post(valItems);
					post();
					// update the module instance dictionary
					dictObj.audio[key][valIndex] = valItems; 
					this.patcher.getnamed(subKey).message(valItems);
				}
			} 
			else{
				post(key + ": " + val);
				post();
				dictObj.audio[key] = val; // update the module instance dictionary
				this.patcher.getnamed(key).message(val);
			}
		}
		
	}
	if(typeof obj.control == 'object'){
		post("Control Channels: \n");
		var params = obj.control;
		var keys = Object.keys(params);
		for(var i = 0; i < keys.length; i ++){
			var key = keys[i];
			var val = params[key];
			if(typeof val == 'object'){
				//if the value is an object
				var valKeys = Object.keys(val);
				post(valKeys.length);
				post();
//				var valIndex;
				for(var j = 0; j < valKeys.length; j++){
					var valIndex = valKeys[j];
					var subKey = key + "[" + valKeys[j] + "]";
					var valItems = params[key][valIndex];
					post(subKey + ": ");
					post(valItems);
					post();
					// update the module instance dictionary
					dictObj.control[key][valIndex] = valItems; 
					this.patcher.getnamed(subKey).message(valItems);
				}
			} 
			else{
				post(key + ": " + val);
				post();
				dictObj.control[key] = val; // update the module instance dictionary
				this.patcher.getnamed(key).message(val);
			}
		}
		
	}
	
	// parse the temp JSON object back to module instance dictionary (embedded in the patcher)
	modDict.parse(JSON.stringify(dictObj));

}

// merge the incoming mod event with the module's dictionary
function mergeDict(obj, modName){
	
	
	var modDict = new Dict(modName); // create a new Dict object reference to the module's main dictionary
	
	
	
	}