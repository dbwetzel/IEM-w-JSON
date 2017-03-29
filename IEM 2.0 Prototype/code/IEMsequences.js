inlets = 1;
outlets = 2;


function bang()
{
	var seqs = [];
	var x = new Dict("sequences"); // references the "sequences" dictionary
	var keys = x.getkeys();
//	post(keys);
	for(var i = 0; i < keys.length; i++){
		seqs[i] = new Dict(keys[i]); 
		outlet(0, seqs[i].name);
	}
	
	
}

function play(seq){
	// find the named sequence in the list from the top level keys
	// if there is a match between the args and an element in the list
	// 	populate the "eventList" dictionary with its contents
	var s = new Dict("sequences"); // references the "sequences" dictionary
	var e = new Dict("Events"); // references the "Events" dictionary
	
	var stringy = s.stringify(); //convert Dict to Obj via stringify() & JSON.parse() 
	var obj = JSON.parse(stringy);

	var k = Object.keys(obj); //get object keys array

	for(var i = 0; i < k.length; i++){
		if(seq === k[i]){ //match the arg against obj keys
			var list = k[i]; //grab the name of the sequence list

			var seqObj = new Object(); //build a new object for the sequence
			seqObj[list] = []; // create a key in the new object

			for(var i = 0; i < obj[list].length; i++){				
				seqObj[list][i] = obj[list][i]; //add members of the sequence to the key in the new object
			}
			
			post(JSON.stringify(seqObj));
			post();
			e.parse(JSON.stringify(seqObj)); 
			//fill the Events dict with eventlist matching the name of the function argument
		}

	}
	

}

// from https://css-tricks.com/snippets/javascript/javascript-array-contains/
Array.prototype.contains = function ( needle ) {
   for (i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}

// sequence() looks for a sequence matching the first argument
// the second argument is an event index number
// events at the given index are distributed to the relevant module dictionaries
//if there is a named Dict in Max that matches a mod name in an event, it's contents will reflect the event

function sequence(list, event){
	
	if(event < 0){
		error("negative sequence event number not allowed [" + event + "]\n");
		return;
	}
	
	//create a new dict tied to the loaded EL
	var IEMdict = new Dict("eventlist"); 
	var IEMobj = JSON.parse(IEMdict.stringify()); //convert to JS Obj
	//js objects handle nested arrays better than Dict in Max
	
	var keys = Object.keys(IEMobj); // get top level keys

	//see Array.prototype.contains function, above
	if(keys.contains("sequences")){ 
		
		var seqKeys = Object.keys(IEMobj.sequences); // get keys
		
		if (event >= IEMobj.sequences[list].length){
			error("event number " + event + " in list \'" + list + "\' out of range\n");
			return;
		}

		if (seqKeys.contains(list) && event < IEMobj.sequences[list].length){
			post("list \"" + list + "\", event #" + event + " of " + IEMobj.sequences[list].length);
			post();
			outlet(1, IEMobj.sequences[list][event]);
			eventObj = IEMobj.sequences[list][event];
			//post(JSON.stringify(eventObj)); //spew out the event to console
			
			eventKeys = Object.keys(eventObj); // get event keys
			
			//look at the "modules" key in the event object
			// modules should be an array
			if (eventKeys.contains("modules") && eventObj.modules.length > 0){
				//post("found " + eventObj.modules.length + " modules in event " + event);
				//post();
				
				for(var i = 0; i < eventObj.modules.length; i++){
					// create an object for each module in the event
					var modObj = eventObj.modules[i]; 
					var modKeys = Object.keys(modObj); // get the keys
					
					// check to make sure "name" and "parameters" are present
					if (modKeys.contains("name") && modKeys.contains("parameters")){
						post(modObj.name); // mod name
						post();
						// create a new object for the parameter list
						var paramObj = modObj.parameters;
						// make it a string
						var paramString = JSON.stringify(paramObj);
						post(paramString);
						post();
						// parse the parameter list to a Dict with the same mod name
						var paramDict = new Dict(modObj.name);
						paramDict.parse(paramString);
						
					}
				}
			}
		}
	}
	
	// send the list and current event number out the right outlet event
	//outlet(1, list, event); 
}

