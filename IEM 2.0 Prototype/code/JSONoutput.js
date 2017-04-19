inlets = 1;
outlets = 2;


function bang()
{
	//create a dummy IEM module event
	var x = {"name" : "foo", "audio" : {"in~" : {"1" : "foo-input~", "2" : "bar-input~"}}, "control" : {"time-cc" : "knob1" }, "parameters" : {"time" : 512, "fb" : 0.8, "fader" : {"1" : "0 127 3000", "2" : "127", "3" : "0 127 3000", "4" : "50 1000"}}};

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

function test(x)
{
	//create a dummy IEM module event
	var obj1 = {"name" : "foo", "audio" : {"comments" : "this is a test", "in~" : {"1" : "foo-input~", "2" : "bar-input~"}}, "control" : {"in" : {"time-cc" : "knob1" }}, "parameters" : {"time" : 512, "fb" : 0.8, "fader" : {"1" : "0 127 3000", "2" : "127", "3" : "0 127 3000", "4" : "50 1000"}}};
	var obj2 = {"name" : "foo", "audio" : {"in~" : {"1" : "ADC~[1]", "2" : "ADC~[2]"}}, "control" : {"in": {"time-cc" : "footswitch1" }}, "parameters" : {"time" : 1024, "fb" : 0.5, "fader" : {"1" : "0 64 2000", "2" : "0 127 2000", "3" : "0 3000", "4" : "127 1000"}}};
	var obj3 = {
	"name" : "delayTest",
	"parameters" : 	{
		"time" : 1024,
		"fb" : 0.8,
		"lfo" : 0.1,
		"depth" : 1,
		"bypass" : 0,
		"hold" : 0,
		"trim" : 127,
		"dry" : 60,
		"gain" : 127
	},
	"audio" : 	{
		"in~" : 		{
			"1" : "ADC~[1]"
		},
		"out~" : 		{
			"wet" : "delayTest~"
		}

	},
	"control" : 	{
		"ctlin" : 		{
			"time" : "VKtime",
			"feedback" : "VKfb",
			"depth" : "VKdepth",
			"bypass" : "VKbypass",
			"hold" : "VKhold",
			"gain" : "VKvolume"
		}

	}

};
	var obj4 = {
	"name" : "delayTest",
	"parameters" : 	{
		"time" : 512,
		"fb" : 0.5,
		"lfo" : 0.1,
		"depth" : 2,
		"bypass" : 0,
		"hold" : 0,
		"trim" : 127,
		"dry" : 127,
		"gain" : 127
	},
	"audio" : 	{
		"in~" : 		{
			"1" : "ADC~[1]"
		},
		"out~" : 		{
			"wet" : "delayTest~"
		}

	},
	"control" : 	{
		"ctlin" : 		{
			"time" : "VKtime",
			"feedback" : "VKfb",
			"depth" : "VKdepth",
			"bypass" : "VKbypass",
			"hold" : "VKhold",
			"gain" : "VKvolume"
		}

	}

};

	var obj;
	
	switch(x){

		case 1:
			obj = obj1;
			break;
		case 2:
			obj = obj2;
			break;
		case 3:
			obj = obj3;
			break;
		case 4:
			obj = obj4;
			break;
	}
	
	if(obj.name == null){
		post("no name field for this module!");
	}
	else {
		var send = obj.name;
	}
	var string = JSON.stringify(obj);
	messnamed(send, string);
	outlet(0, string);
	outlet(1, send);
}