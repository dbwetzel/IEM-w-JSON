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
		
		for(var i = 0; i < keys.length; i ++){
			var key = keys[i]; // get the keys
			var x = document.getElementById(key); //find the element ID matching the current key
			x.style.display = "block"; // turn on the <div>
			var obj = dict[key]; //get the object at the given key
			var txt = x.innerHTML; // get the current contents of the div
			// this is the place to insert more obj processing to format the script
			var data = JSON.stringify(obj); // string to store formatted HTML based on obj
			switch(key){
				case "info":
					data = info_to_HTML(obj); //function returns a string of HTML
					break;			
				case "meta":
					break;			
				case "setup":
					break;			
				case "sequences":
					break;			
				case "preset":
					break;			
			}
			var pos = txt.replace("%data%", data); //replace the placeholder with a stringified obj
    		document.getElementById(key).innerHTML = pos; // reload the div contents
		}

//		eventScriptString = JSON.stringify(dict);
//		document.getElementById("EventScript").innerHTML = eventScriptString;

	});
});

function info_to_HTML(obj){ //this object will be an array
	var string = "";
	var item = "";
		for(var i = 0; i < obj.length; i++){
			//alert(Object.keys(obj[i]));
			var key = Object.keys(obj[i]);
			item ="<p>" + key + " : " + obj[i][key] + "</p>"; //format an item
			string += item; //append to string
		}
	return string;
	
}

