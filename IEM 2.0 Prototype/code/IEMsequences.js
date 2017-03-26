inlets = 1;
outlets = 1;


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

