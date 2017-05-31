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
	// "mod" is stringified JSON
	var obj = JSON.parse(mod);
	
	if(obj.hasOwnProperty("name")){
		var modName = obj.name;
		
		post("Module: " + modName + "\n");
		// create a new Dict object reference to the module's main dictionary
		var modDict = new Dict(modName); 
		// convert the dictionary into JS object
		var dictObj = JSON.parse(modDict.stringify());	
	}
	else {
		error("No named module. Cannot parse module event");
		return;
	}

	
		
//	if(typeof obj.parameters == 'object'){ // if a "parameters" object is part of the mod event
	if(obj.hasOwnProperty("parameters")){ // if a "parameters" object is part of the mod event
		post("Parameters:\n ");

		var params = obj.parameters; // grab the object
		var keys = Object.keys(params); // get the top keys

		for(var i = 0; i < keys.length; i ++){ // cycle through the top keys
			var key = keys[i]
			var val = params[key]; // get the value for each key
			parseParam(key, val);
			
		} // end loop through parameters
		
	} // end parameter parsing section
	if(typeof obj.audio == 'object'){
		post("Audio Busses:\n ");
		var params = obj.audio;
		var keys = Object.keys(params);
		for(var i = 0; i < keys.length; i ++){
			var key = keys[i]
			var val = params[key];
			if(typeof val == 'object'){
				//if the value is an object
				var valKeys = Object.keys(val);
//				var valIndex;
				for(var j = 0; j < valKeys.length; j++){
					var valIndex = valKeys[j];
					var valItems = params[key][valIndex];

					if(valIndex in dictObj.audio[key]){
						dictObj.audio[key][valIndex] = valItems;
					}
					
					
					var subKey = key + "[" + valKeys[j] + "]"; //add brackets
					// grouped parameters in IEM will be named like an array:
					// "in~[1]", "in~[2]", etc
					post(subKey + ": ");
					post(valItems);
					post();
					// update the module instance dictionary
					if(this.patcher.getnamed(subKey)){ // check for named Max object
						this.patcher.getnamed(subKey).message(valItems); // set named object
					} // ignore anything else (e.g. "comments")
				}
			} 
			else{
				post(key + ": " + val);
				post();
				if(key in dictObj.audio){//screen out extraneous stuff from the mod dictionary
					// this could include comments or other undefined keys
					dictObj.audio[key] = val; // update the module instance dictionary
				}
				if(this.patcher.getnamed(key)){ // check to see if it exists first
					this.patcher.getnamed(key).message(val); // set a Max object
				} // ignore items in the mod event that do not have named Max objects
			}
		}
		
	}
	if(typeof obj.control == 'object'){
		post("Control Channels:\n ");
		var params = obj.control;
		var keys = Object.keys(params);
		for(var i = 0; i < keys.length; i ++){
			var key = keys[i];
			var val = params[key];
			if(typeof val == 'object'){
				//if the value is an object
				var valKeys = Object.keys(val);
//				var valIndex;
				for(var j = 0; j < valKeys.length; j++){
					var valIndex = valKeys[j];
					var subKey = key + "[" + valKeys[j] + "]";
					var valItems = params[key][valIndex];
					post(subKey + ": ");
					post(valItems);
					post();
					// update the module instance dictionary
					if(valIndex in dictObj.control[key]){
						dictObj.control[key][valIndex] = valItems; 
					}
					if(this.patcher.getnamed(subKey)){
						this.patcher.getnamed(subKey).message(valItems);
					}
				}
			} 
			else{
				post(key + ": " + val);
				post();
				
				if(key in dictObj.control){ // only if it exists in the master
 					dictObj.control[key] = val; // update the module instance dictionary
				}
				
				if(this.patcher.getnamed(key)){
					this.patcher.getnamed(key).message(val);
				}
			}
		}
		
	}
	
	// parse the temp JSON object back to module instance dictionary (embedded in the patcher)
	modDict.parse(JSON.stringify(dictObj));

}

