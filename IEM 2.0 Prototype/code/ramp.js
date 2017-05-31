inlets = 1;
outlets = 3;

function simple (){
	
	var obj = {
				"name" : "gain",
				"start" : 0, 
				"target" : 127,
				"time" : 1000,
			};

	
	var str = JSON.stringify(obj);
	
	ramp(str);
}

function simpleDelay (){
	
	var obj = {
				"name" : "gain",
				"start" : 0, 
				"target" : 127,
				"time" : 1000,
				"trigger" : {"delay" : 2000}
			};

	
	var str = JSON.stringify(obj);
	
	ramp(str);
}

function complex (){
	
	var obj = {
				"name" : "gain",
				"start" : 0, 
				"target" : 127,
				"time" : 1000,
				"exp" : 2.0,
				"trigger" : {"delay" : 1000, "match" : 127, "source" : "fs1"},
				"segments" : [
					{"target" : 100, "time" : 1000},
					{"target" : 50, "time" : 1000, "sustain" : {"delay" : 1000}},
					{"target" : 127, "time" : 1000, "sustain" : {"delay" : 1000, "match" : 127, "source" : "fs1"}}, 
					{"target" : 30, "time" : 1000}, 
					{"target" : 0, "time" : 1000} 
				]
			};

	
	var str = JSON.stringify(obj);
	
	ramp(str);
}

function ramp(str){	
	var obj = JSON.parse(str);

	if(obj.hasOwnProperty("name")){
		outlet(2, obj.name);
	}

	
	if (obj.hasOwnProperty("segments")){
		// add these to the list in the coll file
		if(obj.segments.length){ // make sure the array exists
			for(var i = 0; i < obj.segments.length; i++){
				var lineSegment = [i];
				var segObj = obj.segments[i];
				if (segObj.hasOwnProperty("start")){
					lineSegment.push("start");
					lineSegment.push(segObj.start);
				}
				if (segObj.hasOwnProperty("target")){
					lineSegment.push("target");
					lineSegment.push(segObj.target);
				}
				if (segObj.hasOwnProperty("time")){
					lineSegment.push("time");
					lineSegment.push(segObj.time);
				}
				if (segObj.hasOwnProperty("exp")){
					lineSegment.push("exp");
					lineSegment.push(segObj.exp);
				}
				if (segObj.hasOwnProperty("sustain")){
					// sustain is an object : {"match", "source"}
					if(segObj.sustain.hasOwnProperty("match")){
						lineSegment.push("match");
						lineSegment.push(segObj.sustain.match);						
					}
					if(segObj.sustain.hasOwnProperty("source")){
						//set the "receive" object
						lineSegment.push("source");
						lineSegment.push(segObj.sustain.source);						
					} else { // un-set the "receive" object
						lineSegment.push("source");
						lineSegment.push("none");						
					}
					
					if(segObj.sustain.hasOwnProperty("delay")){
						lineSegment.push("delay");
						lineSegment.push(segObj.sustain.delay);						
					} else {
						lineSegment.push("delay");
						lineSegment.push(0);						
					}
				}
				else {
					lineSegment.push("delay");
					lineSegment.push(0);						
				}
				outlet(1, lineSegment);

			}
		}
	}
	
	var line = ["insert", 0];
		
	if(obj.hasOwnProperty("start")){
		line.push("start");
		line.push(obj.start);
	}

	if(obj.hasOwnProperty("target")){
		line.push("target");
		line.push(obj.target);
	}
	if(obj.hasOwnProperty("time")){
		line.push("time");
		line.push(obj.time);
	}
	if(obj.hasOwnProperty("exp")){
		line.push("exp");
		line.push(obj.exp);
	}

	outlet(1, line); // send the list out the middle to coll object
	
	if(obj.hasOwnProperty("trigger")){

		var trigger = obj.trigger;
		var trig = [];

		if(trigger.hasOwnProperty("delay")){
			trig.push("delay");
			trig.push(trigger.delay);
		} else {
			trig.push("delay");
			trig.push(0);			
			}
		
		if(trigger.hasOwnProperty("match")){
			trig.push("match");
			trig.push(trigger.match);
		} else {
			trig.push("match");
			trig.push("none");
		}

		if(trigger.hasOwnProperty("source")){
			trig.push("source");
			trig.push(trigger.source);
		} else {
			trig.push("source");
			trig.push("none");
		}
	
		outlet(0, trig);
		
	}
	else {
		var source = ["match", "none", "source", "none", "delay", 0];
		outlet(0, source); // un-set "receive" object if no trigger
		outlet(0, "bang"); // start the ramp immediately
		}

	
}