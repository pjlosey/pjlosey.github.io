app.controller('racersProfileCtrl', function($rootScope, $scope, $timeout, $routeParams) {

	$scope.racerId = $routeParams.racerId;  // last part of the url
	
	//------------- Determin is the user logged in is the user being viewed so they can edit the page.----------//
	$scope.isUser = function(key) {
		if(key == $scope.userId) {
			return true;
		}
	}
	
	//--------------- User Firebase Data ----------------------//
	var ref = firebase.database().ref('users');//' + $scope.user.id);
	ref.orderByChild("userName")
   .equalTo($scope.racerId)
   .on("value", function(snapshot) {
	   $timeout(function() {
		  $scope.racer = snapshot.val();
		  //console.log(ref.getKey());
		  $scope.$apply();
		  //console.log(snapshot.val());
	   });
	});

		
	$scope.userEdit = function(x) {
		//console.log(x.displayName);
	  firebase.database().ref('users/'+$scope.userId).update({
		displayName: x.displayName,
		lastUpdated: Date.now()
	  })		
	}
	
	
	//----------- Logged In State Settings ---------------------//
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		$scope.userId = firebase.auth().currentUser.uid;
		$scope.$apply(); // used to update the scope data after onAuthStateChanged changes.
	  } else {
		$scope.userId = "";
		$scope.user = {};
		$scope.$apply(); // used to update the scope data after onAuthStateChanged c`hanges.
	  }
	});
	//$scope.userId = firebase.auth().currentUser.uid;
		
});