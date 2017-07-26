
inlets = 1;
outlets = 1;


function import(filename)
{
	// if no argument is provided to dict then a random/unique name will be assigned
	var x = new Dict;

	// provide a path to the json file or, if the file is in Max's searchpath, just the file name.
	// if you provide no argument then a file dialog will appear to allow you to choose a file.
	// alternatively, you may also use the import_yaml() to import yaml files rather than json files.
	// 
	// the import_json() and import_yaml() do enforce naming conventions and will only work if the
	// files to be imported end with the standard .json or .yml file suffixes.
	// to read any file, interpreting it as json regardless of suffix, use the readany() method
	x.import_json(filename);


	// analagous to the import_json() and import_yaml() methods, export_json() and export_yaml() are also available.
	//x.export_json("__dict_export_test.json");
	
	// two methods are available for coll access, should you need it:
	// pull_from_coll() will copy data from a coll object named by the argument.
	// push_to_coll() will copy data from the dict to the coll named by the argument.
	// after this call is made double-click on the coll in the help patcher to view its content.
	//x.push_to_coll("fooColl");

	
	// use the stringify() method to get the dictionary (including nested dictionaries) in JSON format
	var xjson = x.stringify();
	
	// create a new Dict referencing "eventlist" and parse the xjson string to it
	var e = new Dict("EventScript");
	e.parse(xjson);
	
	var k = x.getkeys();
	
	post_info(e.name, k);

	var mod = [k.length]; //array same length as keys
	
	for (var i = 0; i < k.length; i++){
		
		var section = x.get(k[i]); // get the value at each top level key
		var sJSON = section.stringify(); //convert to JSON string
		post(k[i] + "\n");
		var sectName = k[i];
		mod[i] = new Dict(sectName); // create a new Dict for each key linked to a Max dict object
		mod[i].parse(sJSON); //fill the new Dict with the JSON string
		
	}
	
	if(k.length){
		outlet(0, "bang");
	}
	
}


function post_info(dictname, keys)
{
	post("Info regarding the dictionary named '" + dictname + "': ");
	post();
	post("    Keys: " + keys);
	post();
}

