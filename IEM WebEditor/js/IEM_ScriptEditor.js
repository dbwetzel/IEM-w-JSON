/**** NEW VERSION - April 6, 2017

No longer trying to host the web editor in jweb/Max. 

Moving out to standard browser with intent to use electron for communication b/ browser and Max

*****/

// Read in an event script from JSON object
// Load it into a form for editing
// Update the event script dictionary
// Export to file

//So far parses the event script into its main parts: info, meta, setup, sequences, and presets
//items from each section are placed in their own <p> tags within the section <div>

/* THIS IS FOR THE MAX/JWEB VERSION 
//connect jweb page to Max 'edit" message.
window.max.bindInlet('edit', function () {
	// get the selected Event Script dictionary and pass it to the editor
	window.max.getDict('IEM_ScriptEditor', function(dict) {
		editJSON(dict); // dict is actually a js object
	});
});
*/
function printJSON(obj){
	console.log(obj);
}

function editJSON(dict){	
	
	// parse Event Script JSON to editor web page
	var keys = Object.keys(dict); // get top level keys
	
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
				data = setup_to_HTML(obj);
				break;			
			case "sequences":
				break;			
			case "preset":
				break;			
		}

		var pos = txt.replace("%data%", data); //replace the placeholder with a stringified obj
		document.getElementById(key).innerHTML = pos; // reload the div contents
	}

}

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
	
	if(keys.contains("IEMversion")){
		item ="<p>" + "IEM Version : " + obj.IEMversion + "</p>"; //format an item
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


function setup_to_HTML(obj){ //this object should have two keys, newmod and init. Each contains an array of module objects
	var string = "";
	var item = "";
	var items = new Array(0);
	var keys = Object.keys(obj);
	var key;
	var modObj;
	var modKeys;
	var modKey;
	var alert = "";

	if(keys.contains("newmod")){
		string = "<h3>New Modules</h3><div class = \"row\" id = \"newmod-data\"><div class = \"col-1\"></div><div class = \"col-11\" id = \"newmod\">";
		for(i = 0; i < obj.newmod.length; i++)
		{
			modObj = obj.newmod[i];
			modKeys = Object.keys(modObj);
			
			// output contents of array with prepended 'foo' message
//			alert = "mod #" + i + ", modKeys length: " + modKeys.length + ", keys: " + modKeys;
//			post(alert);
//			item = "<p>" + JSON.stringify(obj.newmod[i]) + "</p>";
			string += "<div id = \"newmod["+ i + "]\">new module:";
			for(var j = 0; j < modKeys.length; j++){
				modKey = modKeys[j];
//				alert = "modKey #" + j + " : " + modKey;
//				post(alert);
//				post(modObj[modKey]);
				item = "<p>" + modKey + " : " + modObj[modKey] + "</p>";
				string += item;
			}
			string += "</div>";
		}
		string += "</div></div>";
	}
	//INIT section is very similar to a preset event. It is a single event with instructions for multiple modules
	//Typically, INIT will contain parameter settings plus settings for audio busses and control channels
	if(keys.contains("init")){
		string += "<h3>Initialize Modules</h3><div class = \"row\" id = \"init-data\"><div class = \"col-1\"></div><div class = \"col-11\" id = \"init\">";
		var initObj, initKeys;
		for(var k = 0; k < obj.init.length; k++)
		{
			initObj = obj.init[k]; // grab the object
			initKeys = Object.keys(initObj); // get the object's keys
//			post("INIT " + k + ": " + initKeys); // post the keys
			
			string += "<div id = \"init[" + k + "]\">initialize module:";
			if(initKeys.contains("name")){
				item = "<p>Mod Name: " + initObj.name + "</p>";
			}
			
			if(initKeys.contains("comments")){
				item += "<p>Comments: " + initObj.comments + "</p>";
			}

			if(initKeys.contains("audio")){
				if(typeof initObj.audio === 'object'){
					var audioKeys = Object.keys(initObj.audio);
					//post("Init item [" + k + "]: Audio keys: " + audioKeys);
					item += "<p>Audio busses: ";
					for(var a = 0; a < audioKeys.length; a++){
						var audioKey = audioKeys[a];
						//audio busses have layers, eg "in~" : {"1" : "ADC[0]", "2" : "sampler"}
						if(typeof initObj.audio[audioKey] === 'object'){
							item += "<br>" + audioKey + ": " + JSON.stringify(initObj.audio[audioKey]);
						}
						else{ //try putting some items in an input box ...
							item += "<br>" + audioKey + ": ";
							item += "<input type=\"text\" value=\"" + initObj.audio[audioKey] + "\">";
							// How should this get ID'd so that the form data is read correctly back into the object?
						}			
							
					}
					item += "</p>";
				}
//				item += "<p>Comments: " + initObj.comments + "</p>";
			}
			
// 			item = "<p>" + JSON.stringify(obj.init[k]) + "</p>";
			string += item;
			string += "</div>"
		}
		string += "</div></div>";
	}

	return string;

}

Array.prototype.contains = function ( needle ) {
   for (var i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}

/*** FOR POSTING TO MAX WINDOW FROM JWEB
function post(string){
	window.max.outlet('post', string);
}
*/
