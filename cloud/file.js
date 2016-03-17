var constants = require('cloud/constants.js');
var utils = require('cloud/utils.js');

Parse.Cloud.afterSave(constants.CLIPO_FILE, function(request){
	var file = request.object;
	file.get('parent').fetch().then(function(project){
		file.get('owner').fetch().then(function(owner){
			var info = utils.setLogInfo(owner, file, constants.CLIPO_FILE, project.id);
			utils.saveLog(info, function(err, result){
				if(err) throw err;
				console.log(result);
			});
		});
	});
});