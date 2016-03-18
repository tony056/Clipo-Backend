var constants = require('cloud/constants.js');
var utils = require('cloud/utils.js');


Parse.Cloud.define('testAfterSave', function(request, response){
	var type = request.params.type;
	switch(type){
		case constants.CLIPO_PROJECT:
			console.log('project testing');
			break;
		case constants.CLIPO_TOPIC:
			console.log('topic testing');
			break;
		case constants.CLIPO_FILE:
			newFile('nknzJC2rYh', null, 'J0c0bGNFCO', function(error){
				if(!error)
					response.success('test finished');
				else
					response.error(error); 
			});
			break;
		case constants.CLIPO_COMMENT:
			newComment('nknzJC2rYh', 'JUK4UFDT69', 'J0c0bGNFCO', function(error){
				if(!error)
					response.success('test finished');
				else
					response.error(error); 
			});
			break;
		default:
			response.error('please give the correct type');
			break;
	}
});


var newFile = function(userId, topicId, projectId, callback){
	var CPFile = Parse.Object.extend(constants.CLIPO_FILE);
	var file = new CPFile();

	file.set('name', 'testname');
	file.set('type', 'pdf');
	file.set('url', '123.com');
	file.set('size', 123);
	file.set('topic', null);
	file.set('info', 'haha');
	utils.queryObject(constants.CLIPO_USER, userId, function(error, user){
		if(error) throw error;
		utils.queryObject(constants.CLIPO_PROJECT, projectId, function(err, project){
			if(err) throw err;
			file.set('owner', user);
			file.set('parent', project);
			file.save(null, {
				success: function(result){
					callback(null);
					console.log('new file good');
				},
				error: function(error){
					callback(error.message);
					console.log(error.message);
				}
			});
		});
	});	
};


var newComment = function(userId, fileId, projectId, callback){
	var CPComment = Parse.Object.extend(constants.CLIPO_COMMENT);
	var comment = new CPComment();
	comment.set('content', 'comment test');
	utils.queryObject(constants.CLIPO_USER, userId, function(error, user){
		if(error) throw error;
		utils.queryObject(constants.CLIPO_PROJECT, projectId, function(error, project){
			if(error) throw error;
			utils.queryObject(constants.CLIPO_FILE, fileId, function(error, file){
				if(error) throw error;
				comment.set('owner', user);
				comment.set('parent', project);
				comment.set('file', file);
				comment.save(null, {
					success: function(object){
						callback(null);
					},
					error: function(error) {
						callback(error.message);
					}
				});
			});
		});
	});
};