var constants = require('cloud/constants.js');
var utils = require('cloud/utils.js');
var project = require('cloud/project.js');
var topic = require('cloud/topic.js');
var file = require('cloud/file.js');
var comment = require('cloud/comment.js');


//test function 
var test = require('cloud/test.js');

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



/* deleted project */



