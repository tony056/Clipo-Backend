var constants = require('cloud/constants.js');
var utils = require('cloud/utils.js');


/* saved/updated comment */
Parse.Cloud.afterSave(constants.CLIPO_COMMENT, function(request){
	var commentInfo = request.object;
	var commentId = commentInfo.id;
	commentInfo.get('owner').fetch().then(function(owner){
		commentInfo.get('parent').fetch().then(function(project){
			var info = utils.setLogInfo(owner, commentInfo, constants.CLIPO_COMMENT, project.id);
			utils.saveLog(info, function(error, result){
				if(error) throw error;
				console.log(result);
			});
		});
	});
});




// to do: no content in pubnub

