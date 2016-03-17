var constants = require('cloud/constants.js');
var utils = require('cloud/utils.js');



/* saved project */
Parse.Cloud.afterSave(constants.CLIPO_PROJECT, function(request){
	var projectInfo = request.object;
	var projectId = projectInfo.id;
	projectInfo.get('owner').fetch().then(function(owner){
		var info = {
			ownerName: owner.get('username'),
			ownerId: owner.get('objectId'),
			targetName: projectInfo.get('name'),
			targetType: constants.CLIPO_PROJECT,
			projectId: projectId,
			action: constants.ADD
		}
		utils.saveLog(info, function(err, result){
			if(err) throw err;
			console.log(result);
		});
	});
});