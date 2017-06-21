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
//	post("simple\n");
	ramp(str);
}

function simpleDelay (){
	
	var obj = {
				"name" : "gain",
				"start" : 0, 
				"target" : 127,
				"time" : 1000,
				"delay" : 2000
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
				"exp" : 1,
				"trigger" : {"match" : 127, "source" : "fs1"}, // wait for a trigger event
				"delay" : 0, // delay execution by 1000 ms (after trigger is received)
				"segments" : [
					{"target" : 100, "time" : 1000},
					{"target" : 50, "time" : 1000, "delay" : 1000}, //delay segment by 1000 ms
					{"target" : 127, "time" : 1000, "delay" : 1000, "trigger" : {"match" : 127, "source" : "fs1"}}, 
					{"target" : 30, "time" : 1000}, 
					{"target" : 0, "time" : 4000, "exp" : 1.5, "delay" : 2000} 
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
			//	post("segment: " + i);
			//	post();
					
				var lineSegment = [i, "name", obj.name];
				var segObj = obj.segments[i];
				
				if(segObj.hasOwnProperty("delay")){ //delay execution of the segment
					lineSegment.push("delay");
					lineSegment.push(segObj.delay);						
				} else {
					lineSegment.push("delay");
					lineSegment.push(0);						
				}

				//each segment can be set to wait for a trigger
				if (segObj.hasOwnProperty("trigger")){
					// sustain is an object : {"match", "source"}
					if(segObj.trigger.hasOwnProperty("match")){
						lineSegment.push("match");
						lineSegment.push(segObj.trigger.match);						
					}
					if(segObj.trigger.hasOwnProperty("source")){
						//set the "receive" object
						lineSegment.push("source");
						lineSegment.push(segObj.trigger.source);						
					} else { // un-set the "receive" object
						lineSegment.push("source");
						lineSegment.push("none");						
					}
				}
				else {
					lineSegment.push("source");
					lineSegment.push("none");	// turns the receive object off (with "set" message)										
				}
				
				if (segObj.hasOwnProperty("start")){
					lineSegment.push("start");
					lineSegment.push(segObj.start);
				} else {
					lineSegment.push("start");
					lineSegment.push("none");
				}	
				
				if (segObj.hasOwnProperty("exp")){ // set an exponential curve for the segment
					lineSegment.push("exp");
					lineSegment.push(segObj.exp);
				} else {
					lineSegment.push("exp");
					lineSegment.push(1); // default to linear ramp
				}
				
				if (segObj.hasOwnProperty("time")){
					lineSegment.push("time");
					lineSegment.push(segObj.time); // set ramp time
				}
				
				if (segObj.hasOwnProperty("target")){
					lineSegment.push("target");
					lineSegment.push(segObj.target); // set target value
				}
				outlet(1, lineSegment);

			}
		}
	}
	
	var line = ["insert", 0, "name", obj.name, "delay", 0, "source", "none"];
		
	if(obj.hasOwnProperty("start")){
		line.push("start");
		line.push(obj.start);
	} else {
		line.push("start");
		line.push("none");
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
	} else {
		line.push("exp");
		line.push(1);
	}

	outlet(1, line); // send the list out the middle to coll object

	var del = [];
		
	if(obj.hasOwnProperty("delay")){
		del.push("delay");
		del.push(obj.delay);
	} else {
		del.push("delay");
		del.push(0);			
	}		
	
	outlet(0, del); // send the delay time to the trigger module
	
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
		var source = ["match", "none", "source", "none"];
		outlet(0, source); // un-set "receive" object if no trigger
		//also start the ramp with whatever delay time is set
//		outlet(0, "bang"); // start the ramp immediately
		}

	
}