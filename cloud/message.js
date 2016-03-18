var constants = require('cloud/constants.js');
var utils = require('cloud/utils.js');



Parse.Cloud.afterSave(constants.CLIPO_MESSAGE, function(request){
	var message = request.object;
	message.get('owner').fetch().then(function(owner){
		message.get('parent').fetch().then(function(project){
			var info = utils.setLogInfo(owner, message, constants.CLIPO_MESSAGE, project.id);
			utils.saveLog(info, function(error, result){
				if(error) throw error;
				console.log(result);
			});
		});
	});
});