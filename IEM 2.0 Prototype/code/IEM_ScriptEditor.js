// Read in an event script from a Max dictionary
// Load it into a form for editing
// Update the event script dictionary
// Export to file

//So far very rudimentary, but it puts JSON into the browser window

// access dictionary in response to Max "edit" message to jweb inlet

var eventScriptString;

window.max.bindInlet('edit', function () {
	
	// get the selected Event Script dictionary and stringify it
	window.max.getDict('IEM_ScriptEditor', function(dict) {
		var keys = Object.keys(dict);
//		alert(keys);
		
		for(var i = 0; i < keys.length; i ++){
			var key = keys[i];
			var x = document.getElementById(key);
			x.style.display = "block";
			var obj = dict[key];
			x.innerHTML = JSON.stringify(obj);
			
		}

//		eventScriptString = JSON.stringify(dict);
//		document.getElementById("EventScript").innerHTML = eventScriptString;

	});
});


