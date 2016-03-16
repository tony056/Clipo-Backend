/* db collection name */
const CLIPO_USER = 'CPUser';
const CLIPO_PROJECT = 'CPProject';
const CLIPO_TOPIC = 'CPTopic';
const CLIPO_FILE = 'CPFile';
const CLIPO_COMMENT = 'CPComment';
const CLIPO_MESSAGE = 'CPMessage';
const CLIPO_LOG = 'CPLog';
const CLIPO_NOTIFICATION = 'CPNotification';

/* pubnub channel set up */
const CHANNEL_PREFIX = 'channel_';
const pubnubConfiguration = {
	'publish_key'   : 'pub-c-9ff0b4eb-292b-46a0-bf5d-90b79ed90768', 
    'subscribe_key' : 'sub-c-42c5f87e-0972-11e5-9ffb-0619f8945a4f'
};

/* backend action */
const SEND_TO_PUBNUB = 'SendToPubNub';
const SEND_PUSH = 'SendPush';





Parse.Cloud.afterSave(CLIPO_LOG, function(request){
	/* query user to send notification */
	var logInfo = request.object;
	var targetType = logInfo.get('targetType');
	var channel = CHANNEL_PREFIX;
	// var project = logInfo.get(CLIPO_PROJECT);


	/* send to pubnub */
	switch(targetType){
		case CLIPO_PROJECT:
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
	Parse.Cloud.run(SEND_TO_PUBNUB, {
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

Parse.Cloud.define(SEND_TO_PUBNUB, function(request, response){
	Parse.Cloud.httpRequest({
		url: 'http://pubsub.pubnub.com/publish/' + pubnubConfiguration.publish_key + '/' 
		+ pubnubConfiguration.subscribe_key + '/0/' + request.params.channel + 
		 '/0/' + encodeURIComponent(JSON.stringify(request.params.message)),
		success: function(httpResponse){
			response.success(httpResponse);
		},
		error: function(httpResponse){
			response.error(httpResponse);
		}
	});
});