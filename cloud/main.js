var constants = require('cloud/constants.js');
var utils = require('cloud/utils.js');
var topic = require('cloud/topic.js');


Parse.Cloud.afterSave(constants.CLIPO_LOG, function(request){
	/* query user to send notification */
	var logInfo = request.object;
	var targetType = logInfo.get('targetType');
	var channel = constants.CHANNEL_PREFIX;
	// var project = logInfo.get(CLIPO_PROJECT);


	/* send to pubnub */
	switch(targetType){
		case constants.CLIPO_PROJECT:
			var ownerId = logInfo.get('ownerId');
			channel += ownerId;
			break;
		default:
			var projectId = logInfo.get('projectId');
			channel += projectId;
			break;
	}
	var message = {
		owner: logInfo.get('ownerName'),
		target: logInfo.get('targetName'),
		targetType: logInfo.get('targetType'),
		action: logInfo.get('action'),
		project: logInfo.get('projectId')
	};
	Parse.Cloud.run(constants.SEND_TO_PUBNUB, {
		channel: channel,
		message: message
	}, {
		success: function(success){

		},
		error: function(error){
			console.error(error);
		}
	});
	/* */
});

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

/* deleted project */



/* saved comment */
Parse.Cloud.afterSave(constants.CLIPO_COMMENT, function(request){

});