//parse the command line to named objects in the patcher
// example: parameters::time 512 audio::in~::1 ADC[1]
function text(){
	var a = arrayfromargs(arguments); //get input
	var maxObjName = [], maxObjVal = []; //make an array of Max objects and values
	var objs=0, vals=0; //keep track of objects and values for indexing
	for(var i = 0; i < a.length; i++){
		var s = String(a[i]); //a[0] == "parameters::time" a[1] == "512"
		var arr = s.split("::"); //create an array from each argument
		if(arr.length > 1) // e.g., parameters::time or audio::in~::1
		{
			maxObjName[objs] = arr[1]; //ignore "parameters" or "audio"
			for(var x = 2; x < arr.length; x++){//start with third element
				maxObjName[objs] += "[" + arr[x] + "]";
			}
			objs++ // count the objects found

		}
		else {
			maxObjVal[vals] = arr[0];
			vals ++; //count the values
		}	
	}
	for(var j = 0; j < maxObjName.length; j++){
		post(maxObjName[j] + " = " + maxObjVal[j]);
		post();
		if(this.patcher.getnamed(maxObjName[j])){ //check for existence
			var mObj = this.patcher.getnamed(maxObjName[j]);
			post("Obj type: " + mObj.maxclass);
			post();
			switch(mObj.maxclass){ //check the Max object type
				case "number":
					maxObjVal[j] = Number(maxObjVal[j]); //typecast for numbers
					break; // works for both ints and floats
			}
			// set the value of a named Max object in the patcher
			this.patcher.getnamed(maxObjName[j]).message(maxObjVal[j]);
		}

	}
	
}

// merge the incoming mod event with the module's dictionary
function mergeDict(obj, modName){
	
	
	var modDict = new Dict(modName); // create a new Dict object reference to the module's main dictionary
	
	
	
	}

function parseParam(key, val){ 
	// "key" is the name of a module parameter, e.g. key == "gain"
	// "val" is the value of that parameter e.g. "127" 
	// 	or val = {"ramp" : {"start": 0, "target": 127, "time" : 1000}}

	if(typeof val == 'object'){
		var valKeys = Object.keys(val);
		//if the value is an object there are several possibilities
		// 1. delx - delay execution by x msec
		// 2. ramp - trigger a gradual ramp from one value to another or to a target value over x msec
		// 3. envelope - trigger multi-segment ramp
		// 4. sub parameter (dafault) - e.g. "pan" : {"1" : 0, "2" : 127, "3" : 0, "4" : 127} 
		// if the value of a sub parameter or delx is an object, parseParam is called recursively
		
		switch(valKeys[0]){
			case "delx": // use the Max JS Task object instead of setTimeout()

				if(val.delx.hasOwnProperty("time") && val.delx.hasOwnProperty("value")){
					var del = val.delx.time;
					var tsk = new Task(parseParam, this, key, val.delx.value);
					// "value" might contain an object. send it to parsePAram again to sort it out ...
					tsk.schedule(del);
				}
				break;

			case "ramp":
//						post(key + ": ramp!\n");
				var line = [key]; // start an array with the name of the ramp destination
				if (val.ramp.hasOwnProperty("start")){
				//	line.push("start");
					line.push(val.ramp.start);
				}
				if (val.ramp.hasOwnProperty("target")){
				//	line.push("target");
					line.push(val.ramp.target);
				}				
				if (val.ramp.hasOwnProperty("time")){
				//	line.push("time");
					line.push(val.ramp.time);
				}
				
				if (val.ramp.hasOwnProperty("exp")){
				//	line.push("exp");
					line.push(val.ramp.exp);
				}

				if (val.ramp.hasOwnProperty("trigger")){
				//	"trigger" contains an object : {"value" : "", "source" : ""}
					

				}
				if (val.ramp.hasOwnProperty("segments")){ // multiple line segments
				//	value will be an object
					
				}

				if(this.patcher.getnamed("ramp")){
					this.patcher.getnamed("ramp").message(line);
				}

				break;
			case "envelope":
				post(key + ": envelope! -- stil working on this ...\n");
				break;
			default: 
				// sub value e.g. "fader" : {"1" : 127, "2" : 0}
				for(var j = 0; j < valKeys.length; j++){
					var valIndex = valKeys[j];
					var subKey = key + "[" + valKeys[j] + "]"; // e.g. "trim[1]"
					var valItems = val[valIndex];
					post(subKey + ": ");
					post(valItems);
					post();
					
					parseParam(subKey, valItems); // try out some recursion ...
					// send it back through for parsing as either value or ramp

				}
			} // end switch
	} // end if(typeof val == 'object') 
	else{
		post(key + ": " + val);
		post();
				
		if(this.patcher.getnamed(key)){
 			this.patcher.getnamed(key).message(val); // set an object in the patcher
		}
	}

}