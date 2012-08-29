var nodepunch = require('./npunch.js'),
fs = require('fs'),
light_rpc = require('nodejs-light_rpc');
var port = 5556;
nodepunch = require('../lib/npunch.js');

var runningWorkers = {};
// {projectName: (forever worker)}

var rpc = new light_rpc({
    start: function(projectName, callback){
    	
    	return nodepunch.start(projectName);
        
    },
    stop: function(projectName, callback){
    	
        var stopWorker = runningWorkers[projectName].stop();
        console.log(stopWorker);
        callback(null, true);
    }
});
rpc.listen(port);

// Daemon Functions


// Start Server (Forever)



// Call

// Watching Related Tasks
