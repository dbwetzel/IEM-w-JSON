inlet = 1;

function bang(){
	
	var trimObj = {"trim" : {
					"ramp": {
						"start" : 0, 
						"target" : 120, 
						"time" : 1000
						}
					}
				};
	var destination = Object.keys(trimObj);
	
	var dest = destination[0]; //"trim"
		
	if (typeof trimObj[dest] == 'object'){
		var line = [dest]; 
		var method = Object.keys(trimObj[dest]); 
		var meth = method[0];
		switch(meth){
			case "ramp" : 
				post(Object.keys(trimObj[dest][meth]));
				post();
				if (trimObj[dest].ramp.hasOwnProperty("start")){
					line.push(trimObj[dest][meth].start);
					post("start: " + trimObj[dest][meth].start);
					post();
				}
				if (trimObj[dest].ramp.hasOwnProperty("target")){
					line.push(trimObj[dest][meth].target);
					post("target: " + trimObj[dest][meth].target);
					post();
				}
				if (trimObj[dest].ramp.hasOwnProperty("time")){
					line.push(trimObj[dest][meth].time);
					post("time: " + trimObj[dest][meth].time);
					post();
				}
				
				post("line: " + line);
				post();
				if(this.patcher.getnamed("ramp")){
					this.patcher.getnamed("ramp").message(line);
				}
			
		}
	}
	

}

