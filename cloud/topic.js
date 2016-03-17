var constants = require('cloud/constants.js');
var utils = require('cloud/utils.js');

/* saved topic */
Parse.Cloud.afterSave(constants.CLIPO_TOPIC, function(request){
	var topicInfo = request.object;
	var topicId = topicInfo.id;
	topicInfo.get('owner').fetch().then(function(owner){
		topicInfo.get('parent').fetch().then(function(project){
			var action = utils.checkACType();
			var info = {
				ownerName : owner.get('username'),
				ownerId : owner.id,
				targetName : topicInfo.get('name'),
				targetType : constants.CLIPO_TOPIC,
				action : action,
				projectId : project.id
			};
			utils.saveLog(info, function(err, result){
				if(err) throw err;
				console.log(result);
			});
		});
	});
});