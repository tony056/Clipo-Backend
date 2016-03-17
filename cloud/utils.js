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

module.exports.setLogInfo = function(owner, target, targetType, projectId){
	if(owner === null)
		return null;
	if(projectId === null)
		return null;
	var action = checkACType(target);
	var info = {
		ownerName : owner.get('username'),
		ownerId : owner.id,
		targetName : target.get('name'),
		targetType : targetType,
		action : action,
		projectId : projectId
	};
	return info;
};

module.exports.queryObject = function(type, objectId, callback){
	var query = new Parse.Query(type);
	query.get(objectId, {
		success: function(object){
			callback(null, object);
		},
		error: function(error) {
			callback(error.message, null);
		}
	});
};

var checkACType = function(object){
	var action = constants.NO_ACTION;
	if(object.existed())
		action = constants.REVISE;
	else
		action = constants.ADD;
	return action;
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