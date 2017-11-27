inlets = 1;
outlets = 1;

var modName = "foo";
	
function setModName(str){
	modName = str;
	post(modName);
	post();
}

function bang(){
	var obj = {
		"parameters" : {
			"testFader" : {"ramp" : {"start" : 0, "target" : 127, "time" : 2000}},
			"input" : [
				{
				"parameters" : {
					"trim" : {"ramp" : {"start" : 0, "target" : 127, "time" : 2000}},
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
		}
	};
	
	obj["name"] = modName; // add a name field
	
	outlet(0, JSON.stringify(obj));	
}