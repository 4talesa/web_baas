module.exports = function(AppUser) {

	AppUser.greet = function(msg, cb){
		cb(null, 'Greetings ' + msg);
	}
	
	AppUser.remoteMethod(
		'greet',		
		{
			accepts: {arg: 'msg', type: 'string'},
			returns: {arg: 'greeting', type: 'string'}
		}
	);
	
	AppUser.getFullName = function(appUserId, cb){
		AppUser.findById( appUserId, function(err, instance){
			response = "Full name is " + instance.firstName + " " + instance.middleName + " " + instance.lastName;
			cb(null, response);
			//console.log(response);
		});
	}

	AppUser.remoteMethod(
		'getFullName',
		{
			http: {path: '/getFullName', verb: 'get'},
			accepts: {arg: 'id', type: 'string', http: {source: 'query'}},
			returns: {arg: 'fullName', type: 'string'}
		}
	);
};
