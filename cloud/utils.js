var constants = require('cloud/constants.js');


module.exports.saveLog = function(info, callback){
	var CPLog = Parse.Object.extend(constants.CLIPO_LOG);
	var log = new CPLog();

	// log.set('owner', info.name);
	log.set('ownerName', info.ownerName);
	log.set('ownerId', info.ownerId);
	log.set('targetName', info.targetName);
	log.set('targetType', info.targetType);
	log.set('action', info.action);
	log.set('projectId', info.projectId);

	log.save(null, {
		success: function(log){
			console.log('saved a new log: ' + log.id);
			callback(null, log.id);
		},
		error: function(log, error){
			console.log('Error message(log): ' + error.message);
			callback(error.message, null);
		}
	});
};


/* send to pubnub */
Parse.Cloud.define(constants.SEND_TO_PUBNUB, function(request, response){
	Parse.Cloud.httpRequest({
		url: 'http://pubsub.pubnub.com/publish/' + constants.pubnubConfiguration.publish_key + '/' 
		+ constants.pubnubConfiguration.subscribe_key + '/0/' + request.params.channel + 
		 '/0/' + encodeURIComponent(JSON.stringify(request.params.message)),
		success: function(httpResponse){
			response.success(httpResponse);
		},
		error: function(httpResponse){
			response.error(httpResponse);
		}
	});
});