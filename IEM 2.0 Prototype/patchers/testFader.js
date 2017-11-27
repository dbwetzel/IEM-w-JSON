inlets = 1;
outlets = 1;

var modName = "foo";
	
function modName(str){
	modName = str;
}

function bang(){
	var obj = {
		"input" : [
			{
			"parameters" : {
				"trim" : 127,
				"panA" : 64,
				"faderA" : 100
			},
			"controls" : {
				"trimcc" : "foobar"
			},
			"audio" : {}
			},
			{
			"parameters" : {
				"trim" : 127,
				"panA" : 0,
				"faderA" : 127
			},
			"controls" : {},
			"audio" : {}
			},
			{
			"parameters" : {
				"trim" : 108,
				"panA" : 80,
				"faderA" : 111
			},
			"controls" : {},
			"audio" : {}
			},
			{
			"parameters" : {
				"trim" : 127,
				"panA" : 64,
				"faderA" : 127
			},
			"controls" : {},
			"audio" : {}
			}
		]
	};
	
	obj["name"] = modName; // add a name field
	
	outlet(0, JSON.stringify(obj));	
	}