angular.module('TodoApp', ['firebase'])

.controller('mainController', function($scope, $firebaseObject, $http, $templateCache) {
	
  $scope.populatenumber = 1;

  var token = "5s4LaLXdO1JncuQIfhF6uSC8i0v7etDUezqTm6iR";
  var url_base = "https://poctodo.firebaseio.com/";
  // get # of real time users
  var listRef = new Firebase(url_base+"presence/");
  
  listRef.authWithCustomToken(token, function(error, authData) {
    if (error) {
      alert("Authentication Failed!", error);
    } else {
      //alert("Authenticated successfully with payload:", authData);
    }
  });
  var userRef = listRef.push();
  
  // Add ourselves to presence list when online.
  var presenceRef = new Firebase(url_base+".info/connected");
  presenceRef.authWithCustomToken(token, function(error, authData) {
	    if (error) {
	      alert("Authentication Failed!", error);
	    } else {
	      //alert("Authenticated successfully with payload:", authData);
	    }
	  });
  presenceRef.on("value", function(snap) {
    if (snap.val()) {
      userRef.set(true);
      // Remove ourselves when we disconnect.
      userRef.onDisconnect().remove();
    }
  });
  
  listRef.on("value", function(snap) {
    $scope.online = snap.numChildren();
  });
  
  // connect to firebase 
  var ref = new Firebase(url_base+"task");
  ref.authWithCustomToken(token, function(error, authData) {
	    if (error) {
	      alert("Authentication Failed!", error);
	    } else {
	      //alert("Authenticated successfully with payload:", authData);
	    }
	  });

  // sync as object 
  var syncObject = $firebaseObject(ref);

  // three way data binding
  syncObject.$bindTo($scope, 'task');
  
  $scope.toTitleCase = function (str)
  {
	  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  
  $scope.reset = function(){
	  $scope.task = [];
	  ref.set($scope.task);
  }
    
  // function to set the default data
  $scope.populate = function() {
	  
    $scope.task = [];
    ref.set($scope.task);
	  
	for (var i = 0; i<$scope.populatenumber; i++){
		$.ajax({
			  url: 'https://randomuser.me/api/',
			  dataType: 'json',
			  success: function(data){
			    //alert(data.results[0].user.name.first);
			    $scope.user = data.results[0].user;
			    
			    var intStatus = Math.floor(Math.random() * 3);
			    var strStatus = 'todo';
			    switch(intStatus){
			    	case 0: strStatus = 'todo';
			    	break;
			    	case 1: strStatus = 'doing';
			    	break;
			    	case 2: strStatus = 'done';
			    	break;
			    }
		    
			    // connect to firebase 
			    var refRandom = new Firebase(url_base+"task/");
			    refRandom.authWithCustomToken(token, function(error, authData) {
				    if (error) {
				      alert("Authentication Failed!", error);
				    } else {
				      //alert("Authenticated successfully with payload:", authData);
				    }
				  });
			    refRandom.push({
					description: 'Task for testing',
			        responsible: $scope.toTitleCase($scope.user.name.first)+' '+$scope.toTitleCase($scope.user.name.last),
			        pictureUrl: $scope.user.picture.thumbnail,
			        status: strStatus,
			        obs: 'no obs'
			    	});
			  }
			});
	}

  };
  
  $scope.actDelete = function($event, $id){
	  $event.preventDefault();
	  
	  var refById = new Firebase(url_base+"task/"+$id);
	  refById.authWithCustomToken(token, function(error, authData) {
		if (error) {
				alert("Authentication Failed!", error);
			} else {
				//alert("Authenticated successfully with payload:", authData);
			}
		});
		refById.remove();
  };
  
  $scope.actNew = function($event){
	  $.ajax({
			  url: 'https://randomuser.me/api/',
			  dataType: 'json',
			  success: function(data){
			    //alert(data.results[0].user.name.first);
			    $scope.user = data.results[0].user;
			    
			    var intStatus = Math.floor(Math.random() * 3);
			    var strStatus = 'todo';			    
		    
			    // connect to firebase 
			    var refRandom = new Firebase(url_base+"task/");
			    refRandom.authWithCustomToken(token, function(error, authData) {
				    if (error) {
				      alert("Authentication Failed!", error);
				    } else {
				      //alert("Authenticated successfully with payload:", authData);
				    }
				  });
			    refRandom.push({
					description: 'Task for testing',
			        responsible: $scope.toTitleCase($scope.user.name.first)+' '+$scope.toTitleCase($scope.user.name.last),
			        pictureUrl: $scope.user.picture.thumbnail,
			        status: strStatus,
			        obs: 'no obs'
			    	});
			  }
			});	  
  };
  
  $scope.actAdd = function($event, $task){
		// connect to firebase 
		var refRandom = new Firebase(url_base+"task/");
		refRandom.authWithCustomToken(token, function(error, authData) {
			if (error) {
			  alert("Authentication Failed!", error);
			} else {
			  //alert("Authenticated successfully with payload:", authData);
			}
		  });
		refRandom.push({
			description: $task.description,
			responsible: $task.responsible,
			pictureUrl: '',
			status: $task.status,
			obs: $task.obs
			});
		$task.description = '';
		$task.responsible = '';
		$task.obs         = '';
		$task.status      = '';
  };
  
});
