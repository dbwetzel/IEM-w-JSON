// Read in an event script from a Max dictionary
// Load it into a form for editing
// Update the event script dictionary
// Export to file

//So far parses the event script into its main parts: info, meta, setup, sequences, and presets
//items from each section are placed in their own <p> tags within the section <div>

// access dictionary in response to Max "edit" message to jweb inlet

//var eventScriptString;

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
					data = meta_to_HTML(obj); //function returns a string of HTML
					break;			
				case "setup":
					break;			
				case "sequences":
					break;			
				case "preset":
					break;			
			}
//			alert(data);
			var pos = txt.replace("%data%", data); //replace the placeholder with a stringified obj
    		document.getElementById(key).innerHTML = pos; // reload the div contents
		}

//		eventScriptString = JSON.stringify(dict);
//		document.getElementById("EventScript").innerHTML = eventScriptString;

	});
});

function info_to_HTML(obj){ //this object is a set of key:value pairs
	var string = "";
	var item = "";
	var items = new Array(0);
	var keys = Object.keys(obj);
	var key;
			
	if(keys.contains("doctype")){
		item ="<p>" + "Doctype : " + obj.doctype + "</p>"; //format an item
		items.push(item);
	}
	
	if(keys.contains("IEM-version")){
		item ="<p>" + "IEM Version : " + obj["IEM-version"] + "</p>"; //format an item
		items.push(item);
	}

	if(keys.contains("author")){
		item ="<p>" + "Author : " + obj.author + "</p>"; //format an item
		items.push(item);
	}

	if(keys.contains("date")){
		item ="<p>" + "Date : " + obj.date + "</p>"; //format an item
		items.push(item);
	}


	for(var i = 0; i < keys.length; i++){ 
		key = keys[i];
		switch(key){ // add the unexpected keys and append them
			case "doctype":
				break;
			case "IEM-version":
				break;
			case "author":
				break;
			case "date":
				break;			
			default:
				item ="<p>" + key + " : " + obj[key] + "</p>"; //format an item
				items.push(item);
				break;
		}
	}

	for(var i=0; i < items.length; i++){
		string += items[i];
	}
	return string;	
}

function meta_to_HTML(obj){ //this object is a set of key:value pairs
	var string = "";
	var item = "";
	var items = new Array(0);
	var keys = Object.keys(obj);
	var key;
		
	if(keys.contains("composer")){
		item ="<p>" + "Composer : " + obj.composer + "</p>"; //format an item
		items.push(item);
	}

	if(keys.contains("title")){
		item ="<p>" + "Title : " + obj.title + "</p>"; //format an item
		items.push(item);
	}

	if(keys.contains("subtitle")){
		item ="<p>" + "Subtitle : " + obj.subtitle + "</p>"; //format an item
		items.push(item);
	}

	if(keys.contains("year")){
		item ="<p>" + "Year : " + obj.year + "</p>"; //format an item
		items.push(item);
	}

	for(var i = 0; i < keys.length; i++){ 
		key = keys[i];
		switch(key){ // add the unexpected keys and append them
			case "composer":
				break;
			case "title":
				break;
			case "subtitle":
				break;
			case "year":
				break;			
			default:
				item ="<p>" + key + " : " + obj[key] + "</p>"; //format an item
				items.push(item);
				break;
		}
	}

	for(var i=0; i < items.length; i++){
		string += items[i];
	}
	return string;	
}


Array.prototype.contains = function ( needle ) {
   for (i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}

