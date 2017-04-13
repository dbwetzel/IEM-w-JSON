inlets = 1;
outlets = 2;


function bang()
{
	//create a dummy IEM module event
	var x = {"name" : "foo", "audio" : {"in~" : "foo-input~"}, "control" : {"time-cc" : "knob1" }, "parameters" : {"time" : 512, "fb" : 0.8}};

	if(x.name == null){
		post("no name field for this module!");
	}
	else {
		var send = x.name;
	}
	var string = JSON.stringify(x);
	messnamed("foo", string);
	outlet(0, string);
	outlet(1, send);
}