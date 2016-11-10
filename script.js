var minutes = 5, the_interval =/* minutes * 60 **/ 1000;
var timesChecked=0;
var fs = require('fs');
setInterval(function() {
	  console.log(timesChecked);
	  timesChecked+=1;
	  if(timesChecked==30){
		fs.writeFile("test.txt", "Hey there!", function(err) {
		    if(err) {
		        return console.log(err);
		    }
	  	});
	}
  // do your stuff here
}, the_interval);

 