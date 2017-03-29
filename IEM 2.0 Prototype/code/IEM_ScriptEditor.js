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
//		alert(Object.keys(dict));
		eventScriptString = JSON.stringify(dict);
		document.getElementById("EventScript").innerHTML = eventScriptString;

	});
});


